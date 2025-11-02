import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { levels } from '../data/levels';
import {
  getCelebrationConfigMap,
  loadCelebrationOverrides,
  updateCelebrationOverride,
} from '../data/celebrationConfigs';
import type {
  CelebrationConfig,
  ColorConfig,
  PuzzlePiece,
  RhythmAction,
} from '../types/celebration';
import './AdminDashboard.css';

type MessageType = 'success' | 'error';

interface StatusMessage {
  type: MessageType;
  text: string;
}

const cloneConfig = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const slugify = (value: string): string => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9çğıöşü]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'ogey';
};

const ensureUniqueId = (base: string, taken: string[], fallbackPrefix: string): string => {
  const initial = slugify(base) || `${fallbackPrefix}-${taken.length + 1}`;
  let candidate = initial;
  let index = 1;
  while (taken.includes(candidate)) {
    candidate = `${initial}-${index}`;
    index += 1;
  }
  return candidate;
};

const parseList = (raw: string): string[] =>
  raw
    .split('\n')
    .map(item => item.trim())
    .filter(Boolean);

const parseLetterPool = (raw: string): string[] =>
  raw
    .split(/[\s,]+/)
    .map(item => item.trim().toUpperCase())
    .filter(Boolean);

const paletteOptions = (palette: ColorConfig['palette']) =>
  palette.map(option => ({ value: option.id, label: option.label }));

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [messages, setMessages] = useState<Record<string, StatusMessage>>({});
  const [overrides, setOverrides] = useState(loadCelebrationOverrides);

  const configMap = useMemo(() => getCelebrationConfigMap(), [refreshKey]);
  const celebrationIds = useMemo(() => Object.keys(configMap), [configMap]);

  const celebrationLevels = useMemo(
    () => levels.filter(level => celebrationIds.includes(level.id)),
    [celebrationIds]
  );

  const initialDrafts = useMemo(() => {
    const drafts: Record<string, CelebrationConfig> = {};
    celebrationIds.forEach(id => {
      drafts[id] = cloneConfig(configMap[id]);
    });
    return drafts;
  }, [celebrationIds, configMap]);

  const [drafts, setDrafts] = useState<Record<string, CelebrationConfig>>(initialDrafts);

  useEffect(() => {
    setDrafts(initialDrafts);
    setOverrides(loadCelebrationOverrides());
  }, [initialDrafts]);

  const groupedLevels = useMemo(() => {
    const grouped = new Map<string, typeof celebrationLevels>();
    celebrationLevels.forEach(level => {
      if (!grouped.has(level.category)) {
        grouped.set(level.category, []);
      }
      grouped.get(level.category)!.push(level);
    });
    return Array.from(grouped.entries());
  }, [celebrationLevels]);

  const setMessage = (levelId: string, message: StatusMessage) => {
    setMessages(prev => ({ ...prev, [levelId]: message }));
    setTimeout(() => {
      setMessages(prev => {
        const { [levelId]: _, ...rest } = prev;
        return rest;
      });
    }, 2500);
  };

  const updateDraft = (levelId: string, updater: (draft: CelebrationConfig) => void) => {
    setDrafts(prev => {
      const current = prev[levelId];
      if (!current) return prev;
      const clone = cloneConfig(current);
      updater(clone);
      return { ...prev, [levelId]: clone };
    });
  };

  const handleIntroChange = (levelId: string, value: string) => {
    updateDraft(levelId, draft => {
      draft.intro = value;
    });
  };

  const handleVideoChange = (levelId: string, value: string) => {
    const trimmed = value.trim();
    let id = trimmed;
    try {
      const url = new URL(trimmed);
      if (url.hostname.includes('youtube.com')) {
        id = url.searchParams.get('v') || trimmed;
      } else if (url.hostname.includes('youtu.be')) {
        id = url.pathname.replace('/', '') || trimmed;
      }
    } catch {
      // non URL
    }
    updateDraft(levelId, draft => {
      draft.videoId = id;
    });
  };

  const handlePrepHintsChange = (levelId: string, value: string) => {
    const hints = parseList(value);
    updateDraft(levelId, draft => {
      draft.prepHints = hints.length ? hints : [''];
    });
  };

  const addHint = (levelId: string) => {
    updateDraft(levelId, draft => {
      draft.prepHints.push('Yeni ipucu');
    });
  };

  const removeHint = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      draft.prepHints.splice(index, 1);
      if (!draft.prepHints.length) {
        draft.prepHints = [''];
      }
    });
  };

  const handleWordPromptChange = (levelId: string, value: string) => {
    updateDraft(levelId, draft => {
      draft.wordGame.prompt = value;
    });
  };

  const handleWordAnswerChange = (levelId: string, value: string) => {
    updateDraft(levelId, draft => {
      draft.wordGame.answer = value.toUpperCase();
    });
  };

  const handleLetterPoolChange = (levelId: string, value: string) => {
    const pool = parseLetterPool(value);
    updateDraft(levelId, draft => {
      draft.wordGame.letterPool = pool.length ? pool : draft.wordGame.answer.split('');
    });
  };

  const autoFillLetterPool = (levelId: string) => {
    updateDraft(levelId, draft => {
      const answerLetters = draft.wordGame.answer.split('');
      const extras = draft.wordGame.letterPool.filter(letter => !answerLetters.includes(letter));
      draft.wordGame.letterPool = [...answerLetters, ...extras];
    });
  };

  const addMatchItem = (levelId: string) => {
    updateDraft(levelId, draft => {
      const taken = draft.matchItems.map(item => item.id);
      const newId = ensureUniqueId('Yeni Sembol', taken, 'item');
      draft.matchItems.push({
        id: newId,
        label: 'Yeni Sembol',
        badge: '✨',
      });
      draft.matchTargets.forEach(target => {
        if (!draft.matchItems.some(item => item.id === target.answer)) {
          target.answer = newId;
        }
      });
    });
  };

  const removeMatchItem = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      const removed = draft.matchItems.splice(index, 1)[0];
      if (!draft.matchItems.length) {
        draft.matchItems.push({
          id: 'item-1',
          label: 'Yeni Sembol',
          badge: '✨',
        });
      }
      const fallbackId = draft.matchItems[0].id;
      draft.matchTargets.forEach(target => {
        if (target.answer === removed.id) {
          target.answer = fallbackId;
        }
      });
    });
  };

  const updateMatchItem = (
    levelId: string,
    index: number,
    field: 'label' | 'badge',
    value: string
  ) => {
    updateDraft(levelId, draft => {
      const item = draft.matchItems[index];
      if (!item) return;
      if (field === 'label') {
        const taken = draft.matchItems
          .filter((_, idx) => idx !== index)
          .map(existing => existing.id);
        const newId = ensureUniqueId(value, taken, 'item');
        const oldId = item.id;
        item.label = value;
        item.id = newId;
        draft.matchTargets.forEach(target => {
          if (target.answer === oldId) {
            target.answer = newId;
          }
        });
      } else {
        item.badge = value;
      }
    });
  };

  const addMatchTarget = (levelId: string) => {
    updateDraft(levelId, draft => {
      const fallbackId = draft.matchItems[0]?.id || 'item-1';
      draft.matchTargets.push({
        id: ensureUniqueId(`hedef-${draft.matchTargets.length + 1}`, draft.matchTargets.map(t => t.id), 'target'),
        prompt: 'Yeni yönerge',
        answer: fallbackId,
      });
    });
  };

  const removeMatchTarget = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      draft.matchTargets.splice(index, 1);
      if (!draft.matchTargets.length) {
        const fallbackId = draft.matchItems[0]?.id || 'item-1';
        draft.matchTargets.push({
          id: 'target-1',
          prompt: 'Yönerge',
          answer: fallbackId,
        });
      }
    });
  };

  const updateMatchTarget = (
    levelId: string,
    index: number,
    field: 'prompt' | 'answer',
    value: string
  ) => {
    updateDraft(levelId, draft => {
      const target = draft.matchTargets[index];
      if (!target) return;
      if (field === 'prompt') {
        target.prompt = value;
      } else {
        target.answer = value;
      }
    });
  };

  const addMemoryPair = (levelId: string) => {
    updateDraft(levelId, draft => {
      const taken = draft.memoryPairs.map(pair => pair.id);
      draft.memoryPairs.push({
        id: ensureUniqueId(`ikon-${draft.memoryPairs.length + 1}`, taken, 'ikon'),
        icon: '✨',
        label: 'Yeni Kart',
      });
    });
  };

  const removeMemoryPair = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      draft.memoryPairs.splice(index, 1);
      if (!draft.memoryPairs.length) {
        draft.memoryPairs.push({
          id: 'ikon-1',
          icon: '✨',
          label: 'Yeni Kart',
        });
      }
    });
  };

  const updateMemoryPair = (
    levelId: string,
    index: number,
    field: 'icon' | 'label',
    value: string
  ) => {
    updateDraft(levelId, draft => {
      const pair = draft.memoryPairs[index];
      if (!pair) return;
      pair[field] = value;
      if (field === 'label') {
        const taken = draft.memoryPairs
          .filter((_, idx) => idx !== index)
          .map(item => item.id);
        pair.id = ensureUniqueId(value, taken, 'ikon');
      }
    });
  };

  const updatePaletteItem = (
    levelId: string,
    index: number,
    field: 'label' | 'color',
    value: string
  ) => {
    updateDraft(levelId, draft => {
      const paletteItem = draft.colorGrid.palette[index];
      if (!paletteItem) return;
      if (field === 'color') {
        paletteItem.color = value;
      } else {
        const taken = draft.colorGrid.palette
          .filter((_, idx) => idx !== index)
          .map(item => item.id);
        const newId = ensureUniqueId(value, taken, 'renk');
        const oldId = paletteItem.id;
        paletteItem.label = value;
        paletteItem.id = newId;
        draft.colorGrid.target = draft.colorGrid.target.map(row =>
          row.map(cell => (cell === oldId ? newId : cell))
        );
      }
    });
  };

  const addPaletteItem = (levelId: string) => {
    updateDraft(levelId, draft => {
      const taken = draft.colorGrid.palette.map(item => item.id);
      const newId = ensureUniqueId(`Renk ${draft.colorGrid.palette.length + 1}`, taken, 'renk');
      draft.colorGrid.palette.push({
        id: newId,
        label: `Renk ${draft.colorGrid.palette.length + 1}`,
        color: '#2563eb',
      });
      draft.colorGrid.target = draft.colorGrid.target.map(row => row.map(cell => cell || newId));
    });
  };

  const removePaletteItem = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      if (draft.colorGrid.palette.length <= 1) return;
      const removed = draft.colorGrid.palette.splice(index, 1)[0];
      const fallback = draft.colorGrid.palette[0]?.id || '';
      draft.colorGrid.target = draft.colorGrid.target.map(row =>
        row.map(cell => (cell === removed.id ? fallback : cell))
      );
    });
  };

  const addColorRow = (levelId: string) => {
    updateDraft(levelId, draft => {
      const fallback = draft.colorGrid.palette[0]?.id || '';
      const columns = draft.colorGrid.target[0]?.length || 3;
      const row = Array.from({ length: columns }, () => fallback);
      draft.colorGrid.target.push(row);
    });
  };

  const removeColorRow = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      if (draft.colorGrid.target.length <= 1) return;
      draft.colorGrid.target.splice(index, 1);
    });
  };

  const addColorColumn = (levelId: string) => {
    updateDraft(levelId, draft => {
      const fallback = draft.colorGrid.palette[0]?.id || '';
      draft.colorGrid.target = draft.colorGrid.target.map(row => [
        ...row,
        fallback,
      ]);
    });
  };

  const removeColorColumn = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      const columnCount = draft.colorGrid.target[0]?.length || 0;
      if (columnCount <= 1) return;
      draft.colorGrid.target = draft.colorGrid.target.map(row => {
        const newRow = [...row];
        newRow.splice(index, 1);
        return newRow;
      });
    });
  };

  const updateColorCell = (levelId: string, row: number, col: number, value: string) => {
    updateDraft(levelId, draft => {
      if (!draft.colorGrid.target[row]) return;
      draft.colorGrid.target[row][col] = value;
    });
  };

  const updateColorHint = (levelId: string, value: string) => {
    updateDraft(levelId, draft => {
      draft.colorGrid.hint = value;
    });
  };

  const addPuzzlePiece = (levelId: string) => {
    updateDraft(levelId, draft => {
      const taken = draft.puzzlePieces.map(piece => piece.id);
      draft.puzzlePieces.push({
        id: ensureUniqueId(`parca-${draft.puzzlePieces.length + 1}`, taken, 'parca'),
        label: 'Yeni Parça',
        icon: '🧩',
        color: '#2563eb',
      });
    });
  };

  const updatePuzzlePiece = (
    levelId: string,
    index: number,
    field: keyof PuzzlePiece,
    value: string
  ) => {
    updateDraft(levelId, draft => {
      const piece = draft.puzzlePieces[index];
      if (!piece) return;
      if (field === 'label') {
        const taken = draft.puzzlePieces
          .filter((_, idx) => idx !== index)
          .map(p => p.id);
        piece.id = ensureUniqueId(value, taken, 'parca');
        piece.label = value;
      } else if (field === 'color') {
        piece.color = value;
      } else if (field === 'icon') {
        piece.icon = value || '🧩';
      }
    });
  };

  const movePuzzlePiece = (levelId: string, index: number, direction: number) => {
    updateDraft(levelId, draft => {
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= draft.puzzlePieces.length) return;
      const pieces = draft.puzzlePieces;
      [pieces[index], pieces[targetIndex]] = [pieces[targetIndex], pieces[index]];
    });
  };

  const removePuzzlePiece = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      draft.puzzlePieces.splice(index, 1);
      if (!draft.puzzlePieces.length) {
        draft.puzzlePieces.push({
          id: 'parca-1',
          label: 'Yeni Parça',
          icon: '🧩',
          color: '#2563eb',
        });
      }
    });
  };

  const updatePuzzleHint = (levelId: string, value: string) => {
    updateDraft(levelId, draft => {
      draft.puzzleHint = value;
    });
  };

  const addRhythmAction = (levelId: string) => {
    updateDraft(levelId, draft => {
      const taken = draft.rhythmActions.map(action => action.id);
      const newId = ensureUniqueId(`aksiyon-${draft.rhythmActions.length + 1}`, taken, 'ritim');
      draft.rhythmActions.push({
        id: newId,
        icon: '🎵',
        label: 'Yeni Hareket',
      });
      if (!draft.rhythmSequence.length) {
        draft.rhythmSequence = [newId];
      }
    });
  };

  const updateRhythmAction = (
    levelId: string,
    index: number,
    field: keyof RhythmAction,
    value: string
  ) => {
    updateDraft(levelId, draft => {
      const action = draft.rhythmActions[index];
      if (!action) return;
      if (field === 'label') {
        const taken = draft.rhythmActions
          .filter((_, idx) => idx !== index)
          .map(act => act.id);
        const newId = ensureUniqueId(value, taken, 'ritim');
        const oldId = action.id;
        action.id = newId;
        action.label = value;
        draft.rhythmSequence = draft.rhythmSequence.map(step => (step === oldId ? newId : step));
      } else if (field === 'icon') {
        action.icon = value || '🎵';
      }
    });
  };

  const removeRhythmAction = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      if (draft.rhythmActions.length <= 1) return;
      const removed = draft.rhythmActions.splice(index, 1)[0];
      const fallback = draft.rhythmActions[0]?.id;
      draft.rhythmSequence = draft.rhythmSequence
        .map(step => (step === removed.id ? fallback : step))
        .filter(Boolean) as string[];
    });
  };

  const addRhythmStep = (levelId: string) => {
    updateDraft(levelId, draft => {
      const fallback = draft.rhythmActions[0]?.id;
      if (!fallback) return;
      draft.rhythmSequence.push(fallback);
    });
  };

  const updateRhythmStep = (levelId: string, index: number, value: string) => {
    updateDraft(levelId, draft => {
      draft.rhythmSequence[index] = value;
    });
  };

  const removeRhythmStep = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      draft.rhythmSequence.splice(index, 1);
      if (!draft.rhythmSequence.length && draft.rhythmActions[0]) {
        draft.rhythmSequence = [draft.rhythmActions[0].id];
      }
    });
  };

  const addTimelineItem = (levelId: string) => {
    updateDraft(levelId, draft => {
      const taken = draft.timeline.map(item => item.id);
      draft.timeline.push({
        id: ensureUniqueId(`adim-${draft.timeline.length + 1}`, taken, 'adim'),
        label: 'Yeni etkinlik',
      });
    });
  };

  const updateTimelineItem = (levelId: string, index: number, value: string) => {
    updateDraft(levelId, draft => {
      const item = draft.timeline[index];
      if (!item) return;
      const taken = draft.timeline
        .filter((_, idx) => idx !== index)
        .map(existing => existing.id);
      item.label = value;
      item.id = ensureUniqueId(value, taken, 'adim');
    });
  };

  const removeTimelineItem = (levelId: string, index: number) => {
    updateDraft(levelId, draft => {
      draft.timeline.splice(index, 1);
      if (!draft.timeline.length) {
        draft.timeline.push({
          id: 'adim-1',
          label: 'Yeni etkinlik',
        });
      }
    });
  };

  const updateCompletionMessage = (levelId: string, value: string) => {
    updateDraft(levelId, draft => {
      draft.completionMessage = value;
    });
  };

  const updateQuizQuestion = (levelId: string, value: string) => {
    updateDraft(levelId, draft => {
      draft.quiz.question = value;
    });
  };

  const updateQuizOptions = (levelId: string, value: string) => {
    const options = parseList(value);
    updateDraft(levelId, draft => {
      draft.quiz.options = options.length ? options : [''];
      if (draft.quiz.correctIndex >= draft.quiz.options.length) {
        draft.quiz.correctIndex = 0;
      }
    });
  };

  const updateQuizCorrectIndex = (levelId: string, value: number) => {
    updateDraft(levelId, draft => {
      const bounded = Math.min(Math.max(value, 0), draft.quiz.options.length - 1);
      draft.quiz.correctIndex = bounded;
    });
  };

  const updateStepTitle = (levelId: string, index: number, value: string) => {
    updateDraft(levelId, draft => {
      if (!draft.stepTitles) return;
      draft.stepTitles[index] = value;
    });
  };

  const clearStepTitles = (levelId: string) => {
    updateDraft(levelId, draft => {
      delete draft.stepTitles;
    });
  };

  const saveLevel = (levelId: string) => {
    const draft = drafts[levelId];
    if (!draft) return;
    updateCelebrationOverride(levelId, draft);
    setOverrides(loadCelebrationOverrides());
    setRefreshKey(key => key + 1);
    setMessage(levelId, { type: 'success', text: 'Değişiklikler kaydedildi.' });
  };

  const resetLevel = (levelId: string) => {
    updateCelebrationOverride(levelId, null);
    setOverrides(loadCelebrationOverrides());
    setRefreshKey(key => key + 1);
    setMessage(levelId, { type: 'success', text: 'Varsayılan ayarlara dönüldü.' });
  };

  const renderMessage = (levelId: string) => {
    const message = messages[levelId];
    if (!message) return null;
    return <div className={`admin-message ${message.type}`}>{message.text}</div>;
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>İçerik Yönetim Paneli</h1>
          <p>
            Bu panelde videoları, metinleri, mini testleri ve mini oyun içeriklerini kod yazmadan
            güncelleyebilirsin. Kaydettiğin değişiklikler hemen uygulamaya yansır.
          </p>
        </div>
        <div className="admin-header-actions">
          <button type="button" className="admin-button ghost" onClick={() => navigate('/map')}>
            Haritaya Dön
          </button>
        </div>
      </header>

      {groupedLevels.map(([category, categoryLevels]) => (
        <section key={category} className="admin-section">
          <div className="admin-section-header">
            <h2>{category}</h2>
            <span className="admin-section-count">{categoryLevels.length} seviye</span>
          </div>

          <div className="admin-level-grid">
            {categoryLevels.map(level => {
              const draft = drafts[level.id];
              if (!draft) return null;
              const hintsText = draft.prepHints.join('\n');
              const quizOptionsText = draft.quiz.options.join('\n');
              const letterPoolText = draft.wordGame.letterPool.join(' ');
              const palette = draft.colorGrid.palette;
              const hasOverride = Boolean(overrides[level.id]);

              return (
                <div key={level.id} className="admin-level-card">
                  <div className="admin-level-headline">
                    <div>
                      <h3>{level.title}</h3>
                      <span className="admin-level-id">{level.id}</span>
                    </div>
                    {hasOverride && <span className="admin-tag">Özelleştirildi</span>}
                  </div>

                  <div className="admin-video-preview">
                    {draft.videoId ? (
                      <iframe
                        title={`${level.title} videosu`}
                        src={`https://www.youtube.com/embed/${draft.videoId}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      />
                    ) : (
                      <div className="admin-video-placeholder">Video ID girilmemiş</div>
                    )}
                  </div>

                  <div className="admin-field-group">
                    <label htmlFor={`${level.id}-video`}>YouTube Video Linki / ID</label>
                    <input
                      id={`${level.id}-video`}
                      type="text"
                      value={draft.videoId}
                      onChange={event => handleVideoChange(level.id, event.target.value)}
                      placeholder="https://youtu.be/..."
                    />
                  </div>

                  <div className="admin-field-group">
                    <label htmlFor={`${level.id}-intro`}>Giriş Metni</label>
                    <textarea
                      id={`${level.id}-intro`}
                      value={draft.intro}
                      onChange={event => handleIntroChange(level.id, event.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label htmlFor={`${level.id}-prep`}>Hazırlık İpuçları</label>
                    <textarea
                      id={`${level.id}-prep`}
                      value={hintsText}
                      onChange={event => handlePrepHintsChange(level.id, event.target.value)}
                      rows={3}
                      placeholder="Her satırda bir ipucu olacak şekilde yaz"
                    />
                    <div className="admin-inline-actions">
                      <button
                        type="button"
                        className="admin-small-button"
                        onClick={() => addHint(level.id)}
                      >
                        İpucu Ekle
                      </button>
                      {draft.prepHints.length > 1 && (
                        <button
                          type="button"
                          className="admin-small-button ghost"
                          onClick={() => removeHint(level.id, draft.prepHints.length - 1)}
                        >
                          Son İpucunu Sil
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="admin-split">
                    <div className="admin-field-group">
                      <label htmlFor={`${level.id}-word-prompt`}>Kelime Oyunu Yönergesi</label>
                      <textarea
                        id={`${level.id}-word-prompt`}
                        value={draft.wordGame.prompt}
                        onChange={event => handleWordPromptChange(level.id, event.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label htmlFor={`${level.id}-word-answer`}>Doğru Kelime</label>
                      <input
                        id={`${level.id}-word-answer`}
                        type="text"
                        value={draft.wordGame.answer}
                        onChange={event => handleWordAnswerChange(level.id, event.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label htmlFor={`${level.id}-letter-pool`}>
                        Harf Havuzu (boşluk veya virgül ile ayır)
                      </label>
                      <input
                        id={`${level.id}-letter-pool`}
                        type="text"
                        value={letterPoolText}
                        onChange={event => handleLetterPoolChange(level.id, event.target.value)}
                      />
                      <button
                        type="button"
                        className="admin-small-button"
                        onClick={() => autoFillLetterPool(level.id)}
                      >
                        Harfleri Cevaptan Doldur
                      </button>
                    </div>
                  </div>

                  <div className="admin-subsection">
                    <h4>Simge Eşleştirme</h4>
                    <div className="admin-subgrid">
                      <div className="admin-list">
                        <div className="admin-list-header">
                          <span>Semboller</span>
                          <button
                            type="button"
                            className="admin-small-button"
                            onClick={() => addMatchItem(level.id)}
                          >
                            Sembol Ekle
                          </button>
                        </div>
                        {draft.matchItems.map((item, index) => (
                          <div key={item.id} className="admin-list-item">
                            <input
                              type="text"
                              value={item.badge}
                              onChange={event =>
                                updateMatchItem(level.id, index, 'badge', event.target.value)
                              }
                              className="admin-emoji-input"
                            />
                            <input
                              type="text"
                              value={item.label}
                              onChange={event =>
                                updateMatchItem(level.id, index, 'label', event.target.value)
                              }
                              placeholder="Sembol adı"
                            />
                            {draft.matchItems.length > 1 && (
                              <button
                                type="button"
                                className="admin-icon-button"
                                onClick={() => removeMatchItem(level.id, index)}
                                aria-label="Sembolü sil"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="admin-list">
                        <div className="admin-list-header">
                          <span>Yönergeler</span>
                          <button
                            type="button"
                            className="admin-small-button"
                            onClick={() => addMatchTarget(level.id)}
                          >
                            Yönerge Ekle
                          </button>
                        </div>
                        {draft.matchTargets.map((target, index) => (
                          <div key={target.id} className="admin-list-item column">
                            <textarea
                              value={target.prompt}
                              onChange={event =>
                                updateMatchTarget(level.id, index, 'prompt', event.target.value)
                              }
                              rows={2}
                              placeholder="Yönerge metni"
                            />
                            <select
                              value={target.answer}
                              onChange={event =>
                                updateMatchTarget(level.id, index, 'answer', event.target.value)
                              }
                            >
                              {draft.matchItems.map(item => (
                                <option key={item.id} value={item.id}>
                                  {item.badge} {item.label}
                                </option>
                              ))}
                            </select>
                            {draft.matchTargets.length > 1 && (
                              <button
                                type="button"
                                className="admin-icon-button"
                                onClick={() => removeMatchTarget(level.id, index)}
                                aria-label="Yönergeyi sil"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="admin-subsection">
                    <h4>Hafıza Kartları</h4>
                    <div className="admin-list">
                      <div className="admin-list-header">
                        <span>Kartlar</span>
                        <button
                          type="button"
                          className="admin-small-button"
                          onClick={() => addMemoryPair(level.id)}
                        >
                          Kart Ekle
                        </button>
                      </div>
                      {draft.memoryPairs.map((pair, index) => (
                        <div key={pair.id} className="admin-list-item">
                          <input
                            type="text"
                            value={pair.icon}
                            onChange={event =>
                              updateMemoryPair(level.id, index, 'icon', event.target.value)
                            }
                            className="admin-emoji-input"
                          />
                          <input
                            type="text"
                            value={pair.label}
                            onChange={event =>
                              updateMemoryPair(level.id, index, 'label', event.target.value)
                            }
                            placeholder="Kart başlığı"
                          />
                          {draft.memoryPairs.length > 1 && (
                            <button
                              type="button"
                              className="admin-icon-button"
                              onClick={() => removeMemoryPair(level.id, index)}
                              aria-label="Kartı sil"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-subsection">
                    <h4>Boyama Deseni</h4>
                    <div className="admin-field-group">
                      <label>Renk Paleti</label>
                      <div className="admin-list">
                        <div className="admin-list-header">
                          <span>Renkler</span>
                          <button
                            type="button"
                            className="admin-small-button"
                            onClick={() => addPaletteItem(level.id)}
                          >
                            Renk Ekle
                          </button>
                        </div>
                        {palette.map((item, index) => (
                          <div key={item.id} className="admin-list-item palette">
                            <input
                              type="color"
                              value={item.color}
                              onChange={event =>
                                updatePaletteItem(level.id, index, 'color', event.target.value)
                              }
                              className="admin-color-input"
                            />
                            <input
                              type="text"
                              value={item.label}
                              onChange={event =>
                                updatePaletteItem(level.id, index, 'label', event.target.value)
                              }
                              placeholder="Renk adı"
                            />
                            {draft.colorGrid.palette.length > 1 && (
                              <button
                                type="button"
                                className="admin-icon-button"
                                onClick={() => removePaletteItem(level.id, index)}
                                aria-label="Rengi sil"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="admin-field-group">
                      <label>Desen Tablosu</label>
                      <div className="admin-table-controls">
                        <button
                          type="button"
                          className="admin-small-button"
                          onClick={() => addColorRow(level.id)}
                        >
                          Satır Ekle
                        </button>
                        {draft.colorGrid.target.length > 1 && (
                          <button
                            type="button"
                            className="admin-small-button ghost"
                            onClick={() => removeColorRow(level.id, draft.colorGrid.target.length - 1)}
                          >
                            Son Satırı Sil
                          </button>
                        )}
                        <button
                          type="button"
                          className="admin-small-button"
                          onClick={() => addColorColumn(level.id)}
                        >
                          Sütun Ekle
                        </button>
                        {draft.colorGrid.target[0]?.length > 1 && (
                          <button
                            type="button"
                            className="admin-small-button ghost"
                            onClick={() => removeColorColumn(level.id, draft.colorGrid.target[0].length - 1)}
                          >
                            Son Sütunu Sil
                          </button>
                        )}
                      </div>
                      <div className="admin-color-grid">
                        {draft.colorGrid.target.map((row, rowIndex) => (
                          <div key={`row-${rowIndex}`} className="admin-color-row">
                            {row.map((cell, colIndex) => (
                              <select
                                key={`cell-${rowIndex}-${colIndex}`}
                                value={cell}
                                onChange={event =>
                                  updateColorCell(level.id, rowIndex, colIndex, event.target.value)
                                }
                              >
                                {paletteOptions(palette).map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="admin-field-group">
                      <label htmlFor={`${level.id}-color-hint`}>Boyama İpucu</label>
                      <textarea
                        id={`${level.id}-color-hint`}
                        value={draft.colorGrid.hint}
                        onChange={event => updateColorHint(level.id, event.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="admin-subsection">
                    <h4>Kutlama İnşası (Puzzle)</h4>
                    <div className="admin-list">
                      <div className="admin-list-header">
                        <span>Parçalar</span>
                        <button
                          type="button"
                          className="admin-small-button"
                          onClick={() => addPuzzlePiece(level.id)}
                        >
                          Parça Ekle
                        </button>
                      </div>
                      {draft.puzzlePieces.map((piece, index) => (
                        <div key={piece.id} className="admin-list-item puzzle">
                          <div className="admin-inline">
                            <button
                              type="button"
                              className="admin-icon-button"
                              onClick={() => movePuzzlePiece(level.id, index, -1)}
                              disabled={index === 0}
                              aria-label="Yukarı taşı"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              className="admin-icon-button"
                              onClick={() => movePuzzlePiece(level.id, index, 1)}
                              disabled={index === draft.puzzlePieces.length - 1}
                              aria-label="Aşağı taşı"
                            >
                              ↓
                            </button>
                          </div>
                          <input
                            type="text"
                            value={piece.icon}
                            onChange={event =>
                              updatePuzzlePiece(level.id, index, 'icon', event.target.value)
                            }
                            className="admin-emoji-input"
                          />
                          <input
                            type="text"
                            value={piece.label}
                            onChange={event =>
                              updatePuzzlePiece(level.id, index, 'label', event.target.value)
                            }
                            placeholder="Parça adı"
                          />
                          <input
                            type="color"
                            value={piece.color}
                            onChange={event =>
                              updatePuzzlePiece(level.id, index, 'color', event.target.value)
                            }
                            className="admin-color-input"
                          />
                          {draft.puzzlePieces.length > 1 && (
                            <button
                              type="button"
                              className="admin-icon-button"
                              onClick={() => removePuzzlePiece(level.id, index)}
                              aria-label="Parçayı sil"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="admin-field-group">
                      <label htmlFor={`${level.id}-puzzle-hint`}>Puzzle İpucu</label>
                      <textarea
                        id={`${level.id}-puzzle-hint`}
                        value={draft.puzzleHint}
                        onChange={event => updatePuzzleHint(level.id, event.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>

                  <div className="admin-subsection">
                    <h4>Ritim Oyunu</h4>
                    <div className="admin-list">
                      <div className="admin-list-header">
                        <span>Hareketler</span>
                        <button
                          type="button"
                          className="admin-small-button"
                          onClick={() => addRhythmAction(level.id)}
                        >
                          Hareket Ekle
                        </button>
                      </div>
                      {draft.rhythmActions.map((action, index) => (
                        <div key={action.id} className="admin-list-item">
                          <input
                            type="text"
                            value={action.icon}
                            onChange={event =>
                              updateRhythmAction(level.id, index, 'icon', event.target.value)
                            }
                            className="admin-emoji-input"
                          />
                          <input
                            type="text"
                            value={action.label}
                            onChange={event =>
                              updateRhythmAction(level.id, index, 'label', event.target.value)
                            }
                            placeholder="Hareket adı"
                          />
                          {draft.rhythmActions.length > 1 && (
                            <button
                              type="button"
                              className="admin-icon-button"
                              onClick={() => removeRhythmAction(level.id, index)}
                              aria-label="Hareketi sil"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="admin-field-group">
                      <label>Sıra (Çocukların tıklayacağı dizi)</label>
                      <div className="admin-list">
                        <div className="admin-list-header">
                          <span>Adımlar</span>
                          <button
                            type="button"
                            className="admin-small-button"
                            onClick={() => addRhythmStep(level.id)}
                          >
                            Adım Ekle
                          </button>
                        </div>
                        {draft.rhythmSequence.map((step, index) => (
                          <div key={`step-${index}`} className="admin-list-item">
                            <select
                              value={step}
                              onChange={event =>
                                updateRhythmStep(level.id, index, event.target.value)
                              }
                            >
                              {draft.rhythmActions.map(action => (
                                <option key={action.id} value={action.id}>
                                  {action.icon} {action.label}
                                </option>
                              ))}
                            </select>
                            {draft.rhythmSequence.length > 1 && (
                              <button
                                type="button"
                                className="admin-icon-button"
                                onClick={() => removeRhythmStep(level.id, index)}
                                aria-label="Adımı sil"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="admin-subsection">
                    <h4>Günü Sırala</h4>
                    <div className="admin-list">
                      <div className="admin-list-header">
                        <span>Etkinlikler</span>
                        <button
                          type="button"
                          className="admin-small-button"
                          onClick={() => addTimelineItem(level.id)}
                        >
                          Etkinlik Ekle
                        </button>
                      </div>
                      {draft.timeline.map((item, index) => (
                        <div key={item.id} className="admin-list-item">
                          <textarea
                            value={item.label}
                            onChange={event =>
                              updateTimelineItem(level.id, index, event.target.value)
                            }
                            rows={2}
                          />
                          {draft.timeline.length > 1 && (
                            <button
                              type="button"
                              className="admin-icon-button"
                              onClick={() => removeTimelineItem(level.id, index)}
                              aria-label="Etkinliği sil"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="admin-subsection">
                    <h4>Mini Test</h4>
                    <div className="admin-field-grid">
                      <div className="admin-field-group">
                        <label htmlFor={`${level.id}-quiz-question`}>Soru</label>
                        <textarea
                          id={`${level.id}-quiz-question`}
                          value={draft.quiz.question}
                          onChange={event => updateQuizQuestion(level.id, event.target.value)}
                          rows={2}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label htmlFor={`${level.id}-quiz-options`}>
                          Şıklar (her satır bir şık)
                        </label>
                        <textarea
                          id={`${level.id}-quiz-options`}
                          value={quizOptionsText}
                          onChange={event => updateQuizOptions(level.id, event.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="admin-field-group">
                        <label htmlFor={`${level.id}-quiz-index`}>Doğru Şık</label>
                        <select
                          id={`${level.id}-quiz-index`}
                          value={draft.quiz.correctIndex}
                          onChange={event =>
                            updateQuizCorrectIndex(level.id, Number(event.target.value))
                          }
                        >
                          {draft.quiz.options.map((option, optionIndex) => (
                            <option key={`${level.id}-option-${optionIndex}`} value={optionIndex}>
                              {optionIndex + 1}. {option || 'Şık'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="admin-field-group">
                    <label htmlFor={`${level.id}-completion`}>Bitiriş Mesajı</label>
                    <textarea
                      id={`${level.id}-completion`}
                      value={draft.completionMessage}
                      onChange={event => updateCompletionMessage(level.id, event.target.value)}
                      rows={2}
                    />
                  </div>

                  {draft.stepTitles && (
                    <div className="admin-subsection">
                      <h4>Adım Başlıkları</h4>
                      <div className="admin-list">
                        {draft.stepTitles.map((title, index) => (
                          <div key={`step-${index}`} className="admin-list-item">
                            <span className="admin-badge">{index + 1}</span>
                            <input
                              type="text"
                              value={title}
                              onChange={event => updateStepTitle(level.id, index, event.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="admin-small-button ghost"
                        onClick={() => clearStepTitles(level.id)}
                      >
                        Varsayılan adım adlarını kullan
                      </button>
                    </div>
                  )}

                  {renderMessage(level.id)}

                  <div className="admin-card-actions">
                    <button
                      type="button"
                      className="admin-button"
                      onClick={() => saveLevel(level.id)}
                    >
                      Kaydet
                    </button>
                    <button
                      type="button"
                      className="admin-button ghost"
                      onClick={() => resetLevel(level.id)}
                    >
                      Varsayılan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
