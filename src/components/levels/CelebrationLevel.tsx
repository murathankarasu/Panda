import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Level } from '../../types';
import { levels as allLevels } from '../../data/levels';
import { updateLevelProgress, unlockNextLevel } from '../../utils/progress';
import { incrementLevelCompletedToday } from '../../utils/dailyQuests';
import './CelebrationLevel.css';
import type {
  MatchTarget,
  TimelineItem,
  MemoryPair,
  ColorConfig,
  PuzzlePiece,
} from '../../types/celebration';
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
  'Kutlama İnşası',
  'Ritim',
  'Günü Sırala',
  'Mini Test',
  'Kutlama',
];

const getInitialMatchState = (targets: MatchTarget[]): Record<string, string | null> =>
  targets.reduce<Record<string, string | null>>((acc, target) => {
    acc[target.id] = null;
    return acc;
  }, {});

export default function CelebrationLevel({ level }: CelebrationLevelProps) {
  const config = getCelebrationConfig(level.id);
  const navigate = useNavigate();

  const stepLabels = useMemo(
    () => (config.stepTitles && config.stepTitles.length === defaultStepTitles.length
      ? config.stepTitles
      : defaultStepTitles),
    [config]
  );

  const paletteShuffled = useMemo(
    () => shuffleArray(config.colorGrid.palette),
    [config]
  );
  const matchItemsShuffled = useMemo(() => shuffleArray(config.matchItems), [config]);
  const matchTargetsShuffled = useMemo(() => shuffleArray(config.matchTargets), [config]);
  const rhythmActionsShuffled = useMemo(
    () => shuffleArray(config.rhythmActions),
    [config]
  );
  const paletteColorMap = useMemo(() => {
    const map = new Map<string, string>();
    config.colorGrid.palette.forEach(item => map.set(item.id, item.color));
    return map;
  }, [config, paletteShuffled]);

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(stepLabels.length).fill(false)
  );

  const [wordOrder, setWordOrder] = useState<number[]>(() =>
    createShuffledIndices(config.wordGame.letterPool.length)
  );

  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [matchAnswers, setMatchAnswers] = useState<Record<string, string | null>>(
    () => getInitialMatchState(config.matchTargets)
  );
  const [matchFeedback, setMatchFeedback] = useState<string | null>(null);
  const [matchSolved, setMatchSolved] = useState(false);

  const [memoryDeck, setMemoryDeck] = useState<MemoryCard[]>(() =>
    buildMemoryDeck(config.memoryPairs)
  );
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryLocked, setMemoryLocked] = useState(false);
  const [memoryFeedback, setMemoryFeedback] = useState<string | null>(null);
  const [memorySolved, setMemorySolved] = useState(false);

  const [selectedColor, setSelectedColor] = useState<string | null>(
    paletteShuffled[0]?.id ?? null
  );
  const [colorGridState, setColorGridState] = useState<string[][]>(() =>
    createEmptyColorGrid(config.colorGrid)
  );
  const [colorFeedback, setColorFeedback] = useState<string | null>(null);
  const [colorSolved, setColorSolved] = useState(false);

  const [puzzleOrder, setPuzzleOrder] = useState<string[]>(() =>
    shuffleArray(config.puzzlePieces.map(piece => piece.id))
  );
  const [puzzleSlots, setPuzzleSlots] = useState<(string | null)[]>(
    () => new Array(config.puzzlePieces.length).fill(null)
  );
  const [puzzleFeedback, setPuzzleFeedback] = useState<string | null>(null);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const [rhythmIndex, setRhythmIndex] = useState(0);
  const [rhythmFeedback, setRhythmFeedback] = useState<string | null>(null);
  const [rhythmSolved, setRhythmSolved] = useState(false);

  const [timelineOrder, setTimelineOrder] = useState<TimelineItem[]>(() =>
    shuffleTimeline(config.timeline)
  );
  const [timelineFeedback, setTimelineFeedback] = useState<string | null>(null);
  const [timelineSolved, setTimelineSolved] = useState(false);

  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);
  const [quizSolved, setQuizSolved] = useState(false);
  const [quizOptionOrder, setQuizOptionOrder] = useState<number[]>(() =>
    createShuffledIndices(config.quiz.options.length)
  );

  const [wordProgress, setWordProgress] = useState<number[]>([]);
  const [wordFeedback, setWordFeedback] = useState<string | null>(null);
  const [wordSolved, setWordSolved] = useState(false);

  const [progressAwarded, setProgressAwarded] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  useEffect(() => {
    setCurrentStep(0);
    setCompletedSteps(Array(stepLabels.length).fill(false));
    setSelectedMatchId(null);
    setMatchAnswers(getInitialMatchState(config.matchTargets));
    setMatchFeedback(null);
    setMatchSolved(false);

    setMemoryDeck(buildMemoryDeck(config.memoryPairs));
    setFlippedCards([]);
    setMemoryLocked(false);
    setMemoryFeedback(null);
    setMemorySolved(false);

    setWordOrder(createShuffledIndices(config.wordGame.letterPool.length));

    const firstPaletteId = paletteShuffled[0]?.id ?? config.colorGrid.palette[0]?.id ?? null;
    setSelectedColor(firstPaletteId);
    setColorGridState(createEmptyColorGrid(config.colorGrid));
    setColorFeedback(null);
    setColorSolved(false);

    setPuzzleOrder(shuffleArray(config.puzzlePieces.map(piece => piece.id)));
    setPuzzleSlots(new Array(config.puzzlePieces.length).fill(null));
    setPuzzleFeedback(null);
    setPuzzleSolved(false);

    setRhythmIndex(0);
    setRhythmFeedback(null);
    setRhythmSolved(false);

    setTimelineOrder(shuffleTimeline(config.timeline));
    setTimelineFeedback(null);
    setTimelineSolved(false);

    setQuizSelection(null);
    setQuizOptionOrder(createShuffledIndices(config.quiz.options.length));
    setQuizFeedback(null);
    setQuizSolved(false);

    setWordProgress([]);
    setWordFeedback(null);
    setWordSolved(false);

    setProgressAwarded(false);
  }, [config, paletteShuffled, stepLabels]);

  useEffect(() => {
    if (currentStep === stepLabels.length - 1 && !progressAwarded) {
      updateLevelProgress(level.id, 3, true);
      unlockNextLevel(allLevels, level.id);
      incrementLevelCompletedToday();
      setProgressAwarded(true);
    }
  }, [currentStep, progressAwarded, level.id, stepLabels.length]);

  const formedWord = useMemo(
    () => wordProgress.map(index => config.wordGame.letterPool[index]).join(''),
    [config.wordGame.letterPool, wordProgress]
  );

  const availablePieces = useMemo(
    () =>
      puzzleOrder
        .map(pieceId => config.puzzlePieces.find(piece => piece.id === pieceId))
        .filter((piece): piece is PuzzlePiece => Boolean(piece))
        .filter(piece => !puzzleSlots.includes(piece.id)),
    [config.puzzlePieces, puzzleOrder, puzzleSlots]
  );

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
        if (next[key] === selectedMatchId) {
          next[key] = null;
        }
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

    const success = config.matchTargets.every(
      target => matchAnswers[target.id] === target.answer
    );

    setMatchSolved(success);
    setMatchFeedback(
      success ? 'Süper! Tüm simgeleri tanıdın.' : 'Bazı eşleştirmeleri yeniden dene.'
    );
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
          i === firstIndex || i === secondIndex
            ? { ...item, matched: true, revealed: true }
            : item
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
              i === firstIndex || i === secondIndex
                ? { ...item, revealed: false }
                : item
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

  const handleColorSelect = (paletteId: string) => {
    setSelectedColor(paletteId);
  };

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
      targetRow.every(
        (expected, colIndex) => colorGridState[rowIndex]?.[colIndex] === expected
      )
    );

    setColorSolved(success);
    setColorFeedback(
      success ? 'Bayrağı doğru renklendirdin!' : 'Bazı kareleri yeniden boyayabilirsin.'
    );
  };

  const handleColorReset = () => {
    setColorGridState(createEmptyColorGrid(config.colorGrid));
    setColorSolved(false);
    setColorFeedback(null);
  };

  const handlePuzzleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    pieceId: string,
    origin: string
  ) => {
    event.dataTransfer.setData('pieceId', pieceId);
    event.dataTransfer.setData('origin', origin);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handlePuzzleDrop = (event: React.DragEvent<HTMLDivElement>, slotIndex: number) => {
    event.preventDefault();
    const pieceId = event.dataTransfer.getData('pieceId');
    const origin = event.dataTransfer.getData('origin');
    if (!pieceId) return;

    setPuzzleSlots(prev => {
      const next = [...prev];
      const originFromSlot = origin.startsWith('slot-')
        ? Number.parseInt(origin.split('-')[1], 10)
        : null;

      if (originFromSlot !== null && Number.isInteger(originFromSlot)) {
        next[originFromSlot] = null;
      }

      const existingIndex = next.findIndex(id => id === pieceId);
      if (existingIndex !== -1) {
        next[existingIndex] = null;
      }

      const displaced = next[slotIndex];
      next[slotIndex] = pieceId;

      if (displaced && originFromSlot !== null && Number.isInteger(originFromSlot)) {
        next[originFromSlot] = displaced;
      }

      const solved = config.puzzlePieces.every(
        (piece, idx) => next[idx] === piece.id
      );
      setPuzzleSolved(solved);
      setPuzzleFeedback(
        solved
          ? 'Kutlama düzenini başarıyla kurdun!'
          : 'İpucundaki sıraya göre parçaları yerleştirmeyi sürdür.'
      );

      return next;
    });
  };

  const handlePuzzleReset = () => {
    setPuzzleOrder(shuffleArray(config.puzzlePieces.map(piece => piece.id)));
    setPuzzleSlots(new Array(config.puzzlePieces.length).fill(null));
    setPuzzleFeedback('Parçalar sıfırlandı, ipucuna göre yeniden dene.');
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
    const temp = updated[newIndex];
    updated[newIndex] = updated[index];
    updated[index] = temp;

    setTimelineOrder(updated);
    setTimelineFeedback(null);
    setTimelineSolved(false);
  };

  const handleTimelineCheck = () => {
    const success = timelineOrder.every(
      (item, idx) => item.id === config.timeline[idx].id
    );
    setTimelineSolved(success);
    setTimelineFeedback(
      success ? 'Günün sırasını doğru belirledin!' : 'Bir daha bak, ufak bir değişiklik gerek.'
    );
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

  const goToPreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const goToNextStep = () => {
    setCompletedSteps(prev => {
      const next = [...prev];
      next[currentStep] = true;
      return next;
    });
    setCurrentStep(prev => Math.min(prev + 1, stepLabels.length - 1));
  };

  const isStepComplete = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0:
        return true;
      case 1:
        return wordSolved;
      case 2:
        return matchSolved;
      case 3:
        return memorySolved;
      case 4:
        return colorSolved;
      case 5:
        return puzzleSolved;
      case 6:
        return rhythmSolved;
      case 7:
        return timelineSolved;
      case 8:
        return quizSolved;
      case 9:
        return true;
      default:
        return false;
    }
  };

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
        {config.prepHints.map(hint => (
          <li key={hint}>{hint}</li>
        ))}
      </ul>
    </>
  );

  const renderWordGame = () => {
    const answerLength = config.wordGame.answer.length;

    return (
      <>
        <h2>Kelime Oyunu</h2>
        <p className="step-lead">{config.wordGame.prompt}</p>

        <div className="word-slots">
          {Array.from({ length: answerLength }).map((_, index) => (
            <div key={index} className="word-slot">
              {formedWord[index] ?? ''}
            </div>
          ))}
        </div>

        <div className="word-pool">
          {wordOrder.map(poolIndex => {
            const letter = config.wordGame.letterPool[poolIndex];
            const used = wordProgress.includes(poolIndex);
            return (
              <button
                key={`${letter}-${poolIndex}`}
                type="button"
                className={`word-letter ${used ? 'used' : ''}`}
                onClick={() => handleLetterPick(poolIndex)}
                disabled={used || wordSolved}
              >
                {letter}
              </button>
            );
          })}
        </div>

        <div className="word-actions">
          <button
            type="button"
            className="ghost-action"
            onClick={handleWordUndo}
            disabled={!wordProgress.length || wordSolved}
          >
            Geri Al
          </button>
          <button type="button" className="primary-action" onClick={handleWordCheck}>
            Kontrol Et
          </button>
        </div>

        {wordFeedback && <div className="feedback">{wordFeedback}</div>}
      </>
    );
  };

  const renderMatchStep = () => (
    <>
      <h2>Simgeleri Eşleştir</h2>
      <p className="step-lead">Simgeleri doğru açıklamalarla buluştur.</p>
      <div className="match-board">
        <div className="match-items">
          <h3>Bayram Simgeleri</h3>
          {matchItemsShuffled.map(item => (
            <button
              key={item.id}
              type="button"
              className={`match-item ${selectedMatchId === item.id ? 'selected' : ''}`}
              onClick={() => handleMatchItemSelect(item.id)}
            >
              <span className="match-badge">{item.badge}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="match-targets">
          <h3>Hangi açıklama?</h3>
          {matchTargetsShuffled.map(target => {
            const selected = matchAnswers[target.id];
            const selectedLabel = config.matchItems.find(item => item.id === selected)?.label;
            return (
              <button
                key={target.id}
                type="button"
                className={`match-target ${selected ? 'filled' : ''}`}
                onClick={() => handleMatchTargetClick(target.id)}
              >
                <span className="target-prompt">{target.prompt}</span>
                <span className="target-answer">
                  {selectedLabel ?? 'Seç'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="actions">
        <button type="button" className="ghost-action" onClick={handleMatchReset}>
          Sıfırla
        </button>
        <button type="button" className="primary-action" onClick={handleMatchCheck}>
          Kontrol Et
        </button>
      </div>
      {matchFeedback && <div className="feedback">{matchFeedback}</div>}
    </>
  );

  const renderMemoryStep = () => (
    <>
      <h2>Hafıza Oyunu</h2>
      <p className="step-lead">Aynı simgeleri açarak eşleştir.</p>
      <div className="memory-grid">
        {memoryDeck.map((card, index) => (
          <button
            key={card.key}
            type="button"
            className={`memory-card ${
              card.matched ? 'matched' : card.revealed ? 'revealed' : ''
            }`}
            onClick={() => handleCardClick(index)}
            disabled={card.matched}
          >
            <span className="memory-icon">{card.revealed || card.matched ? card.icon : '❔'}</span>
            {(card.revealed || card.matched) && <span className="memory-label">{card.label}</span>}
          </button>
        ))}
      </div>
      {memoryFeedback && <div className="feedback">{memoryFeedback}</div>}
    </>
  );

  const renderColorStep = () => (
    <>
      <h2>Doğru Alanı Boya</h2>
      <p className="step-lead">
        Paletten bir rengi seç ve kareleri boyayarak deseni tamamla.
      </p>
      <div className="color-hint">
        <div className="color-preview">
          {config.colorGrid.target.map((row, rowIndex) => (
            <div key={`preview-${rowIndex}`} className="color-preview-row">
              {row.map((cell, colIndex) => {
                const colorValue = paletteColorMap.get(cell) ?? '#e2e8f0';
                return (
                  <div
                    key={`preview-${rowIndex}-${colIndex}`}
                    className="color-preview-cell"
                    style={{ backgroundColor: colorValue }}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="color-hint-text">
          <strong>İpucu:</strong> {config.colorGrid.hint}
        </div>
      </div>
      <div className="color-workspace">
        <div className="color-palette">
          {paletteShuffled.map(paletteItem => (
            <button
              key={paletteItem.id}
              type="button"
              className={`color-swatch ${selectedColor === paletteItem.id ? 'selected' : ''}`}
              style={{ backgroundColor: paletteItem.color }}
              onClick={() => handleColorSelect(paletteItem.id)}
            >
              {paletteItem.label}
            </button>
          ))}
        </div>
        <div className="color-grid">
          {colorGridState.map((row, rowIndex) => (
            <div key={rowIndex} className="color-row">
              {row.map((cell, colIndex) => {
                const paletteItemColor = cell ? paletteColorMap.get(cell) ?? '#ffffff' : '#ffffff';
                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    type="button"
                    className="color-cell"
                    style={{ backgroundColor: paletteItemColor }}
                    onClick={() => handleColorCellClick(rowIndex, colIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="actions">
        <button type="button" className="ghost-action" onClick={handleColorReset}>
          Sıfırla
        </button>
        <button type="button" className="primary-action" onClick={handleColorCheck}>
          Kontrol Et
        </button>
      </div>
      {colorFeedback && <div className="feedback">{colorFeedback}</div>}
    </>
  );

  const renderPuzzleStep = () => (
    <>
      <h2>Kutlama İnşası</h2>
      <p className="step-lead">Kutlama düzenini parçaları birleştirerek oluştur.</p>
      <div className="puzzle-hint">
        <div className="puzzle-outline">
          {config.puzzlePieces.map((piece, index) => (
            <div key={piece.id} className="puzzle-outline-step">
              <span className="puzzle-outline-index">{index + 1}</span>
              <span className="puzzle-outline-icon">{piece.icon}</span>
              <span className="puzzle-outline-label">{piece.label}</span>
            </div>
          ))}
        </div>
        <div className="puzzle-hint-text">
          <strong>İpucu:</strong> {config.puzzleHint}
        </div>
      </div>
      <div className="puzzle-board">
        <div
          className="puzzle-tray"
          onDragOver={event => event.preventDefault()}
          onDrop={event => {
            event.preventDefault();
            const pieceId = event.dataTransfer.getData('pieceId');
            const origin = event.dataTransfer.getData('origin');
            if (!pieceId) return;
            setPuzzleSlots(prev => {
              const next = prev.map(id => (id === pieceId ? null : id));
              if (origin.startsWith('slot-')) {
                const slotIndex = Number.parseInt(origin.split('-')[1], 10);
                if (Number.isInteger(slotIndex)) {
                  next[slotIndex] = null;
                }
              }
              return next;
            });
          }}
        >
          <h3>Parçalar</h3>
          <div className="puzzle-piece-list">
            {availablePieces.map(piece => (
              <div
                key={piece.id}
                className="puzzle-piece"
                draggable
                onDragStart={event => handlePuzzleDragStart(event, piece.id, 'tray')}
                style={{ backgroundColor: piece.color }}
              >
                <span className="puzzle-piece-icon">{piece.icon}</span>
                <span>{piece.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="puzzle-slots">
          {config.puzzlePieces.map((piece, index) => {
            const currentPieceId = puzzleSlots[index];
            const currentPiece = config.puzzlePieces.find(p => p.id === currentPieceId);
            return (
              <div
                key={piece.id}
                className={`puzzle-slot ${currentPiece ? 'filled' : ''}`}
                onDragOver={event => event.preventDefault()}
                onDrop={event => handlePuzzleDrop(event, index)}
              >
                {currentPiece ? (
                  <div
                    className="puzzle-piece"
                    draggable
                    onDragStart={event =>
                      handlePuzzleDragStart(event, currentPiece.id, `slot-${index}`)
                    }
                    style={{ backgroundColor: currentPiece.color }}
                  >
                    <span className="puzzle-piece-icon">{currentPiece.icon}</span>
                    <span>{currentPiece.label}</span>
                  </div>
                ) : (
                  <span>Buraya bırak</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="actions">
        <button type="button" className="ghost-action" onClick={handlePuzzleReset}>
          Sıfırla
        </button>
      </div>
      {puzzleFeedback && <div className="feedback">{puzzleFeedback}</div>}
    </>
  );

  const renderRhythmStep = () => (
    <>
      <h2>Ritim Oyunu</h2>
      <p className="step-lead">
        Hareketleri doğru sırayla tıklayarak marş ritmini yakala.
      </p>
      <div className="rhythm-board">
        <div className="rhythm-progress">
          {config.rhythmSequence.map((actionId, index) => {
            const action = config.rhythmActions.find(item => item.id === actionId);
            const completed = index < rhythmIndex;
            return (
              <div
                key={`${actionId}-${index}`}
                className={`rhythm-step ${completed ? 'completed' : ''}`}
              >
                {action?.icon}
              </div>
            );
          })}
        </div>
        <div className="rhythm-actions">
          {rhythmActionsShuffled.map(action => (
            <button
              key={action.id}
              type="button"
              className="rhythm-action"
              onClick={() => handleRhythmAction(action.id)}
            >
              <span className="rhythm-icon">{action.icon}</span>
              <span>{action.label}</span>
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
      <p className="step-lead">Kutlama gününü sabah, öğle, akşam şeklinde sıralamaya çalış.</p>
      <ul className="ordering-list">
        {timelineOrder.map((item, index) => (
          <li key={item.id}>
            <span className="ordering-label">{item.label}</span>
            <div className="ordering-buttons">
              <button type="button" onClick={() => handleTimelineMove(index, -1)} disabled={index === 0}>
                ↑
              </button>
              <button
                type="button"
                onClick={() => handleTimelineMove(index, 1)}
                disabled={index === timelineOrder.length - 1}
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="actions">
        <button type="button" className="primary-action" onClick={handleTimelineCheck}>
          Kontrol Et
        </button>
      </div>
      {timelineFeedback && <div className="feedback">{timelineFeedback}</div>}
    </>
  );

  const renderQuizStep = () => (
    <>
      <h2>Mini Test</h2>
      <p className="step-lead">{config.quiz.question}</p>
      <div className="quiz-options">
        {quizOptionOrder.map(orderIndex => (
          <button
            key={config.quiz.options[orderIndex]}
            type="button"
            className={`quiz-option ${quizSelection === orderIndex ? 'selected' : ''}`}
            onClick={() => handleQuizSelect(orderIndex)}
          >
            {config.quiz.options[orderIndex]}
          </button>
        ))}
      </div>
      <div className="actions">
        <button type="button" className="primary-action" onClick={handleQuizCheck}>
          Kontrol Et
        </button>
      </div>
      {quizFeedback && <div className="feedback">{quizFeedback}</div>}
    </>
  );

  const renderCelebrationStep = () => (
    <div className="celebration">
      <h2>Kutlama</h2>
      <p>{config.completionMessage}</p>
      <p>Şimdi diğer bayramlara da bir yolculuk yapabilirsin.</p>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderIntroStep();
      case 1:
        return renderWordGame();
      case 2:
        return renderMatchStep();
      case 3:
        return renderMemoryStep();
      case 4:
        return renderColorStep();
      case 5:
        return renderPuzzleStep();
      case 6:
        return renderRhythmStep();
      case 7:
        return renderTimelineStep();
      case 8:
        return renderQuizStep();
      case 9:
        return renderCelebrationStep();
      default:
        return null;
    }
  };

  const renderNavigation = () => {
    if (currentStep === stepLabels.length - 1) {
      return (
        <div className="actions">
          <button
            type="button"
            className="primary-action"
            onClick={() => navigate('/map')}
          >
            Haritaya Dön
          </button>
        </div>
      );
    }

    return (
      <div className="actions">
        {currentStep > 0 && (
          <button type="button" className="ghost-action" onClick={goToPreviousStep}>
            Önceki Adım
          </button>
        )}
        <button
          type="button"
          className="primary-action"
          onClick={goToNextStep}
          disabled={!isStepComplete(currentStep)}
        >
          Sonraki Adım
        </button>
      </div>
    );
  };

  return (
    <div className="celebration-level">
      <div className="level-progress">
        {stepLabels.map((title, index) => {
          const active = index <= currentStep || completedSteps[index];
          return (
            <div
              key={title}
              className={`progress-chip ${active ? 'active' : ''} ${
                index === currentStep ? 'current' : ''
              }`}
            >
              <span className="chip-index">{index + 1}</span>
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
