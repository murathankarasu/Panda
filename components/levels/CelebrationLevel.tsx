import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Level } from '../../types';
import { levels as allLevels } from '../../data/levels';
import { updateLevelProgress, unlockNextLevel } from '../../utils/progress';
import { incrementLevelCompletedToday } from '../../utils/dailyQuests';
import { firebaseService } from '../../services/firebaseService';
import './CelebrationLevel.css';
import type { MatchTarget, TimelineItem, MemoryPair, ColorConfig, PuzzlePiece, CelebrationConfig, SortingItem, SilhouettePair, OddOneOutItem } from '../../types/celebration';
import { getCelebrationConfig } from '../../data/celebrationConfigs';

interface MemoryCard {
  key: string;
  pairId: string;
  icon: string;
  label: string;
  revealed: boolean;
  matched: boolean;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const createShuffledIndices = (length: number): number[] =>
  shuffleArray(Array.from({ length }, (_, index) => index));

const buildMemoryDeck = (pairs: MemoryPair[]): MemoryCard[] => {
  const deck = pairs.flatMap(pair => [
    {
      key: `${pair.id}-a`,
      pairId: pair.id,
      icon: pair.icon,
      label: pair.label,
      revealed: false,
      matched: false,
    },
    {
      key: `${pair.id}-b`,
      pairId: pair.id,
      icon: pair.icon,
      label: pair.label,
      revealed: false,
      matched: false,
    },
  ]);

  return shuffleArray(deck);
};

const createEmptyColorGrid = (config: ColorConfig): string[][] =>
  config.target.map(row => row.map(() => ''));

const shuffleTimeline = (items: TimelineItem[]): TimelineItem[] => {
  if (items.length <= 1) {
    return [...items];
  }

  let candidate = shuffleArray(items);
  let attempts = 0;

  while (
    candidate.every((item, index) => item.id === items[index].id) &&
    attempts < 5
  ) {
    candidate = shuffleArray(items);
    attempts += 1;
  }

  return candidate;
};


interface CelebrationLevelProps {
  level: Level;
}

const defaultStepTitles = [
  'Hazırlık',
  'Kelime Oyunu',
  'Simgeleri Eşleştir',
  'Hafıza Oyunu',
  'Boyama',
  'Gölge Eşleştirme',
  'Kategorileştirme',
  'Kutlama İnşası',
  'Ritim',
  'Günü Sırala',
  'Farkı Bul',
  'Mini Test',
  'Kutlama',
];

const getInitialMatchState = (targets: MatchTarget[]): Record<string, string | null> =>
  targets.reduce<Record<string, string | null>>((acc, target) => {
    acc[target.id] = null;
    return acc;
  }, {});

export default function CelebrationLevel({ level }: CelebrationLevelProps) {
  const [config, setConfig] = useState<CelebrationConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadConfig = async () => {
      setIsLoading(true);
      try {
        const remoteConfig = await firebaseService.getCelebrationConfig(level.id);
        const localConfig = getCelebrationConfig(level.id);
        
        if (remoteConfig) {
          // Uzak veriyi yerel varsayılanlarla birleştir (yeni oyunlar için)
          // Deep merge yerine basit spread kullanıyoruz, alt objeler (örn. oddOneOutGame) remote'da yoksa local'den gelir.
          // Ancak remote'da null/undefined olarak kayıtlıysa local'i ezebilir.
          // Bu yüzden undefined kontrolü yaparak merge etmek daha güvenli.
          setConfig({
            ...localConfig,
            ...remoteConfig,
            // Yeni eklenen oyunlar remote'da yoksa local'den alalım:
            oddOneOutGame: remoteConfig.oddOneOutGame || localConfig.oddOneOutGame,
            silhouetteGame: remoteConfig.silhouetteGame || localConfig.silhouetteGame,
            sortingGame: remoteConfig.sortingGame || localConfig.sortingGame,
          });
        } else {
          setConfig(localConfig);
        }
      } catch (error) {
        console.error(error);
        setConfig(getCelebrationConfig(level.id));
      } finally {
        setIsLoading(false);
      }
    };
    loadConfig();
  }, [level.id]);

  const stepLabels = useMemo(
    () => {
      if (!config) return defaultStepTitles;
      return (config.stepTitles && config.stepTitles.length >= defaultStepTitles.length
        ? config.stepTitles
        : defaultStepTitles);
    },
    [config]
  );

  const paletteShuffled = useMemo(
    () => config ? shuffleArray(config.colorGrid.palette) : [],
    [config]
  );
  const matchItemsShuffled = useMemo(() => config ? shuffleArray(config.matchItems) : [], [config]);
  const matchTargetsShuffled = useMemo(() => config ? shuffleArray(config.matchTargets) : [], [config]);
  const rhythmActionsShuffled = useMemo(
    () => config ? shuffleArray(config.rhythmActions) : [],
    [config]
  );
  const paletteColorMap = useMemo(() => {
    const map = new Map<string, string>();
    if (config) {
      config.colorGrid.palette.forEach(item => map.set(item.id, item.color));
    }
    return map;
  }, [config, paletteShuffled]);

  const silhouetteItemsShuffled = useMemo(
    () => config?.silhouetteGame ? shuffleArray(config.silhouetteGame) : [],
    [config]
  );

  const sortingItemsShuffled = useMemo(
    () => config?.sortingGame ? shuffleArray(config.sortingGame.items) : [],
    [config]
  );
  
  const oddOneOutItemsShuffled = useMemo(
    () => config?.oddOneOutGame ? shuffleArray(config.oddOneOutGame.items) : [],
    [config]
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [checklistState, setChecklistState] = useState<boolean[]>([]);

  // Game States
  const [wordOrder, setWordOrder] = useState<number[]>([]);
  const [wordProgress, setWordProgress] = useState<number[]>([]);
  const [wordFeedback, setWordFeedback] = useState<string | null>(null);
  const [wordSolved, setWordSolved] = useState(false);

  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string | null>>({});
  const [matchFeedback, setMatchFeedback] = useState<string | null>(null);
  const [matchSolved, setMatchSolved] = useState(false);

  const [memoryDeck, setMemoryDeck] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryLocked, setMemoryLocked] = useState(false);
  const [memoryFeedback, setMemoryFeedback] = useState<string | null>(null);
  const [memorySolved, setMemorySolved] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorGridState, setColorGridState] = useState<string[][]>([]);
  const [colorFeedback, setColorFeedback] = useState<string | null>(null);
  const [colorSolved, setColorSolved] = useState(false);

  const [puzzleOrder, setPuzzleOrder] = useState<string[]>([]);
  const [puzzleSlots, setPuzzleSlots] = useState<(string | null)[]>([]);
  const [puzzleFeedback, setPuzzleFeedback] = useState<string | null>(null);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const [rhythmIndex, setRhythmIndex] = useState(0);
  const [rhythmFeedback, setRhythmFeedback] = useState<string | null>(null);
  const [rhythmSolved, setRhythmSolved] = useState(false);

  const [timelineOrder, setTimelineOrder] = useState<TimelineItem[]>([]);
  const [timelineFeedback, setTimelineFeedback] = useState<string | null>(null);
  const [timelineSolved, setTimelineSolved] = useState(false);

  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [quizSolved, setQuizSolved] = useState(false);
  const [quizOptionOrder, setQuizOptionOrder] = useState<number[]>([]);

  // New Game States
  const [silhouetteMatches, setSilhouetteMatches] = useState<Record<string, string | null>>({});
  const [silhouetteFeedback, setSilhouetteFeedback] = useState<string | null>(null);
  const [silhouetteSolved, setSilhouetteSolved] = useState(false);

  const [sortingState, setSortingState] = useState<Record<string, 'left' | 'right' | null>>({});
  const [sortingFeedback, setSortingFeedback] = useState<string | null>(null);
  const [sortingSolved, setSortingSolved] = useState(false);

  const [oddOneOutSelection, setOddOneOutSelection] = useState<string | null>(null);
  const [oddOneOutFeedback, setOddOneOutFeedback] = useState<string | null>(null);
  const [oddOneOutSolved, setOddOneOutSolved] = useState(false);

  const [progressAwarded, setProgressAwarded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    if (!config) return;

    setCurrentStep(0);
    setCompletedSteps(Array(stepLabels.length).fill(false));
    setChecklistState(new Array(config.prepHints.length).fill(false));
    
    // Word Game Reset
    setWordOrder(createShuffledIndices(config.wordGame.letterPool.length));
    setWordProgress([]);
    setWordFeedback(null);
    setWordSolved(false);

    // Match Reset
    setSelectedMatchId(null);
    setMatchAnswers(getInitialMatchState(config.matchTargets));
    setMatchFeedback(null);
    setMatchSolved(false);

    // Memory Reset
    setMemoryDeck(buildMemoryDeck(config.memoryPairs));
    setFlippedCards([]);
    setMemoryLocked(false);
    setMemoryFeedback(null);
    setMemorySolved(false);

    // Color Reset
    const firstPaletteId = paletteShuffled[0]?.id ?? config.colorGrid.palette[0]?.id ?? null;
    setSelectedColor(firstPaletteId);
    setColorGridState(createEmptyColorGrid(config.colorGrid));
    setColorFeedback(null);
    setColorSolved(false);

    // Puzzle Reset
    setPuzzleOrder(shuffleArray(config.puzzlePieces.map(piece => piece.id)));
    setPuzzleSlots(new Array(config.puzzlePieces.length).fill(null));
    setPuzzleFeedback(null);
    setPuzzleSolved(false);

    // Rhythm Reset
    setRhythmIndex(0);
    setRhythmFeedback(null);
    setRhythmSolved(false);

    // Timeline Reset
    setTimelineOrder(shuffleTimeline(config.timeline));
    setTimelineFeedback(null);
    setTimelineSolved(false);

    // Quiz Reset
    setQuizSelection(null);
    setQuizOptionOrder(createShuffledIndices(config.quiz.options.length));
    setQuizFeedback(null);
    setQuizSolved(false);

    // Silhouette Reset
    if (config.silhouetteGame) {
      setSilhouetteMatches(config.silhouetteGame.reduce((acc, item) => ({ ...acc, [item.id]: null }), {}));
      setSilhouetteSolved(false);
      setSilhouetteFeedback(null);
    }

    // Sorting Reset
    if (config.sortingGame) {
      setSortingState(config.sortingGame.items.reduce((acc, item) => ({ ...acc, [item.id]: null }), {}));
      setSortingSolved(false);
      setSortingFeedback(null);
    }

    // OddOneOut Reset
    if (config.oddOneOutGame) {
      setOddOneOutSelection(null);
      setOddOneOutFeedback(null);
      setOddOneOutSolved(false);
    }

    setProgressAwarded(false);
  }, [config, paletteShuffled, stepLabels]);

  useEffect(() => {
    if (currentStep === stepLabels.length - 1 && !progressAwarded) {
      updateLevelProgress(level.id, 3, true);
      unlockNextLevel(allLevels, level.id);
      incrementLevelCompletedToday();
      window.dispatchEvent(new Event('progress-updated'));
      setProgressAwarded(true);
    }
  }, [currentStep, progressAwarded, level.id, stepLabels.length]);

  const formedWord = useMemo(
    () => config ? wordProgress.map(index => config.wordGame.letterPool[index]).join('') : '',
    [config, wordProgress]
  );

  const availablePieces = useMemo(
    () => config ?
      puzzleOrder
        .map(pieceId => config.puzzlePieces.find(piece => piece.id === pieceId))
        .filter((piece): piece is PuzzlePiece => Boolean(piece))
        .filter(piece => !puzzleSlots.includes(piece.id)) : [],
    [config, puzzleOrder, puzzleSlots]
  );

  if (isLoading) {
    return <div className="loading-screen">Yükleniyor...</div>;
  }

  if (!config) {
    return (
      <div className="celebration-level">
        <div className="step-card fade-in">
          <h2>İçerik hazırlanamadı</h2>
          <p>Bu özel gün için içerik yakında eklenecek.</p>
          <div className="actions">
            <button className="primary-action" onClick={() => navigate('/map')}>
              Haritaya Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handlers
  const handleChecklistClick = (index: number) => {
    setChecklistState(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleLetterPick = (index: number) => {
    if (wordSolved) return;
    if (wordProgress.includes(index)) return;
    if (wordProgress.length >= config.wordGame.answer.length) return;
    setWordProgress(prev => [...prev, index]);
    setWordFeedback(null);
  };

  const handleWordUndo = () => {
    if (wordSolved) return;
    setWordProgress(prev => prev.slice(0, -1));
    setWordFeedback(null);
  };

  const handleWordCheck = () => {
    if (formedWord.length !== config.wordGame.answer.length) {
      setWordFeedback('Tüm harfleri yerleştirmelisin.');
      return;
    }
    if (formedWord.toUpperCase() === config.wordGame.answer.toUpperCase()) {
      setWordFeedback('Harika! Kelimeyi doğru kurdun.');
      setWordSolved(true);
    } else {
      setWordFeedback('Bazı harfleri yeniden dene.');
    }
  };

  const handleMatchItemSelect = (itemId: string) => {
    if (matchSolved) return;
    setSelectedMatchId(prev => (prev === itemId ? null : itemId));
  };

  const handleMatchTargetClick = (targetId: string) => {
    if (!selectedMatchId || matchSolved) return;
    setMatchAnswers(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(key => {
        if (next[key] === selectedMatchId) next[key] = null;
      });
      next[targetId] = selectedMatchId;
      return next;
    });
    setSelectedMatchId(null);
    setMatchFeedback(null);
  };

  const handleMatchCheck = () => {
    const allFilled = config.matchTargets.every(target => matchAnswers[target.id]);
    if (!allFilled) {
      setMatchFeedback('Önce tüm kartları eşleştir.');
      return;
    }
    const success = config.matchTargets.every(target => matchAnswers[target.id] === target.answer);
    setMatchSolved(success);
    setMatchFeedback(success ? 'Süper! Tüm simgeleri tanıdın.' : 'Bazı eşleştirmeleri yeniden dene.');
  };

  const handleMatchReset = () => {
    setMatchAnswers(getInitialMatchState(config.matchTargets));
    setMatchFeedback(null);
    setMatchSolved(false);
    setSelectedMatchId(null);
  };

  const handleCardClick = (index: number) => {
    if (memoryLocked || memorySolved) return;
    const card = memoryDeck[index];
    if (!card || card.revealed || card.matched) return;

    const revealedDeck = memoryDeck.map((item, i) =>
      i === index ? { ...item, revealed: true } : item
    );
    const newFlipped = [...flippedCards, index];

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = revealedDeck[firstIndex];
      const secondCard = revealedDeck[secondIndex];

      if (firstCard.pairId === secondCard.pairId) {
        const matchedDeck = revealedDeck.map((item, i) =>
          i === firstIndex || i === secondIndex ? { ...item, matched: true, revealed: true } : item
        );
        setMemoryDeck(matchedDeck);
        setFlippedCards([]);
        setMemoryFeedback('Harika! Bir çifti buldun.');
        if (matchedDeck.every(item => item.matched)) {
          setMemorySolved(true);
          setMemoryFeedback('Bravo! Tüm simgeleri hatırladın.');
        }
      } else {
        setMemoryDeck(revealedDeck);
        setMemoryLocked(true);
        setMemoryFeedback('Olmadı, tekrar dene.');
        setTimeout(() => {
          setMemoryDeck(prev =>
            prev.map((item, i) =>
              i === firstIndex || i === secondIndex ? { ...item, revealed: false } : item
            )
          );
          setFlippedCards([]);
          setMemoryLocked(false);
        }, 900);
      }
    } else {
      setMemoryDeck(revealedDeck);
      setFlippedCards(newFlipped);
    }
  };

  const handleColorSelect = (id: string) => setSelectedColor(id);
  
  const handleColorCellClick = (row: number, col: number) => {
    if (!selectedColor || colorSolved) return;
    setColorGridState(prev => {
      const next = prev.map(r => [...r]);
      next[row][col] = selectedColor;
      return next;
    });
    setColorFeedback(null);
  };

  const handleColorCheck = () => {
    const success = config.colorGrid.target.every((targetRow, rowIndex) =>
      targetRow.every((expected, colIndex) => colorGridState[rowIndex]?.[colIndex] === expected)
    );
    setColorSolved(success);
    setColorFeedback(success ? 'Bayrağı doğru renklendirdin!' : 'Bazı kareleri yeniden boyayabilirsin.');
  };

  const handleColorReset = () => {
    setColorGridState(createEmptyColorGrid(config.colorGrid));
    setColorSolved(false);
    setColorFeedback(null);
  };

  const handlePuzzleDragStart = (e: React.DragEvent, id: string, origin: string) => {
    e.dataTransfer.setData('pieceId', id);
    e.dataTransfer.setData('origin', origin);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handlePuzzleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    const pieceId = e.dataTransfer.getData('pieceId');
    const origin = e.dataTransfer.getData('origin');
    if (!pieceId) return;

    setPuzzleSlots(prev => {
      const next = [...prev];
      const originFromSlot = origin.startsWith('slot-') ? parseInt(origin.split('-')[1], 10) : null;
      
      if (originFromSlot !== null && Number.isInteger(originFromSlot)) next[originFromSlot] = null;
      const existingIndex = next.findIndex(id => id === pieceId);
      if (existingIndex !== -1) next[existingIndex] = null;

      const displaced = next[slotIndex];
      next[slotIndex] = pieceId;
      if (displaced && originFromSlot !== null && Number.isInteger(originFromSlot)) {
        next[originFromSlot] = displaced;
      }

      const solved = config.puzzlePieces.every((piece, idx) => next[idx] === piece.id);
      setPuzzleSolved(solved);
      setPuzzleFeedback(solved ? 'Kutlama düzenini başarıyla kurdun!' : 'Parçaları yerleştirmeye devam et.');
      return next;
    });
  };

  const handlePuzzleReset = () => {
    setPuzzleOrder(shuffleArray(config.puzzlePieces.map(piece => piece.id)));
    setPuzzleSlots(new Array(config.puzzlePieces.length).fill(null));
    setPuzzleFeedback('Parçalar sıfırlandı.');
    setPuzzleSolved(false);
  };

  const handleRhythmAction = (actionId: string) => {
    if (rhythmSolved) return;
    if (actionId === config.rhythmSequence[rhythmIndex]) {
      const nextIndex = rhythmIndex + 1;
      setRhythmIndex(nextIndex);
      if (nextIndex === config.rhythmSequence.length) {
        setRhythmSolved(true);
        setRhythmFeedback('Ritmi tam tutturdun, bravo!');
      } else {
        setRhythmFeedback('Harika! Sıradaki hareketi dene.');
      }
    } else {
      setRhythmIndex(0);
      setRhythmFeedback('Farklı bir sıralama denedin, baştan başlayalım.');
    }
  };

  const handleTimelineMove = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= timelineOrder.length) return;
    const updated = [...timelineOrder];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setTimelineOrder(updated);
    setTimelineFeedback(null);
    setTimelineSolved(false);
  };

  const handleTimelineCheck = () => {
    const success = timelineOrder.every((item, idx) => item.id === config.timeline[idx].id);
    setTimelineSolved(success);
    setTimelineFeedback(success ? 'Günün sırasını doğru belirledin!' : 'Bir daha bak, ufak bir değişiklik gerek.');
  };

  const handleQuizSelect = (index: number) => {
    setQuizSelection(index);
    setQuizFeedback(null);
  };

  const handleQuizCheck = () => {
    if (quizSelection === null) {
      setQuizFeedback('Bir seçenek seçmelisin.');
      return;
    }
    const success = quizSelection === config.quiz.correctIndex;
    setQuizSolved(success);
    setQuizFeedback(success ? 'Doğru cevap, tebrikler!' : 'Başka bir seçenek dene.');
  };

  // Silhouette Game Handlers
  const handleSilhouetteDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('itemId', id);
  };

  const handleSilhouetteDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    if (itemId === targetId) {
      setSilhouetteMatches(prev => {
        const next = { ...prev, [targetId]: itemId };
        const allMatched = config.silhouetteGame!.every(item => next[item.id]);
        if (allMatched) {
          setSilhouetteSolved(true);
          setSilhouetteFeedback('Harika! Tüm gölgeleri eşleştirdin.');
        }
        return next;
      });
    } else {
      setSilhouetteFeedback('Bu gölge ona ait değil gibi.');
      setTimeout(() => setSilhouetteFeedback(null), 1500);
    }
  };

  // Sorting Game Handlers
  const handleSortingDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('itemId', itemId);
  };

  const handleSortingDrop = (e: React.DragEvent, categoryId: 'left' | 'right') => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('itemId');
    const item = config.sortingGame?.items.find(i => i.id === itemId);
    
    if (item && item.category === categoryId) {
      setSortingState(prev => {
        const next = { ...prev, [itemId]: categoryId };
        const allSorted = config.sortingGame!.items.every(i => next[i.id]);
        if (allSorted) {
          setSortingSolved(true);
          setSortingFeedback('Tüm eşyaları doğru sepete attın!');
        }
        return next;
      });
    } else {
      setSortingFeedback('Bu eşya diğer sepete ait olabilir mi?');
      setTimeout(() => setSortingFeedback(null), 1500);
    }
  };

  // OddOneOut Handlers
  const handleOddOneOutSelect = (itemId: string) => {
    if (oddOneOutSolved) return;
    setOddOneOutSelection(itemId);
    setOddOneOutFeedback(null);
  };

  const handleOddOneOutCheck = () => {
    if (!oddOneOutSelection) {
      setOddOneOutFeedback('Bir seçim yapmalısın.');
      return;
    }
    const selectedItem = config.oddOneOutGame?.items.find(i => i.id === oddOneOutSelection);
    if (selectedItem && selectedItem.isOdd) {
      setOddOneOutSolved(true);
      setOddOneOutFeedback('Tebrikler! Farklı olanı buldun.');
    } else {
      setOddOneOutFeedback('Tekrar dene, bu diğerlerine benziyor.');
    }
  };

  const goToPreviousStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));
  const goToNextStep = () => {
    setCompletedSteps(prev => {
      const next = [...prev];
      next[currentStep] = true;
      return next;
    });
    setCurrentStep(prev => Math.min(prev + 1, stepLabels.length - 1));
  };

  const isStepComplete = (stepIndex: number): boolean => {
    if (!config) return false;
    const title = stepLabels[stepIndex];
    
    switch (title) {
      case 'Hazırlık': return checklistState.every(Boolean);
      case 'Kelime Oyunu': return wordSolved;
      case 'Simgeleri Eşleştir': return matchSolved;
      case 'Hafıza Oyunu': return memorySolved;
      case 'Boyama': return colorSolved;
      case 'Gölge Eşleştirme': return silhouetteSolved || !config.silhouetteGame;
      case 'Kategorileştirme': return sortingSolved || !config.sortingGame;
      case 'Kutlama İnşası': return puzzleSolved;
      case 'Ritim': return rhythmSolved;
      case 'Günü Sırala': return timelineSolved;
      case 'Farkı Bul': return oddOneOutSolved || !config.oddOneOutGame;
      case 'Mini Test': return quizSolved;
      case 'Kutlama': return true;
      default: return true;
    }
  };

  // Render Functions
  const renderIntroStep = () => (
    <>
      <h2>{level.title}</h2>
      <p className="step-lead">{config.intro}</p>
      <div className="video-player">
        <iframe
          title={level.title}
          src={`https://www.youtube.com/embed/${config.videoId}?rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <ul className="sparkle-list">
        {config.prepHints.map((hint, index) => (
          <li 
            key={index} 
            className={`sparkle-item ${checklistState[index] ? 'checked' : ''}`}
            onClick={() => handleChecklistClick(index)}
          >
            <div className="checkbox-circle">{checklistState[index] ? '✓' : ''}</div>
            {hint}
          </li>
        ))}
      </ul>
      <div className="actions">
        <button className="primary-action" onClick={goToNextStep} disabled={!checklistState.every(Boolean)}>
          Hazırız!
        </button>
      </div>
    </>
  );

  const renderWordGame = () => (
    <>
      <h2>Kelime Oyunu</h2>
      <p className="step-lead">{config.wordGame.prompt}</p>
      <div className="word-slots">
        {Array.from({ length: config.wordGame.answer.length }).map((_, i) => (
          <div key={i} className="word-slot">{formedWord[i] ?? ''}</div>
        ))}
      </div>
      <div className="word-pool">
        {wordOrder.map(idx => {
          const letter = config.wordGame.letterPool[idx];
          const used = wordProgress.includes(idx);
          return (
            <button key={`${letter}-${idx}`} className={`word-letter ${used ? 'used' : ''}`}
              onClick={() => handleLetterPick(idx)} disabled={used || wordSolved}>
              {letter}
            </button>
          );
        })}
      </div>
      <div className="word-actions">
        <button className="ghost-action" onClick={handleWordUndo} disabled={!wordProgress.length || wordSolved}>Geri Al</button>
        <button className="primary-action" onClick={handleWordCheck}>Kontrol Et</button>
      </div>
      {wordFeedback && <div className="feedback">{wordFeedback}</div>}
    </>
  );

  const renderMatchStep = () => (
    <>
      <h2>Simgeleri Eşleştir</h2>
      <p className="step-lead">Simgeleri doğru açıklamalarla buluştur.</p>
      <div className="match-board">
        <div className="match-items">
          {matchItemsShuffled.map(item => (
            <button key={item.id} className={`match-item ${selectedMatchId === item.id ? 'selected' : ''}`}
              onClick={() => handleMatchItemSelect(item.id)}>
              <span className="match-badge">{item.badge}</span><span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="match-targets">
          {matchTargetsShuffled.map(target => {
            const selected = matchAnswers[target.id];
            const label = config.matchItems.find(i => i.id === selected)?.label;
            return (
              <button key={target.id} className={`match-target ${selected ? 'filled' : ''}`}
                onClick={() => handleMatchTargetClick(target.id)}>
                <span className="target-prompt">{target.prompt}</span>
                <span className="target-answer">{label ?? 'Seç'}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="actions">
        <button className="ghost-action" onClick={handleMatchReset}>Sıfırla</button>
        <button className="primary-action" onClick={handleMatchCheck}>Kontrol Et</button>
      </div>
      {matchFeedback && <div className="feedback">{matchFeedback}</div>}
    </>
  );

  const renderMemoryStep = () => (
    <>
      <h2>Hafıza Oyunu</h2>
      <p className="step-lead">Kartları eşleştir.</p>
      <div className="memory-grid">
        {memoryDeck.map((card, index) => (
          <button key={card.key} className={`memory-card ${card.matched ? 'matched' : card.revealed ? 'revealed' : ''}`}
            onClick={() => handleCardClick(index)} disabled={card.matched}>
            <span className="memory-icon">{card.revealed || card.matched ? card.icon : '❔'}</span>
          </button>
        ))}
      </div>
      {memoryFeedback && <div className="feedback">{memoryFeedback}</div>}
    </>
  );

  const renderColorStep = () => (
    <>
      <h2>Boyama</h2>
      <p className="step-lead">Deseni boya.</p>
      <div className="color-workspace">
        <div className="color-preview">
           <div className="color-hint-text">Hedef Desen</div>
           <div className="color-grid-preview" style={{ display: 'grid', gridTemplateColumns: `repeat(${config.colorGrid.target[0].length}, 25px)`, gap: '3px' }}>
              {config.colorGrid.target.map((row, r) => 
                row.map((c, col) => (
                  <div key={`${r}-${col}`} className="color-preview-cell" style={{ backgroundColor: paletteColorMap.get(c) || '#eee' }} />
                ))
              )}
           </div>
        </div>

        <div className="color-palette">
          {paletteShuffled.map(p => (
            <button key={p.id} className={`color-swatch ${selectedColor === p.id ? 'selected' : ''}`}
              style={{ backgroundColor: p.color }} onClick={() => handleColorSelect(p.id)} />
          ))}
        </div>
        <div className="color-grid">
          {colorGridState.map((row, r) => (
            <div key={r} className="color-row">
              {row.map((c, col) => (
                <button key={col} className="color-cell" 
                  style={{ backgroundColor: c ? paletteColorMap.get(c) : '#fff' }}
                  onClick={() => handleColorCellClick(r, col)} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="actions">
        <button className="ghost-action" onClick={handleColorReset}>Sıfırla</button>
        <button className="primary-action" onClick={handleColorCheck}>Kontrol Et</button>
      </div>
      {colorFeedback && <div className="feedback">{colorFeedback}</div>}
    </>
  );

  const renderSilhouetteStep = () => {
    if (!config.silhouetteGame) return null;
    return (
      <>
        <h2>Gölge Eşleştirme</h2>
        <p className="step-lead">Renkli nesneleri gölgelerine sürükle.</p>
        <div className="silhouette-board">
          <div className="silhouette-items">
            {silhouetteItemsShuffled.map(item => {
              if (silhouetteMatches[item.id]) return null; // Hide matched items
              return (
                <div key={item.id} className="silhouette-item" draggable onDragStart={(e) => handleSilhouetteDragStart(e, item.id)}>
                  <span className="silhouette-icon" style={{ color: item.color }}>{item.icon}</span>
                  <span className="silhouette-label">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="silhouette-targets">
            {config.silhouetteGame.map(target => (
              <div key={target.id} className={`silhouette-target ${silhouetteMatches[target.id] ? 'matched' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleSilhouetteDrop(e, target.id)}>
                {silhouetteMatches[target.id] ? (
                  <span className="silhouette-icon" style={{ color: target.color }}>{target.icon}</span>
                ) : (
                  <span className="silhouette-shadow">{target.icon}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        {silhouetteFeedback && <div className="feedback">{silhouetteFeedback}</div>}
      </>
    );
  };

  const renderSortingStep = () => {
    if (!config.sortingGame) return null;
    const { items, categories } = config.sortingGame;
    const [catLeft, catRight] = categories;

    return (
      <>
        <h2>Kategorileştirme</h2>
        <p className="step-lead">Eşyaları doğru sepete taşı.</p>
        <div className="sorting-game">
          <div className="sorting-zone left" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleSortingDrop(e, 'left')}>
            <div className="zone-header" style={{ backgroundColor: catLeft.color }}>
              <span>{catLeft.icon}</span>
              <span>{catLeft.label}</span>
            </div>
            <div className="zone-content">
              {items.filter(i => sortingState[i.id] === 'left').map(i => (
                <div key={i.id} className="sorted-item">{i.icon} {i.label}</div>
              ))}
            </div>
          </div>

          <div className="sorting-pool">
            {sortingItemsShuffled.filter(i => !sortingState[i.id]).map(item => (
              <div key={item.id} className="sortable-item" draggable onDragStart={(e) => handleSortingDragStart(e, item.id)}>
                <span className="item-icon">{item.icon}</span>
                <span className="item-label">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="sorting-zone right" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleSortingDrop(e, 'right')}>
            <div className="zone-header" style={{ backgroundColor: catRight.color }}>
              <span>{catRight.icon}</span>
              <span>{catRight.label}</span>
            </div>
            <div className="zone-content">
              {items.filter(i => sortingState[i.id] === 'right').map(i => (
                <div key={i.id} className="sorted-item">{i.icon} {i.label}</div>
              ))}
            </div>
          </div>
        </div>
        {sortingFeedback && <div className="feedback">{sortingFeedback}</div>}
      </>
    );
  };

  const renderPuzzleStep = () => (
    <>
      <h2>Kutlama İnşası</h2>
      <div className="puzzle-board">
        <div className="puzzle-slots">
          {config.puzzlePieces.map((p, i) => {
            const current = puzzleSlots[i];
            const piece = config.puzzlePieces.find(pp => pp.id === current);
            const targetHint = p.icon; // İpucu olarak hedef parçanın ikonunu göster
            return (
              <div key={p.id} className="puzzle-slot" onDragOver={e => e.preventDefault()} onDrop={e => handlePuzzleDrop(e, i)}>
                {!piece && (
                    <div className="puzzle-hint">
                        {targetHint}
                    </div>
                )}
                {piece && (
                  <div className="puzzle-piece" draggable onDragStart={e => handlePuzzleDragStart(e, piece.id, `slot-${i}`)}
                    style={{ backgroundColor: piece.color }}>
                    {piece.icon}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="puzzle-tray" onDragOver={e => e.preventDefault()} onDrop={e => handlePuzzleDrop(e, -1)}>
          {availablePieces.map(p => (
            <div key={p.id} className="puzzle-piece" draggable onDragStart={e => handlePuzzleDragStart(e, p.id, 'tray')}
              style={{ backgroundColor: p.color }}>
              {p.icon}
            </div>
          ))}
        </div>
      </div>
      <div className="actions">
        <button className="ghost-action" onClick={handlePuzzleReset}>Sıfırla</button>
      </div>
      {puzzleFeedback && <div className="feedback">{puzzleFeedback}</div>}
    </>
  );

  const renderRhythmStep = () => (
    <>
      <h2>Ritim</h2>
      <p className="step-lead">Sırayı takip et ve butonlara bas.</p>
      
      <div className="rhythm-sequence-display" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '15px', 
        marginBottom: '40px',
        padding: '20px',
        background: '#f0f9ff',
        borderRadius: '20px',
        flexWrap: 'wrap'
      }}>
        {config.rhythmSequence.map((actionId, index) => {
            const action = config.rhythmActions.find(a => a.id === actionId);
            const isCurrent = index === rhythmIndex;
            const isDone = index < rhythmIndex;
            
            return (
                <div key={index} className="sequence-item" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: isDone ? '#10b981' : (isCurrent ? '#fff' : '#e2e8f0'),
                    border: isCurrent ? '4px solid #54A0FF' : 'none',
                    color: isDone ? 'white' : '#2D2D2D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    opacity: index > rhythmIndex ? 0.5 : 1,
                    transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
                    transition: 'all 0.3s',
                    boxShadow: isCurrent ? '0 5px 15px rgba(84, 160, 255, 0.4)' : 'none'
                }}>
                    {isDone ? '✓' : action?.icon}
                </div>
            );
        })}
      </div>

      <div className="rhythm-board">
        <div className="rhythm-actions">
          {rhythmActionsShuffled.map(a => (
            <button key={a.id} className="rhythm-action" onClick={() => handleRhythmAction(a.id)}>
              {a.icon}
            </button>
          ))}
        </div>
      </div>
      {rhythmFeedback && <div className="feedback">{rhythmFeedback}</div>}
    </>
  );

  const renderTimelineStep = () => (
    <>
      <h2>Günü Sırala</h2>
      <ul className="ordering-list">
        {timelineOrder.map((item, i) => (
          <li key={item.id}>
            <span>{item.label}</span>
            <div className="ordering-buttons">
              <button onClick={() => handleTimelineMove(i, -1)} disabled={i === 0}>↑</button>
              <button onClick={() => handleTimelineMove(i, 1)} disabled={i === timelineOrder.length - 1}>↓</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="actions"><button className="primary-action" onClick={handleTimelineCheck}>Kontrol Et</button></div>
      {timelineFeedback && <div className="feedback">{timelineFeedback}</div>}
    </>
  );

  const renderOddOneOutStep = () => {
    if (!config.oddOneOutGame) return null;
    return (
      <>
        <h2>Farkı Bul</h2>
        <p className="step-lead">Diğerlerinden farklı olanı seç.</p>
        <div className="odd-one-out-grid" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
          {oddOneOutItemsShuffled.map(item => (
            <button
              key={item.id}
              className={`odd-one-out-item ${oddOneOutSelection === item.id ? 'selected' : ''}`}
              style={{
                width: '120px',
                height: '120px',
                fontSize: '3rem',
                borderRadius: '20px',
                border: oddOneOutSelection === item.id ? '4px solid #54A0FF' : '4px solid #eee',
                background: 'white',
                cursor: 'pointer',
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.2s'
              }}
              onClick={() => handleOddOneOutSelect(item.id)}
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div className="actions">
          <button className="primary-action" onClick={handleOddOneOutCheck}>Kontrol Et</button>
        </div>
        {oddOneOutFeedback && <div className="feedback">{oddOneOutFeedback}</div>}
      </>
    );
  };

  const renderQuizStep = () => (
    <>
      <h2>Mini Test</h2>
      <p>{config.quiz.question}</p>
      <div className="quiz-options">
        {quizOptionOrder.map(idx => (
          <button key={idx} className={`quiz-option ${quizSelection === idx ? 'selected' : ''}`} onClick={() => handleQuizSelect(idx)}>
            {config.quiz.options[idx]}
          </button>
        ))}
      </div>
      <div className="actions"><button className="primary-action" onClick={handleQuizCheck}>Kontrol Et</button></div>
      {quizFeedback && <div className="feedback">{quizFeedback}</div>}
    </>
  );

  const renderCelebrationStep = () => (
    <div className="celebration">
      <h2>Kutlama</h2>
      <p>{config.completionMessage}</p>
      <div className="actions">
        <button className="primary-action" onClick={() => navigate('/map')}>Haritaya Dön</button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    const title = stepLabels[currentStep];
    switch (title) {
      case 'Hazırlık': return renderIntroStep();
      case 'Kelime Oyunu': return renderWordGame();
      case 'Simgeleri Eşleştir': return renderMatchStep();
      case 'Hafıza Oyunu': return renderMemoryStep();
      case 'Boyama': return renderColorStep();
      case 'Gölge Eşleştirme': return renderSilhouetteStep();
      case 'Kategorileştirme': return renderSortingStep();
      case 'Kutlama İnşası': return renderPuzzleStep();
      case 'Ritim': return renderRhythmStep();
      case 'Günü Sırala': return renderTimelineStep();
      case 'Farkı Bul': return renderOddOneOutStep();
      case 'Mini Test': return renderQuizStep();
      case 'Kutlama': return renderCelebrationStep();
      default: return <div>Bilinmeyen Adım</div>;
    }
  };

  const renderNavigation = () => {
    if (stepLabels[currentStep] === 'Kutlama') return null;
    // Hazırlık step: special button inside content, no duplicate next button
    if (stepLabels[currentStep] === 'Hazırlık') return null;

    return (
      <div className="actions">
        {currentStep > 0 && <button className="ghost-action" onClick={goToPreviousStep}>Önceki</button>}
        <button className="primary-action" onClick={goToNextStep} disabled={!isStepComplete(currentStep)}>Sonraki</button>
      </div>
    );
  };

  return (
    <div className="celebration-level">
      <div className="level-progress">
        {stepLabels.map((title, index) => {
          const isCompleted = completedSteps[index] || index < currentStep;
          const isCurrent = index === currentStep;
          return (
            <div key={title} className={`progress-chip ${isCompleted ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
              <span className="chip-index">
                {isCompleted && !isCurrent ? '✓' : index + 1}
              </span>
              <span className="chip-label">{title}</span>
            </div>
          );
        })}
      </div>
      <div className="step-card fade-in">{renderCurrentStep()}</div>
      {renderNavigation()}
    </div>
  );
}
