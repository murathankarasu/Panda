import { useState, useEffect } from 'react';
import { Level, LevelContent, Question } from '../types';
import { CelebrationConfig } from '../types/celebration';
import { firebaseService } from '../services/firebaseService';
import { generateGameContent } from '../utils/gemini';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './AdminDashboard.css';

const createEmptyGrid = (rows: number, cols: number) =>
  Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(''));

const defaultPalette = [
  { id: 'kirmizi', color: '#EF4444' },
  { id: 'beyaz', color: '#FFFFFF' },
  { id: 'mavi', color: '#60A5FA' }
];

const defaultRhythmActions = [
  { id: 'clap', icon: '👏', label: 'Alkış' },
  { id: 'step', icon: '🦶', label: 'Adım' },
  { id: 'shake', icon: '🪇', label: 'Çıngırak' }
];

// Default Configs
const emptyCelebrationConfig: CelebrationConfig = {
  id: '',
  videoId: '',
  intro: 'Hoş geldin!',
  prepHints: ['Rahat bir yere otur.'],
  stepTitles: ['Hazırlık', 'Kutlama'],
  stepVideoUrls: [],
  completionMessage: 'Tebrikler!',
  wordGame: { prompt: '', answer: '', letterPool: [] },
  matchItems: [],
  matchTargets: [],
  memoryPairs: [],
  colorGrid: { target: createEmptyGrid(5, 5), palette: defaultPalette },
  puzzlePieces: [],
  rhythmSequence: [],
  rhythmActions: [],
  timeline: [],
  quiz: { question: '', options: ['Seçenek 1', 'Seçenek 2'], correctIndex: 0 },
  sortingGame: { categories: [], items: [] },
  silhouetteGame: [],
  oddOneOutGame: { items: [] }
};

const emptyLevelContent: LevelContent = {
  levelId: '',
  story: 'Hikaye metni buraya...',
  heroMedia: { src: '', alt: '' },
  questions: []
};

const normalizeCelebrationConfig = (config?: CelebrationConfig | null): CelebrationConfig => {
  if (!config) {
    return { ...emptyCelebrationConfig };
  }

  const normalizedMatchItems = (config.matchItems || []).map(item => ({
    id: item.id,
    label: item.label || '',
    badge: item.badge ?? (item as any).icon ?? '🌟'
  }));

  const normalizedMatchTargets = (config.matchTargets || []).map(target => ({
    id: target.id,
    prompt: target.prompt || '',
    answer: target.answer || normalizedMatchItems.find(item => item.id)?.id || ''
  }));

  return {
    ...emptyCelebrationConfig,
    ...config,
    wordGame: { ...emptyCelebrationConfig.wordGame, ...(config.wordGame || {}) },
    matchItems: normalizedMatchItems,
    matchTargets: normalizedMatchTargets,
    memoryPairs: config.memoryPairs || [],
    colorGrid: {
      target:
        config.colorGrid?.target && config.colorGrid.target.length
          ? config.colorGrid.target
          : emptyCelebrationConfig.colorGrid.target,
      palette:
        config.colorGrid?.palette && config.colorGrid.palette.length
          ? config.colorGrid.palette
          : emptyCelebrationConfig.colorGrid.palette
    },
    puzzlePieces: config.puzzlePieces || [],
    rhythmSequence: config.rhythmSequence || [],
    rhythmActions:
      config.rhythmActions && config.rhythmActions.length ? config.rhythmActions : defaultRhythmActions,
    timeline: config.timeline || [],
    quiz: { ...emptyCelebrationConfig.quiz, ...(config.quiz || {}) },
    sortingGame: config.sortingGame || { categories: [], items: [] },
    silhouetteGame: config.silhouetteGame || [],
    oddOneOutGame: config.oddOneOutGame || { items: [] }
  };
  };

const normalizeContent = (content?: LevelContent | null): LevelContent => ({
  ...emptyLevelContent,
  ...(content || {}),
  heroMedia: content?.heroMedia || emptyLevelContent.heroMedia,
  questions: content?.questions || []
});

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const [levels, setLevels] = useState<Level[]>([]);
  const [activeLevelId, setActiveLevelId] = useState<string | null>(null);
  
  // Active Data
  const [activeLevel, setActiveLevel] = useState<Level | null>(null);
  const [activeCelebration, setActiveCelebration] = useState<CelebrationConfig | null>(null);
  const [activeContent, setActiveContent] = useState<LevelContent | null>(null);
  
  const [activeTab, setActiveTab] = useState<string>('general');
  const [isLoading, setIsLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // AI Modal State
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiGameType, setAiGameType] = useState<string>('word');
  const [isGenerating, setIsGenerating] = useState(false);

  // Editor helper states
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedRhythmActionId, setSelectedRhythmActionId] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn) {
      loadLevels();
        }
  }, [isLoggedIn]);

  // Prompt user before leaving if unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    if (activeCelebration?.colorGrid?.palette?.length) {
      setSelectedColor(activeCelebration.colorGrid.palette[0].id);
      } else {
      setSelectedColor(null);
    }
  }, [activeCelebration?.colorGrid?.palette]);

  useEffect(() => {
    if (activeCelebration?.rhythmActions?.length) {
      setSelectedRhythmActionId(activeCelebration.rhythmActions[0].id);
      } else {
      setSelectedRhythmActionId('');
      }
  }, [activeCelebration?.rhythmActions]);

  const loadLevels = async () => {
    console.log('🔄 [ADMIN LOG] Levellar yükleniyor...', {
      timestamp: new Date().toLocaleString('tr-TR'),
      user: username || 'admin'
    });
    
    setIsLoading(true);
    try {
      const data = await firebaseService.getLevels();
      console.log('✅ [ADMIN LOG] Levellar başarıyla yüklendi:', {
        count: data.length,
        categories: [...new Set(data.map(l => l.category))],
        levels: data.map(l => ({ id: l.id, title: l.title, category: l.category }))
      });
      setLevels(data);
    } catch (error) {
      console.error('❌ [ADMIN LOG] Level yükleme hatası:', {
        timestamp: new Date().toLocaleString('tr-TR'),
        error: error
      });
      showFlash('error', 'Seviyeler yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    const expectedUser = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const expectedPass = import.meta.env.VITE_ADMIN_PASSWORD || '1234';
    
    console.log('🔐 [ADMIN LOG] Giriş denemesi:', {
      timestamp: new Date().toLocaleString('tr-TR'),
      username: username,
      success: username === expectedUser && password === expectedPass
    });
    
    if (username === expectedUser && password === expectedPass) {
      console.log('✅ [ADMIN LOG] Giriş başarılı:', {
        timestamp: new Date().toLocaleString('tr-TR'),
        user: username
      });
      setIsLoggedIn(true);
    } else {
      console.warn('❌ [ADMIN LOG] Başarısız giriş denemesi:', {
        timestamp: new Date().toLocaleString('tr-TR'),
        attemptedUser: username
      });
      setLoginError('Hatalı kullanıcı adı veya şifre');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setActiveLevelId(null);
  };

  const showFlash = (type: 'success' | 'error', text: string) => {
    setFlashMessage({ type, text });
    setTimeout(() => setFlashMessage(null), 3000);
  };

  // Helper to wrap state setters and mark as dirty
  const updateLevel = (updates: Partial<Level>) => {
      if (!activeLevel) return;
      setActiveLevel({ ...activeLevel, ...updates });
      setHasUnsavedChanges(true);
  };

  const updateCelebration = (updates: Partial<CelebrationConfig>) => {
      if (!activeCelebration) return;
      setActiveCelebration({ ...activeCelebration, ...updates });
      setHasUnsavedChanges(true);
  };

  const updateContent = (updates: Partial<LevelContent>) => {
      if (!activeContent) return;
      setActiveContent({ ...activeContent, ...updates });
      setHasUnsavedChanges(true);
  };

  // Create New Level - Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newLevelDraft, setNewLevelDraft] = useState({
    id: '',
    title: '',
    category: 'Milli Bayramlar',
    type: 'celebration' as 'celebration' | 'standard'
  });

  const handleCreateLevel = () => {
    setShowCreateModal(true);
    setNewLevelDraft({
      id: '',
      title: '',
      category: 'Milli Bayramlar',
      type: 'celebration'
    });
  };

  const handleConfirmCreate = async () => {
    if (!newLevelDraft.id || !newLevelDraft.title) {
      showFlash('error', 'ID ve Başlık zorunludur');
      return;
    }

    // Check if ID already exists
    if (levels.find(l => l.id === newLevelDraft.id)) {
      showFlash('error', 'Bu ID zaten kullanımda');
      return;
    }

    const newLevel: Level = {
      id: newLevelDraft.id,
      title: newLevelDraft.title,
      description: 'Yeni oluşturulan bölüm - düzenlenmeyi bekliyor',
      order: levels.length + 1,
      category: newLevelDraft.category,
      unlocked: true,
      completed: false,
      stars: 0
    };

    console.log('➕ [ADMIN LOG] Yeni bölüm oluşturuluyor:', {
      timestamp: new Date().toLocaleString('tr-TR'),
      user: username || 'admin',
      levelId: newLevelDraft.id,
      title: newLevelDraft.title,
      type: newLevelDraft.type,
      category: newLevelDraft.category,
      order: newLevel.order
    });

    try {
      setIsLoading(true);
      
      console.log('📝 [ADMIN LOG] Level metadata kaydediliyor...');
      await firebaseService.saveLevel(newLevel);
      console.log('✅ [ADMIN LOG] Level metadata kaydedildi');

      if (newLevelDraft.type === 'celebration') {
        console.log('🎉 [ADMIN LOG] Celebration config oluşturuluyor (template ile)...');
        const templateConfig: CelebrationConfig = {
          ...emptyCelebrationConfig,
          id: newLevelDraft.id,
          intro: 'Hoş geldin! Bu özel günü birlikte kutlayacağız.',
          videoId: '',
          completionMessage: 'Harika! Kutlamayı tamamladın! 🎉',
          prepHints: [
            'Rahat bir yere otur',
            'Sesini aç',
            'Hazırsan başlayalım!'
          ],
          stepTitles: ['Hazırlık', 'Oyunlar', 'Kutlama'],
          wordGame: {
            prompt: 'Harfleri doğru sıraya diz',
            answer: 'KUTLAMA',
            letterPool: ['K', 'U', 'T', 'L', 'A', 'M', 'A']
          },
          matchItems: [
            { id: 'm1', label: 'Balon', badge: '🎈' },
            { id: 'm2', label: 'Pasta', badge: '🎂' },
            { id: 'm3', label: 'Hediye', badge: '🎁' }
          ],
          matchTargets: [
            { id: 't1', prompt: 'Havada uçan süsleme', answer: 'm1' },
            { id: 't2', prompt: 'Tatlı sürpriz', answer: 'm2' },
            { id: 't3', prompt: 'Paketlenmiş sürpriz', answer: 'm3' }
          ],
          memoryPairs: [
            { id: 'p1', icon: '🎉' },
            { id: 'p2', icon: '🎊' },
            { id: 'p3', icon: '🎁' }
          ],
          colorGrid: {
            target: createEmptyGrid(5, 5),
            palette: defaultPalette
          },
          puzzlePieces: [
            { id: 'pz1', icon: '🎈', color: '#FF6B9D' },
            { id: 'pz2', icon: '🎊', color: '#C06C84' },
            { id: 'pz3', icon: '🎉', color: '#6C5B7B' }
          ],
          rhythmActions: [
            { id: 'r1', label: 'Alkış', icon: '👏' },
            { id: 'r2', label: 'Zıpla', icon: '⬆️' }
          ],
          rhythmSequence: ['r1', 'r1', 'r2'],
          timeline: [
            { id: 'tm1', label: 'Hazırlık', order: 0 },
            { id: 'tm2', label: 'Kutlama', order: 1 }
          ],
          quiz: {
            question: 'Bu kutlama hangi tarihte?',
            options: ['1 Ocak', '23 Nisan', '29 Ekim'],
            correctIndex: 0
          },
          sortingGame: {
            categories: [
              { id: 'cat1', label: 'Yiyecek', icon: '🍕', color: '#FF6B9D' },
              { id: 'cat2', label: 'İçecek', icon: '🥤', color: '#54A0FF' }
            ],
            items: [
              { id: 'i1', label: 'Pizza', icon: '🍕', category: 'cat1' },
              { id: 'i2', label: 'Su', icon: '💧', category: 'cat2' }
            ]
          },
          silhouetteGame: [
            { id: 's1', label: 'Balon', icon: '🎈', color: '#FF6B9D' }
          ],
          oddOneOutGame: {
            items: [
              { id: 'o1', icon: '🎈', isOdd: false },
              { id: 'o2', icon: '🎈', isOdd: false },
              { id: 'o3', icon: '🎁', isOdd: true }
            ]
          }
        };
        await firebaseService.saveCelebrationConfig(newLevelDraft.id, templateConfig);
        console.log('✅ [ADMIN LOG] Celebration config oluşturuldu (template ile)');
      } else {
        console.log('📖 [ADMIN LOG] Standard content oluşturuluyor (template ile)...');
        const templateContent: LevelContent = {
          ...emptyLevelContent,
          levelId: newLevelDraft.id,
          story: 'Bu bölümün hikayesi buraya gelecek. Admin tarafından düzenlenmeyi bekliyor.',
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question: 'Örnek soru - düzenle',
              options: ['Seçenek 1', 'Seçenek 2', 'Seçenek 3'],
              correctAnswer: 0,
              reward: '10 Puan'
            }
          ]
        };
        await setDoc(doc(db, 'level_contents', newLevelDraft.id), templateContent);
        console.log('✅ [ADMIN LOG] Standard content oluşturuldu (template ile)');
      }

      await loadLevels();
      
      console.log('🎯 [ADMIN LOG] Yeni bölüm başarıyla oluşturuldu!', {
        timestamp: new Date().toLocaleString('tr-TR'),
        levelId: newLevelDraft.id
      });
      
      setShowCreateModal(false);
      showFlash('success', '✨ Yeni bölüm template ile oluşturuldu! Şimdi düzenleyebilirsiniz.');
      
      // Auto-select the new level for immediate editing
      setTimeout(() => selectLevel(newLevel), 500);
    } catch (error) {
      console.error('❌ [ADMIN LOG] Bölüm oluşturma hatası:', {
        timestamp: new Date().toLocaleString('tr-TR'),
        levelId: newLevelDraft.id,
        error: error
      });
      showFlash('error', 'Bölüm oluşturulamadı.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectLevel = async (level: Level) => {
    if (hasUnsavedChanges && !confirm('Kaydedilmemiş değişiklikler var. Yine de ayrılmak istiyor musunuz?')) {
        return;
    }

    console.log('📂 [ADMIN LOG] Level seçildi:', {
      timestamp: new Date().toLocaleString('tr-TR'),
      user: username || 'admin',
      levelId: level.id,
      levelTitle: level.title,
      category: level.category
    });

    setActiveLevelId(level.id);
    setActiveLevel(level);
    setIsLoading(true);
    setHasUnsavedChanges(false); // Reset dirty flag on load
    
    try {
      console.log('🔍 [ADMIN LOG] Level içeriği yükleniyor...', { levelId: level.id });
      
      const celebConfig = await firebaseService.getCelebrationConfig(level.id);
      const content = await firebaseService.getLevelContent(level.id);
      const isCeleb = !!celebConfig && celebConfig.id === level.id;

      if (isCeleb) {
        console.log('🎉 [ADMIN LOG] Celebration level yüklendi:', {
          levelId: level.id,
          hasVideo: !!celebConfig.videoId,
          gamesConfigured: {
            word: !!celebConfig.wordGame?.answer,
            match: celebConfig.matchItems?.length || 0,
            memory: celebConfig.memoryPairs?.length || 0,
            quiz: !!celebConfig.quiz?.question
          }
        });
        setActiveCelebration(normalizeCelebrationConfig(celebConfig));
        setActiveContent(null);
      } else {
        console.log('📖 [ADMIN LOG] Standard level yüklendi:', {
          levelId: level.id,
          hasStory: !!content?.story,
          questionsCount: content?.questions?.length || 0
        });
        setActiveCelebration(null);
        setActiveContent(normalizeContent(content || { ...emptyLevelContent, levelId: level.id }));
      }
      
      setActiveTab('general');
      console.log('✅ [ADMIN LOG] Level başarıyla yüklendi');
    } catch (error) {
      console.error('❌ [ADMIN LOG] Level yükleme hatası:', {
        levelId: level.id,
        error: error,
        timestamp: new Date().toLocaleString('tr-TR')
      });
      showFlash('error', 'İçerik yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!activeLevelId || !activeLevel) return;
    
    const timestamp = new Date().toLocaleString('tr-TR');
    const adminUser = username || 'admin';
    
    console.log('🔵 [ADMIN LOG] Kaydetme başlatıldı:', {
      timestamp,
      user: adminUser,
      levelId: activeLevelId,
      levelTitle: activeLevel.title,
      type: activeCelebration ? 'celebration' : 'standard'
    });
    
    try {
      setIsLoading(true);
      
      // Save level metadata
      console.log('📝 [ADMIN LOG] Level metadata kaydediliyor...', { levelId: activeLevelId });
      await firebaseService.saveLevel(activeLevel);
      console.log('✅ [ADMIN LOG] Level metadata kaydedildi');
      
      // Save content based on type
      if (activeCelebration) {
        console.log('🎉 [ADMIN LOG] Celebration config kaydediliyor...', { 
          levelId: activeLevelId,
          videoId: activeCelebration.videoId,
          gamesCount: {
            word: !!activeCelebration.wordGame.answer,
            match: activeCelebration.matchItems.length,
            memory: activeCelebration.memoryPairs.length,
            color: activeCelebration.colorGrid.target.length,
            quiz: !!activeCelebration.quiz.question,
            rhythm: activeCelebration.rhythmSequence.length,
            timeline: activeCelebration.timeline.length,
            puzzle: activeCelebration.puzzlePieces.length,
            sorting: activeCelebration.sortingGame?.items.length || 0,
            diff: activeCelebration.oddOneOutGame?.items.length || 0,
            shadow: activeCelebration.silhouetteGame?.length || 0
          }
        });
        await firebaseService.saveCelebrationConfig(activeLevelId, activeCelebration);
        console.log('✅ [ADMIN LOG] Celebration config kaydedildi');
      } else if (activeContent) {
        console.log('📖 [ADMIN LOG] Level content kaydediliyor...', { 
          levelId: activeLevelId,
          questionsCount: activeContent.questions.length 
        });
        await setDoc(doc(db, 'level_contents', activeLevelId), activeContent);
        console.log('✅ [ADMIN LOG] Level content kaydedildi');
      }
      
      // Reload levels to reflect changes
      console.log('🔄 [ADMIN LOG] Levellar yeniden yükleniyor...');
      await loadLevels();
      console.log('✅ [ADMIN LOG] Levellar yenilendi');
      
      console.log('🎯 [ADMIN LOG] İşlem başarıyla tamamlandı!', {
        timestamp: new Date().toLocaleString('tr-TR'),
        user: adminUser,
        levelId: activeLevelId,
        duration: 'Başarılı'
      });
      
      showFlash('success', '✅ Tüm değişiklikler kaydedildi ve yayınlandı!');
      setHasUnsavedChanges(false);
    } catch (error: any) {
      console.error('❌ [ADMIN LOG] HATA:', {
        timestamp: new Date().toLocaleString('tr-TR'),
        user: adminUser,
        levelId: activeLevelId,
        error: error?.message,
        stack: error?.stack,
        fullError: error
      });
      showFlash('error', `❌ Kaydetme hatası: ${error?.message || 'Bilinmeyen hata'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const handleAIGenerate = async () => {
    if (!aiTopic || !activeCelebration) return;
    setIsGenerating(true);
    try {
        const result = await generateGameContent(aiGameType as any, aiTopic);
        if (result.error) {
            showFlash('error', result.error);
        } else if (result.data) {
            const newConfig = { ...activeCelebration };
            switch (aiGameType) {
                case 'word': newConfig.wordGame = result.data; break;
                case 'match': 
                    newConfig.matchItems = result.data.matchItems;
                    newConfig.matchTargets = result.data.matchTargets;
                    break;
                case 'quiz': newConfig.quiz = result.data; break;
                case 'rhythm': 
                    newConfig.rhythmSequence = result.data.rhythmSequence;
                    newConfig.rhythmActions = result.data.rhythmActions;
                    break;
                case 'timeline': newConfig.timeline = result.data; break;
                case 'sorting': newConfig.sortingGame = result.data; break;
                case 'oddOneOut': newConfig.oddOneOutGame = result.data; break;
                case 'silhouette': newConfig.silhouetteGame = result.data; break;
            }
            updateCelebration(newConfig);
            showFlash('success', 'İçerik yapay zeka ile üretildi! (Kaydetmeyi unutmayın)');
            setShowAIModal(false);
        }
    } catch (error) {
        console.error(error);
        showFlash('error', 'Beklenmedik bir hata oluştu.');
    } finally {
        setIsGenerating(false);
    }
  };

  // Questions Editor Helper
  const handleAddQuestion = () => {
    if (!activeContent) return;
    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      type: 'multiple-choice',
      question: 'Yeni Soru',
      options: ['Seçenek 1', 'Seçenek 2'],
      correctAnswer: 0,
      reward: '10 Puan',
      sectionVideoUrl: 'https://drive.google.com/file/d/1abc123xyz/preview' // Template video URL
    };
    updateContent({ questions: [...activeContent.questions, newQuestion] });
  };

  const handleUpdateQuestion = (index: number, field: keyof Question, value: any) => {
    if (!activeContent) return;
    const updatedQuestions = [...activeContent.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    updateContent({ questions: updatedQuestions });
  };

  const handleRemoveQuestion = (index: number) => {
    if (!activeContent) return;
    const updatedQuestions = activeContent.questions.filter((_, i) => i !== index);
    updateContent({ questions: updatedQuestions });
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-screen">
        <div className="login-card">
          <h1>Stüdyo Girişi</h1>
          <div className="login-form">
            <input type="text" placeholder="Kullanıcı Adı" className="login-input" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Şifre" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="login-button" onClick={handleLogin}>Giriş Yap</button>
            {loginError && <div className="login-error">{loginError}</div>}
          </div>
        </div>
      </div>
    );
  }

  const groupedLevels = levels.reduce((acc, level) => {
    const cat = level.category || 'Diğer';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(level);
    return acc;
  }, {} as Record<string, Level[]>);

  return (
    <div className="admin-container">
      {flashMessage && <div className={`flash-message ${flashMessage.type}`}>{flashMessage.text}</div>}

      <div className="admin-sidebar">
        <div className="admin-logo">🌈 Stüdyo</div>
        <div className="sidebar-nav">
          <div className="nav-item" onClick={() => { 
              if(hasUnsavedChanges && !confirm('Kaydedilmemiş değişiklikler var. Ayrılmak istiyor musunuz?')) return;
              setActiveLevelId(null); setActiveLevel(null); 
          }}>🏠 Ana Sayfa</div>
          <div className="sidebar-divider" style={{ margin: '10px 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}></div>
          {Object.entries(groupedLevels).map(([category, catLevels]) => (
            <div key={category} style={{ marginBottom: '10px' }}>
                <div style={{ padding: '5px 20px', fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase', color: '#fff', fontWeight: 'bold' }}>{category}</div>
                {catLevels.map(level => (
                    <button key={level.id} className={`nav-item ${activeLevelId === level.id ? 'active' : ''}`} onClick={() => selectLevel(level)}>
                        {/* İkon Eklemesi */}
                        {level.completed ? '✅' : '📝'} {level.title}
                    </button>
                ))}
        </div>
          ))}
          <button className="nav-item" style={{ color: '#4ade80', marginTop: '10px', border: '1px dashed #4ade80', justifyContent: 'center' }} onClick={handleCreateLevel}>
            ➕ Yeni Bölüm
          </button>
        </div>
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>Çıkış Yap</button>
        </div>
      </div>

      <div className="admin-content">
        {!activeLevelId ? (
          <div className="dashboard-home">
            <div className="admin-header"><h2>Hoş Geldin, Editör!</h2></div>
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#54A0FF' }}>{levels.length}</div>
                    <div style={{ color: '#666' }}>Toplam Bölüm</div>
                </div>
                <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1DD1A1' }}>{Object.keys(groupedLevels).length}</div>
                    <div style={{ color: '#666' }}>Kategori</div>
                </div>
            </div>
            <div className="welcome-message" style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem', marginTop: '50px' }}>
                👈 Soldaki menüden düzenlemek istediğin bölümü seç veya yeni bir bölüm oluştur.
            </div>
          </div>
        ) : (
          <>
              <div className="admin-header">
                <div>
                    <h2>{activeLevel?.title}</h2>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                         <span className={`badge ${activeCelebration ? 'badge-celeb' : 'badge-std'}`} style={{ fontSize: '0.8rem', padding: '5px 10px', borderRadius: '10px', background: activeCelebration ? '#e0f2fe' : '#fce7f3', color: activeCelebration ? '#0369a1' : '#be185d', fontWeight: 'bold' }}>
                            {activeCelebration ? 'Kutlama (Oyunlu)' : 'Standart (Hikaye)'}
                        </span>
                        <span style={{ fontSize: '0.8rem', padding: '5px 10px', borderRadius: '10px', background: '#f3f4f6', color: '#374151' }}>
                            {activeLevel?.category}
                        </span>
                    </div>
                </div>
                <div className="header-actions">
                    <button className="admin-button danger" onClick={async () => { 
                      if(!activeLevelId || !activeLevel) return;
                      
                      if(confirm(`"${activeLevel.title}" bölümünü silmek istediğine emin misin?\n\nBu işlem geri alınamaz!`)) { 
                        console.log('🗑️ [ADMIN LOG] Bölüm siliniyor:', {
                          timestamp: new Date().toLocaleString('tr-TR'),
                          user: username || 'admin',
                          levelId: activeLevelId,
                          levelTitle: activeLevel.title,
                          category: activeLevel.category
                        });
                        
                        try {
                          await firebaseService.deleteLevel(activeLevelId);
                          console.log('✅ [ADMIN LOG] Bölüm başarıyla silindi:', {
                            timestamp: new Date().toLocaleString('tr-TR'),
                            levelId: activeLevelId
                          });
                          showFlash('success', 'Bölüm silindi');
                          await loadLevels();
                          setActiveLevelId(null);
                          setActiveLevel(null);
                        } catch (error) {
                          console.error('❌ [ADMIN LOG] Silme hatası:', {
                            timestamp: new Date().toLocaleString('tr-TR'),
                            levelId: activeLevelId,
                            error: error
                          });
                          showFlash('error', 'Silme işlemi başarısız');
                        }
                      } else {
                        console.log('⏸️ [ADMIN LOG] Silme işlemi iptal edildi:', {
                          timestamp: new Date().toLocaleString('tr-TR'),
                          levelId: activeLevelId
                        });
                      }
                    }}>🗑️ Sil</button>
                </div>
          </div>

              <div className="editor-tabs">
                <button className={`admin-button ${activeTab === 'general' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('general')}>⚙️ Genel</button>
                {activeCelebration && (
                    <>
                        <button className={`admin-button ${activeTab === 'content' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('content')}>📹 İçerik</button>
                        <button className={`admin-button ${activeTab === 'word' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('word')}>🔤 Kelime</button>
                        <button className={`admin-button ${activeTab === 'match' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('match')}>🧩 Eşleşme</button>
                        <button className={`admin-button ${activeTab === 'memory' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('memory')}>🧠 Hafıza</button>
                        <button className={`admin-button ${activeTab === 'color' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('color')}>🎨 Boya</button>
                        <button className={`admin-button ${activeTab === 'sorting' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('sorting')}>🧺 Sıralama</button>
                        <button className={`admin-button ${activeTab === 'quiz' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('quiz')}>❓ Test</button>
                        <button className={`admin-button ${activeTab === 'rhythm' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('rhythm')}>🥁 Ritim</button>
                        <button className={`admin-button ${activeTab === 'timeline' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('timeline')}>📅 Zaman</button>
                        <button className={`admin-button ${activeTab === 'puzzle' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('puzzle')}>🖼️ Puzzle</button>
                        <button className={`admin-button ${activeTab === 'diff' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('diff')}>🔍 Fark</button>
                        <button className={`admin-button ${activeTab === 'shadow' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('shadow')}>👥 Gölge</button>
                    </>
                )}
                {activeContent && <button className={`admin-button ${activeTab === 'story-content' ? 'primary' : 'secondary'}`} onClick={() => setActiveTab('story-content')}>📖 Hikaye</button>}
              </div>

              <div className="editor-panel fade-in">
                {activeTab === 'general' && activeLevel && (
                    <div className="admin-section">
                        <div className="admin-section-title">Bölüm Bilgileri</div>
                        <div className="admin-split">
                             <div className="admin-field-group">
                                <label>Bölüm Başlığı</label>
                                <input type="text" value={activeLevel.title} onChange={(e) => updateLevel({ title: e.target.value })} />
                    </div>
                            <div className="admin-field-group">
                                <label>Kategori</label>
                                <input type="text" list="categories" value={activeLevel.category} onChange={(e) => updateLevel({ category: e.target.value })} />
                                <datalist id="categories">
                                    {Object.keys(groupedLevels).map(c => <option key={c} value={c} />)}
                                </datalist>
                  </div>
                        </div>
                        <div className="admin-field-group">
                            <label>Açıklama</label>
                            <input type="text" value={activeLevel.description} onChange={(e) => updateLevel({ description: e.target.value })} />
                        </div>
                         <div className="admin-split">
                            <div className="admin-field-group">
                                <label>Sıra No</label>
                                <input type="number" value={activeLevel.order} onChange={(e) => updateLevel({ order: Number(e.target.value) })} />
                            </div>
                             <div className="admin-field-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '30px' }}>
                                <label style={{ marginBottom: 0 }}>Kilitli mi?</label>
                                <input type="checkbox" checked={!activeLevel.unlocked} onChange={(e) => updateLevel({ unlocked: !e.target.checked })} style={{ width: '20px', height: '20px' }} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'content' && activeCelebration && (
                     <div className="admin-section">
                        <div className="admin-section-title">Video ve İçerik Ayarları</div>
                        
                        <div className="admin-field-group">
                            <label>📹 YouTube Video</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <input 
                                        type="text" 
                                        placeholder="YouTube URL veya Video ID yapıştırın..." 
                                        value={activeCelebration.videoId.length === 11 ? activeCelebration.videoId : activeCelebration.videoId} 
                                        onChange={(e) => {
                                            const extracted = extractVideoId(e.target.value);
                                            updateCelebration({ videoId: extracted });
                                        }}
                                        style={{ flex: 1, fontSize: '1rem' }}
                                    />
                                    {activeCelebration.videoId && activeCelebration.videoId.length === 11 && (
                                        <a 
                                            href={`https://youtube.com/watch?v=${activeCelebration.videoId}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            style={{ padding: '10px 15px', background: '#FF0000', color: 'white', borderRadius: '8px', textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 'bold' }}
                                        >
                                            ▶️ YouTube'da Aç
                                        </a>
                                    )}
                                </div>
                                
                                {activeCelebration.videoId && activeCelebration.videoId.length === 11 ? (
                                    <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '15px', border: '2px solid #ddd' }}>
                                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '10px' }}>
                      <iframe
                                                src={`https://www.youtube.com/embed/${activeCelebration.videoId}`}
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Video önizleme"
                                            />
                                        </div>
                                        <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
                                            Video ID: <code style={{ background: '#e9ecef', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>{activeCelebration.videoId}</code>
                                        </div>
                                    </div>
                    ) : (
                                    <div style={{ padding: '40px', background: '#f8f9fa', borderRadius: '15px', border: '2px dashed #ddd', textAlign: 'center', color: '#999' }}>
                                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📹</div>
                                        <div>YouTube video URL'ini yukarı yapıştırın</div>
                                        <small style={{ display: 'block', marginTop: '5px' }}>
                                            Örnek: https://youtube.com/watch?v=abc123 veya sadece: abc123
                                        </small>
                                    </div>
                    )}
                            </div>
                  </div>

                  <div className="admin-field-group">
                            <label>💬 Giriş Mesajı</label>
                            <textarea rows={3} value={activeCelebration.intro} onChange={(e) => updateCelebration({ intro: e.target.value })} placeholder="Hoş geldin! Bu kutlama senin için özel..." />
                            <small>Kullanıcı bu bölüme girdiğinde göreceği ilk mesaj.</small>
                  </div>

                  <div className="admin-field-group">
                            <label>✅ Tamamlama Mesajı</label>
                            <textarea rows={2} value={activeCelebration.completionMessage} onChange={(e) => updateCelebration({ completionMessage: e.target.value })} placeholder="Tebrikler! Kutlamayı başarıyla tamamladın!" />
                            <small>Kullanıcı tüm oyunları bitirdiğinde göreceği mesaj.</small>
                  </div>

                  <div className="admin-field-group">
                            <label>📋 Hazırlık İpuçları (Her satıra bir tane)</label>
                            <textarea rows={5} value={activeCelebration.prepHints.join('\n')} onChange={(e) => updateCelebration({ prepHints: e.target.value.split('\n').filter(h => h.trim()) })} placeholder="Rahat bir yere otur.&#10;Sesi aç.&#10;Hazırsan başlayalım!" />
                            <small>Kullanıcının hazırlık aşamasında göreceği adımlar.</small>
                        </div>

                        <div className="admin-field-group">
                            <label>🎯 Adım Başlıkları (Her satıra bir tane, sırayla)</label>
                            <textarea rows={3} value={(activeCelebration.stepTitles || ['Hazırlık', 'Kutlama']).join('\n')} onChange={(e) => updateCelebration({ stepTitles: e.target.value.split('\n').filter(s => s.trim()) })} placeholder="Hazırlık&#10;Oyunlar&#10;Kutlama" />
                            <small>Kullanıcının göreceği adım isimleri (Hazırlık, Oyunlar, Video vb.).</small>
                        </div>

                        <div className="admin-field-group" style={{ marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #e5e7eb' }}>
                            <label>🎥 Adım Sonrası Video URL'leri (Her satıra bir tane, sırayla)</label>
                            <textarea 
                                rows={10} 
                                value={activeCelebration.stepVideoUrls?.join('\n') || ''} 
                                onChange={(e) => {
                                    const urls = e.target.value.split('\n').map(u => u.trim());
                                    updateCelebration({ stepVideoUrls: urls.some(u => u) ? urls : undefined });
                                }} 
                                placeholder="https://youtube.com/watch?v=abc123&#10;&#10;https://youtube.com/watch?v=def456&#10;..."
                            />
                            <small>
                                Her adımdan SONRA gösterilecek video URL'leri. 
                                <br />
                                • İlk satır = Kelime Oyunu'ndan sonra, İkinci satır = Eşleştirme'den sonra, vb.
                                <br />
                                • <strong>Not:</strong> Hazırlık adımından sonra video gösterilmez
                                <br />
                                • Boş satır = O adımdan sonra video yok
                                <br />
                                • YouTube, Google Drive veya direkt video URL'leri desteklenir
                            </small>
                        </div>
                     </div>
                )}

                {/* VISUAL QUESTION EDITOR */}
                {activeTab === 'story-content' && activeContent && (
                     <div className="admin-section">
                        <div className="admin-section-title">Hikaye ve Sorular</div>
                        <div className="admin-field-group">
                            <label>Hikaye Metni</label>
                            <textarea rows={6} value={activeContent.story} onChange={(e) => updateContent({ story: e.target.value })} />
                    </div>
                        
                        <div className="questions-editor">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <h3>Sorular ({activeContent.questions.length})</h3>
                                <button className="admin-button" style={{ background: '#10b981', color: 'white' }} onClick={handleAddQuestion}>+ Soru Ekle</button>
                  </div>

                            {activeContent.questions.map((q, idx) => (
                                <div key={q.id} className="question-card" style={{ background: '#f8f9fa', padding: '20px', borderRadius: '15px', marginBottom: '20px', border: '1px solid #eee' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                        <div style={{ fontWeight: 'bold', color: '#54A0FF' }}>Soru {idx + 1}</div>
                                        <button className="admin-button danger" style={{ padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => handleRemoveQuestion(idx)}>Sil</button>
                                    </div>
                                    <div className="admin-field-group">
                                        <input type="text" value={q.question} onChange={(e) => handleUpdateQuestion(idx, 'question', e.target.value)} placeholder="Soru metni..." style={{ fontWeight: 'bold' }} />
                                    </div>
                  <div className="admin-split">
                    <div className="admin-field-group">
                                            <label>Türü</label>
                                            <select value={q.type} onChange={(e) => handleUpdateQuestion(idx, 'type', e.target.value)}>
                                                <option value="multiple-choice">Çoktan Seçmeli</option>
                                                <option value="true-false">Doğru/Yanlış</option>
                                            </select>
                    </div>
                    <div className="admin-field-group">
                                            <label>Ödül</label>
                                            <input type="text" value={q.reward} onChange={(e) => handleUpdateQuestion(idx, 'reward', e.target.value)} />
                                        </div>
                                    </div>
                                    
                                    {q.type === 'multiple-choice' && (
                                        <div className="admin-field-group">
                                            <label>Seçenekler (Her satıra bir tane)</label>
                                            <textarea rows={3} value={q.options?.join('\n')} onChange={(e) => handleUpdateQuestion(idx, 'options', e.target.value.split('\n'))} />
                                            <div style={{ marginTop: '5px' }}>
                                                <label>Doğru Cevap İndeksi (0: İlk, 1: İkinci...)</label>
                                                <input type="number" min={0} max={3} value={q.correctAnswer} onChange={(e) => handleUpdateQuestion(idx, 'correctAnswer', parseInt(e.target.value))} style={{ width: '60px' }} />
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="admin-field-group" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #ddd' }}>
                                        <label>🎥 Bölüm Sonrası Video URL (İsteğe Bağlı)</label>
                                        <input 
                                            type="text" 
                                            value={q.sectionVideoUrl || ''} 
                                            onChange={(e) => handleUpdateQuestion(idx, 'sectionVideoUrl', e.target.value)} 
                                            placeholder="Google Drive linki veya video URL'i (boş bırakılabilir)"
                                            style={{ width: '100%' }}
                                        />
                                        <small style={{ color: '#666', fontSize: '0.85rem', marginTop: '5px', display: 'block' }}>
                                            Bu bölümden sonra gösterilecek video. Google Drive linki veya direkt video URL'i girebilirsiniz.
                                        </small>
                                    </div>
                                </div>
                            ))}
                        </div>
                     </div>
                )}

                {/* VISUAL GAME EDITORS */}
                {activeCelebration && activeTab === 'word' && (
                    <div className="admin-section">
                        <div className="admin-section-title">🔤 Kelime Oyunu</div>
                        <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                            Kullanıcı harflerden kelime oluşturur. Soruyu yazın ve doğru cevabı girin.
                        </p>
                        
                        <div className="admin-field-group">
                            <label>❓ Soru / İpucu</label>
                      <input
                        type="text"
                                value={activeCelebration.wordGame.prompt} 
                                onChange={(e) => updateCelebration({ wordGame: {...activeCelebration.wordGame, prompt: e.target.value} })} 
                                placeholder="Örn: 29 Ekim'de kutlanan günün adı?"
                      />
                    </div>
                        
                    <div className="admin-field-group">
                            <label>✅ Doğru Cevap (Kelime)</label>
                      <input
                        type="text"
                                value={activeCelebration.wordGame.answer} 
                                onChange={(e) => {
                                    const val = e.target.value.toUpperCase();
                                    updateCelebration({ wordGame: {...activeCelebration.wordGame, answer: val, letterPool: val.split('') } });
                                }} 
                                placeholder="Örn: CUMHURİYET"
                                style={{ fontSize: '1.2rem', fontWeight: 'bold', letterSpacing: '2px' }}
                            />
                            <small>Harf havuzu otomatik oluşturulur.</small>
                  </div>

                        <div className="admin-field-group" style={{marginTop: '20px'}}>
                            <label>🎲 Harf Havuzu (İsteğe Bağlı)</label>
                            <input
                              type="text"
                                value={activeCelebration.wordGame.letterPool.join(',')} 
                                onChange={(e) => {
                                    const pool = e.target.value.split(',').map(s => s.trim().toUpperCase()).filter(s => s);
                                    updateCelebration({ wordGame: {...activeCelebration.wordGame, letterPool: pool } });
                                }} 
                                placeholder="C,U,M,H,U,R,İ,Y,E,T,A,B"
                                style={{ letterSpacing: '1px' }}
                            />
                            <small>Zorlaştırmak için ekstra harfler ekleyebilirsiniz. Virgülle ayırın.</small>
                      </div>

                        <div className="ai-helper-banner" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', padding: '15px', borderRadius: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
                            <div><strong>✨ Yapay Zeka ile Kelime Üret</strong></div>
                            <button className="admin-button" style={{ background: 'white', color: '#6366f1' }} onClick={() => { setAiGameType('word'); setShowAIModal(true); }}>Sihirli Değnek 🪄</button>
                        </div>
                    </div>
                )}

                {activeCelebration && activeTab === 'match' && (
                    <div className="admin-section">
                        <div className="admin-section-title">🧩 Eşleştirme Oyunu</div>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Kartları hedeflerle eşleştiren oyun. Her kart için bir hedef soru/ipucu yazın.</p>
                        
                        <div style={{ marginBottom: '15px' }}>
                             <button className="admin-button primary" onClick={() => {
                                 const newId = `m-${Date.now()}`;
                                 const newItem = { id: newId, label: 'Yeni Öğe', badge: '🌟' };
                                 const newTarget = { id: `t-${Date.now()}`, prompt: 'Bunu bul:', answer: newId };
                                 updateCelebration({
                                     matchItems: [...activeCelebration.matchItems, newItem],
                                     matchTargets: [...activeCelebration.matchTargets, newTarget]
                                 });
                             }}>+ Yeni Eşleştirme Çifti Ekle</button>
                          </div>
                        
                        {activeCelebration.matchItems.map((item, i) => (
                            <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', background: '#fff', padding: '15px', borderRadius: '15px', border: '2px solid #eee', alignItems: 'flex-end' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px'}}>Kart (Öğe)</label>
                                    <input type="text" value={item.label || ''} onChange={(e) => {
                                        const newItems = activeCelebration.matchItems.map((it, idx) => 
                                            idx === i ? { ...it, label: e.target.value } : it
                                        );
                                        updateCelebration({ matchItems: newItems });
                                    }} placeholder="Örn: Elma" />
                      </div>
                                <div style={{ width: '80px' }}>
                                    <label style={{fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px'}}>İkon</label>
                                    <input type="text" value={item.badge || ''} onChange={(e) => {
                                        const newItems = activeCelebration.matchItems.map((it, idx) => 
                                            idx === i ? { ...it, badge: e.target.value } : it
                                        );
                                        updateCelebration({ matchItems: newItems });
                                    }} style={{textAlign: 'center', fontSize: '1.5rem'}} placeholder="🍎" />
                    </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px'}}>Hedef (Soru/İpucu)</label>
                                    <input type="text" value={activeCelebration.matchTargets[i]?.prompt || ''} onChange={(e) => {
                                        const newTargets = activeCelebration.matchTargets.map((target, idx) => 
                                            idx === i ? { ...target, prompt: e.target.value } : target
                                        );
                                        updateCelebration({ matchTargets: newTargets });
                                    }} placeholder="Örn: Kırmızı meyve" />
                  </div>
                                <button className="admin-button danger" onClick={() => {
                                    const newItems = activeCelebration.matchItems.filter((_, idx) => idx !== i);
                                    const newTargets = activeCelebration.matchTargets.filter((_, idx) => idx !== i);
                                    updateCelebration({ matchItems: newItems, matchTargets: newTargets });
                                }}>🗑️ Sil</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* MEMORY GAME EDITOR */}
                {activeCelebration && activeTab === 'memory' && (
                    <div className="admin-section">
                        <div className="admin-section-title">🧠 Hafıza Kartları</div>
                        <p style={{ color: '#666', marginBottom: '20px' }}>Kullanıcının eşleştirmesi gereken kart çiftleri. Her çift için icon ekleyin.</p>
                        
                        <div style={{ marginBottom: '15px' }}>
                             <button className="admin-button primary" onClick={() => {
                                 const newId = `mem-${Date.now()}`;
                                 updateCelebration({
                                     memoryPairs: [...activeCelebration.memoryPairs, { id: newId, icon: '🎈' }]
                                 });
                             }}>+ Yeni Çift Ekle</button>
                      </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                            {activeCelebration.memoryPairs.map((pair, i) => (
                                <div key={pair.id} style={{ background: '#fff', padding: '20px', borderRadius: '15px', border: '2px solid #eee', textAlign: 'center' }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{pair.icon}</div>
                          <input
                            type="text"
                            value={pair.icon}
                                        onChange={(e) => {
                                            const newPairs = [...activeCelebration.memoryPairs];
                                            newPairs[i].icon = e.target.value;
                                            updateCelebration({ memoryPairs: newPairs });
                                        }} 
                                        style={{ textAlign: 'center', fontSize: '1.2rem', width: '100%' }} 
                                        placeholder="🌟"
                          />
                            <button
                                        className="admin-button danger" 
                                        style={{ marginTop: '10px', width: '100%' }}
                                        onClick={() => {
                                            const newPairs = activeCelebration.memoryPairs.filter((_, idx) => idx !== i);
                                            updateCelebration({ memoryPairs: newPairs });
                                        }}
                                    >🗑️ Sil</button>
                        </div>
                      ))}
                    </div>
                        {activeCelebration.memoryPairs.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                Henüz hafıza kartı eklenmedi. Yukarıdan ekleyin!
                  </div>
                        )}
                    </div>
                )}

                {/* COLOR GAME VISUAL EDITOR */}
                {activeCelebration && activeTab === 'color' && (
                    <div className="admin-section">
                        <div className="admin-section-title">🎨 Boyama Oyunu</div>
                        <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                            Kullanıcı renklerle deseni boyar (bayrak, sembol vb.). Önce renk paletini ayarlayın, sonra deseni çizin.
                        </p>
                        
                        <div className="admin-split">
                    <div className="admin-field-group">
                                <label>🎨 Renk Paleti</label>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
                                    {activeCelebration.colorGrid.palette.map((p, idx) => (
                                        <div key={p.id} style={{ textAlign: 'center' }}>
                                            <div 
                                                style={{ 
                                                    width: '50px', 
                                                    height: '50px', 
                                                    borderRadius: '12px', 
                                                    background: p.color, 
                                                    border: selectedColor === p.id ? '4px solid #2D2D2D' : '2px solid #ddd', 
                                                    cursor: 'pointer', 
                                                    boxShadow: selectedColor === p.id ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 5px rgba(0,0,0,0.1)',
                                                    transition: 'all 0.2s ease',
                                                    transform: selectedColor === p.id ? 'scale(1.1)' : 'scale(1)'
                                                }}
                                                onClick={() => setSelectedColor(p.id)}
                                                title={`Renk ${idx+1}`}
                                            />
                            <input
                              type="color"
                                                value={p.color} 
                                                onChange={(e) => {
                                                    const newPalette = [...activeCelebration.colorGrid.palette];
                                                    newPalette[idx].color = e.target.value;
                                                    updateCelebration({ colorGrid: {...activeCelebration.colorGrid, palette: newPalette} });
                                                }}
                                                style={{ width: '50px', marginTop: '5px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                                            />
                          </div>
                        ))}
                                    <button 
                                        className="admin-button secondary" 
                                        style={{width: '50px', height: '50px', padding: 0, borderRadius: '12px', fontSize: '1.5rem'}} 
                                        onClick={() => {
                                            const newId = `c-${Date.now()}`;
                                            const newColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                                            updateCelebration({
                                                colorGrid: {
                                                    ...activeCelebration.colorGrid,
                                                    palette: [...activeCelebration.colorGrid.palette, { id: newId, color: newColor }]
                                                }
                                            });
                                        }}
                                        title="Renk ekle"
                                    >+</button>
                      </div>
                                <small>Renk seçip aşağıdaki deseni çizin. Rengi değiştirmek için alttaki renk seçiciyi kullanın.</small>
                    </div>

                    <div className="admin-field-group">
                                <label>📏 Desen Boyutu</label>
                                <div style={{display:'flex', gap: '10px', flexDirection: 'column'}}>
                                    <button className="admin-button secondary" onClick={() => updateCelebration({ colorGrid: {...activeCelebration.colorGrid, target: createEmptyGrid(5,5)}})}>
                                        5×5 (Küçük)
                        </button>
                                    <button className="admin-button secondary" onClick={() => updateCelebration({ colorGrid: {...activeCelebration.colorGrid, target: createEmptyGrid(8,8)}})}>
                                        8×8 (Orta)
                          </button>
                                    <button className="admin-button secondary" onClick={() => updateCelebration({ colorGrid: {...activeCelebration.colorGrid, target: createEmptyGrid(10,15)}})}>
                                        10×15 (Bayrak)
                        </button>
                      </div>
                      </div>
                    </div>

                        <div className="admin-field-group" style={{ marginTop: '30px' }}>
                            <label>🖼️ Desen Çizimi</label>
                            <div style={{ display: 'flex', justifyContent: 'center', background: '#f8f9fa', padding: '30px', borderRadius: '20px', border: '2px dashed #ddd' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${activeCelebration.colorGrid.target[0]?.length || 5}, 40px)`, gap: '3px', background: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                                    {activeCelebration.colorGrid.target.map((row, r) => 
                                        row.map((cell, c) => (
                                            <div key={`${r}-${c}`} 
                                                style={{ 
                                                    width: '40px', 
                                                    height: '40px', 
                                                    background: cell ? activeCelebration.colorGrid.palette.find(p => p.id === cell)?.color : '#E0E0E0',
                                                    border: '2px solid #ccc',
                                                    cursor: 'pointer',
                                                    borderRadius: '4px',
                                                    transition: 'all 0.1s ease'
                                                }}
                                                onClick={() => {
                                                    const newTarget = [...activeCelebration.colorGrid.target];
                                                    newTarget[r] = [...newTarget[r]];
                                                    if (selectedColor) {
                                                        newTarget[r][c] = selectedColor;
                                                    } else {
                                                        newTarget[r][c] = '';
                                                    }
                                                    updateCelebration({ colorGrid: {...activeCelebration.colorGrid, target: newTarget} });
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                                                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      />
                                        ))
                                    )}
                    </div>
                  </div>
                            <div style={{ textAlign: 'center', marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                <button className="admin-button secondary" onClick={() => setSelectedColor(null)}>
                                    🧹 Silgi Modu
                        </button>
                                <button className="admin-button secondary" onClick={() => {
                                    const rows = activeCelebration.colorGrid.target.length;
                                    const cols = activeCelebration.colorGrid.target[0]?.length || 5;
                                    updateCelebration({ colorGrid: {...activeCelebration.colorGrid, target: createEmptyGrid(rows, cols)} });
                                }}>
                                    🗑️ Tümünü Temizle
                            </button>
                          </div>
                        </div>
                    </div>
                )}

                {/* SORTING GAME VISUAL EDITOR */}
                {activeCelebration && activeTab === 'sorting' && (
                    <div className="admin-section">
                        <div className="admin-section-title">🧺 Sıralama / Kategorileştirme</div>
                        <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                            Kullanıcı öğeleri doğru kategorilere sürükler. Önce kategorileri, sonra öğeleri oluşturun.
                        </p>
                        
                        <div className="admin-field-group">
                            <label>📦 Kategoriler (Sepetler)</label>
                            <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
                                {(activeCelebration.sortingGame?.categories || []).map((cat, i) => (
                                    <div key={cat.id} style={{ display: 'flex', gap: '10px', background: cat.color + '20', padding: '15px', borderRadius: '12px', border: `2px solid ${cat.color}`, alignItems: 'center' }}>
                                        <div style={{ fontSize: '1.5rem' }}>{cat.icon}</div>
                          <input
                            type="text"
                                            value={cat.label} 
                                            onChange={(e) => {
                                                if (!activeCelebration.sortingGame) return;
                                                const cats = [...activeCelebration.sortingGame.categories];
                                                cats[i].label = e.target.value;
                                                updateCelebration({ sortingGame: {...activeCelebration.sortingGame, categories: cats} });
                                            }} 
                                            placeholder="Kategori Adı" 
                                            style={{ flex: 1, fontWeight: 'bold' }}
                          />
                          <input
                            type="color"
                                            value={cat.color} 
                                            onChange={(e) => {
                                                if (!activeCelebration.sortingGame) return;
                                                const cats = [...activeCelebration.sortingGame.categories];
                                                cats[i].color = e.target.value;
                                                updateCelebration({ sortingGame: {...activeCelebration.sortingGame, categories: cats} });
                                            }} 
                                            style={{width: '60px', height: '40px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '8px'}}
                                            title="Kategori rengi"
                                        />
                                        <button className="admin-button danger" onClick={() => {
                                            if (!activeCelebration.sortingGame) return;
                                            const cats = activeCelebration.sortingGame.categories.filter((_, idx) => idx !== i);
                                            updateCelebration({ sortingGame: {...activeCelebration.sortingGame, categories: cats} });
                                        }}>🗑️</button>
                        </div>
                      ))}
                    </div>
                            <button className="admin-button secondary" onClick={() => {
                                const newCat = { id: `cat-${Date.now()}`, label: 'Yeni Kategori', color: '#' + Math.floor(Math.random()*16777215).toString(16), icon: '📦' };
                                updateCelebration({ sortingGame: { categories: [...(activeCelebration.sortingGame?.categories || []), newCat], items: activeCelebration.sortingGame?.items || [] } });
                            }}>+ Kategori Ekle</button>
                        </div>

                        <div className="admin-field-group" style={{ marginTop: '30px' }}>
                            <label>🎯 Sıralanacak Öğeler</label>
                            <div style={{ display: 'grid', gap: '10px', marginBottom: '15px' }}>
                                {(activeCelebration.sortingGame?.items || []).map((item, i) => {
                                    const category = activeCelebration.sortingGame?.categories.find(c => c.id === item.category);
                                    return (
                                        <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center', background: category ? category.color + '15' : '#fff', padding: '12px', borderRadius: '10px', border: `2px solid ${category?.color || '#eee'}` }}>
                                            <input 
                                                type="text" 
                                                value={item.icon} 
                                                onChange={(e) => {
                                                    if (!activeCelebration.sortingGame) return;
                                                    const items = [...activeCelebration.sortingGame.items];
                                                    items[i].icon = e.target.value;
                                                    updateCelebration({ sortingGame: {...activeCelebration.sortingGame, items: items} });
                                                }} 
                                                style={{width: '60px', textAlign: 'center', fontSize: '1.3rem'}} 
                                                placeholder="🍎"
                                            />
                                            <input 
                                                type="text" 
                                                value={item.label} 
                                                onChange={(e) => {
                                                    if (!activeCelebration.sortingGame) return;
                                                    const items = [...activeCelebration.sortingGame.items];
                                                    items[i].label = e.target.value;
                                                    updateCelebration({ sortingGame: {...activeCelebration.sortingGame, items: items} });
                                                }} 
                                                placeholder="Öğe Adı" 
                                                style={{flex: 1}}
                                            />
                                            <select 
                                                value={item.category} 
                                                onChange={(e) => {
                                                    if (!activeCelebration.sortingGame) return;
                                                    const items = [...activeCelebration.sortingGame.items];
                                                    items[i].category = e.target.value;
                                                    updateCelebration({ sortingGame: {...activeCelebration.sortingGame, items: items} });
                                                }}
                                                style={{ minWidth: '150px', padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}
                                            >
                                                <option value="">📦 Kategori Seç</option>
                                                {(activeCelebration.sortingGame?.categories || []).map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                                            </select>
                                            <button className="admin-button danger" onClick={() => {
                                                if (!activeCelebration.sortingGame) return;
                                                const items = activeCelebration.sortingGame.items.filter((_, idx) => idx !== i);
                                                updateCelebration({ sortingGame: {...activeCelebration.sortingGame, items: items} });
                                            }}>🗑️</button>
                    </div>
                                    );
                                })}
                            </div>
                            <button className="admin-button primary" onClick={() => {
                                const newItem = { id: `i-${Date.now()}`, label: 'Yeni Öğe', icon: '🎯', category: activeCelebration.sortingGame?.categories[0]?.id || '' };
                                updateCelebration({ sortingGame: { categories: activeCelebration.sortingGame?.categories || [], items: [...(activeCelebration.sortingGame?.items || []), newItem] } });
                            }}>+ Öğe Ekle</button>
                  </div>

                        <div className="ai-helper-banner" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', padding: '15px', borderRadius: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
                            <div><strong>✨ Yapay Zeka ile Kategoriler Üret</strong></div>
                            <button className="admin-button" style={{ background: 'white', color: '#6366f1' }} onClick={() => { setAiGameType('sorting'); setShowAIModal(true); }}>Sihirli Değnek 🪄</button>
                      </div>
                    </div>
                )}
                
                {activeCelebration && activeTab === 'quiz' && (
                    <div className="admin-section">
                        <div className="admin-section-title">❓ Mini Test (Quiz)</div>
                        <p style={{ color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
                            Kullanıcıya çoktan seçmeli soru sorun. Seçenekler arasından doğru cevabı işaretleyin.
                        </p>
                        
                        <div className="admin-field-group">
                            <label>❓ Soru</label>
                          <input
                            type="text"
                                value={activeCelebration.quiz.question} 
                                onChange={(e) => updateCelebration({ quiz: { ...activeCelebration.quiz, question: e.target.value } })} 
                                placeholder="Örn: Cumhuriyet kaç yılında ilan edildi?"
                                style={{ fontSize: '1.1rem' }}
                            />
                        </div>
                        
                        <div className="admin-field-group">
                            <label>📝 Seçenekler</label>
                            <small style={{ display: 'block', marginBottom: '10px', color: '#666' }}>Radio butonuyla doğru cevabı işaretleyin.</small>
                            {activeCelebration.quiz.options.map((opt, idx) => (
                                <div key={idx} className="quiz-option-editor" style={{ background: activeCelebration.quiz.correctIndex === idx ? '#D1FAE5' : '#fff', padding: '12px', borderRadius: '10px', marginBottom: '8px', border: activeCelebration.quiz.correctIndex === idx ? '2px solid #10B981' : '1px solid #E5E7EB' }}>
                          <input
                            type="text"
                                        value={opt} 
                                        onChange={(e) => {
                                            const next = [...activeCelebration.quiz.options];
                                            next[idx] = e.target.value;
                                            updateCelebration({ quiz: { ...activeCelebration.quiz, options: next } });
                                        }} 
                                        placeholder={`Seçenek ${idx + 1}`}
                                        style={{ flex: 1 }}
                                    />
                                    <label className="quiz-correct-toggle" style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '10px' }}>
                                        <input 
                                            type="radio" 
                                            name="quiz-correct" 
                                            checked={activeCelebration.quiz.correctIndex === idx} 
                                            onChange={() => updateCelebration({ quiz: { ...activeCelebration.quiz, correctIndex: idx } })} 
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                        <span style={{ fontWeight: 'bold', color: activeCelebration.quiz.correctIndex === idx ? '#10B981' : '#6B7280' }}>
                                            {activeCelebration.quiz.correctIndex === idx ? '✅ Doğru' : 'Doğru'}
                                        </span>
                                    </label>
                            <button
                                        className="admin-button danger" 
                                        disabled={activeCelebration.quiz.options.length <= 2} 
                                        onClick={() => {
                                            if (activeCelebration.quiz.options.length <= 2) return;
                                            const next = activeCelebration.quiz.options.filter((_, optionIdx) => optionIdx !== idx);
                                            const newCorrect = activeCelebration.quiz.correctIndex >= next.length ? next.length - 1 : activeCelebration.quiz.correctIndex;
                                            updateCelebration({ quiz: { ...activeCelebration.quiz, options: next, correctIndex: Math.max(0, newCorrect) } });
                                        }}
                                        style={{ marginLeft: '10px' }}
                                    >🗑️</button>
                                </div>
                            ))}
                            <button className="admin-button secondary" onClick={() => {
                                updateCelebration({ quiz: { ...activeCelebration.quiz, options: [...activeCelebration.quiz.options, `Seçenek ${activeCelebration.quiz.options.length + 1}`] } });
                            }}>+ Seçenek Ekle</button>
                        </div>

                        <div className="ai-helper-banner" style={{ background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', padding: '15px', borderRadius: '15px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
                            <div><strong>✨ Yapay Zeka ile Soru Üret</strong></div>
                            <button className="admin-button" style={{ background: 'white', color: '#6366f1' }} onClick={() => { setAiGameType('quiz'); setShowAIModal(true); }}>Sihirli Değnek 🪄</button>
                        </div>
                    </div>
                )}

                {activeCelebration && activeTab === 'rhythm' && (
                    <div className="admin-section">
                        <div className="admin-section-title">Ritim Oyunu</div>
                        <div className="admin-field-group">
                            <label>Hareketler</label>
                            {activeCelebration.rhythmActions.map((action, idx) => (
                                <div key={action.id} className="quiz-option-editor">
                                    <input type="text" value={action.label} onChange={(e) => {
                                        const actions = [...activeCelebration.rhythmActions];
                                        actions[idx].label = e.target.value;
                                        updateCelebration({ rhythmActions: actions });
                                    }} placeholder="Hareket adı" />
                                    <input type="text" value={action.icon} onChange={(e) => {
                                        const actions = [...activeCelebration.rhythmActions];
                                        actions[idx].icon = e.target.value;
                                        updateCelebration({ rhythmActions: actions });
                                    }} style={{ width: '60px', textAlign: 'center' }} placeholder="Emoji" />
                                    <button className="admin-button danger" disabled={activeCelebration.rhythmActions.length <= 2} onClick={() => {
                                        if (activeCelebration.rhythmActions.length <= 2) return;
                                        const actions = activeCelebration.rhythmActions.filter((_, i) => i !== idx);
                                        const filteredSequence = activeCelebration.rhythmSequence.filter(step => step !== action.id);
                                        updateCelebration({ rhythmActions: actions, rhythmSequence: filteredSequence });
                                    }}>X</button>
                        </div>
                      ))}
                            <button className="admin-button secondary" onClick={() => {
                                const newId = `act-${Date.now()}`;
                                updateCelebration({ rhythmActions: [...activeCelebration.rhythmActions, { id: newId, icon: '👏', label: 'Alkış' }] });
                            }}>+ Hareket Ekle</button>
                    </div>

                    <div className="admin-field-group">
                            <label>Ritim Sırası</label>
                            {activeCelebration.rhythmSequence.length === 0 && <p className="hint">Henüz adım yok. Aşağıdan ekleyin.</p>}
                            <div className="sequence-list">
                                {activeCelebration.rhythmSequence.map((stepId, idx) => {
                                    const action = activeCelebration.rhythmActions.find(a => a.id === stepId);
                                    return (
                                        <div key={`${stepId}-${idx}`} className="sequence-chip">
                                            <span>{action?.icon || '🎵'} {action?.label || 'Belirsiz'}</span>
                                            <button onClick={() => {
                                                const seq = activeCelebration.rhythmSequence.filter((_, i) => i !== idx);
                                                updateCelebration({ rhythmSequence: seq });
                                            }}>✕</button>
                        </div>
                                    );
                                })}
                            </div>
                            <div className="sequence-adder">
                                <select value={selectedRhythmActionId} onChange={(e) => setSelectedRhythmActionId(e.target.value)}>
                                    {activeCelebration.rhythmActions.map(action => (
                                        <option key={action.id} value={action.id}>{action.icon} {action.label}</option>
                              ))}
                            </select>
                                <button className="admin-button primary" disabled={!selectedRhythmActionId} onClick={() => {
                                    if (!selectedRhythmActionId) return;
                                    updateCelebration({ rhythmSequence: [...activeCelebration.rhythmSequence, selectedRhythmActionId] });
                                }}>Adım Ekle</button>
                          </div>
                      </div>
                    </div>
                )}

                {activeCelebration && activeTab === 'puzzle' && (
                    <div className="admin-section">
                        <div className="admin-section-title">Puzzle Oyunu</div>
                        {activeCelebration.puzzlePieces.map((piece, idx) => (
                            <div key={piece.id} className="puzzle-piece-editor">
                                <input type="text" value={piece.icon} onChange={(e) => {
                                    const pieces = [...activeCelebration.puzzlePieces];
                                    pieces[idx].icon = e.target.value;
                                    updateCelebration({ puzzlePieces: pieces });
                                }} placeholder="Emoji" style={{ width: '80px', textAlign: 'center' }} />
                                <input type="color" value={piece.color || '#ffffff'} onChange={(e) => {
                                    const pieces = [...activeCelebration.puzzlePieces];
                                    pieces[idx].color = e.target.value;
                                    updateCelebration({ puzzlePieces: pieces });
                                }} />
                                <button className="admin-button danger" onClick={() => {
                                    const pieces = activeCelebration.puzzlePieces.filter((_, i) => i !== idx);
                                    updateCelebration({ puzzlePieces: pieces });
                                }}>X</button>
                      </div>
                        ))}
                        <button className="admin-button secondary" onClick={() => {
                            const newPiece = { id: `pz-${Date.now()}`, icon: '🎈', color: '#FDE68A' };
                            updateCelebration({ puzzlePieces: [...activeCelebration.puzzlePieces, newPiece] });
                        }}>+ Parça Ekle</button>
                    </div>
                )}

                {activeCelebration && activeTab === 'timeline' && (
                    <div className="admin-section">
                        <div className="admin-section-title">Zaman Çizelgesi</div>
                        {activeCelebration.timeline
                          .slice()
                          .sort((a, b) => (a.order || 0) - (b.order || 0))
                          .map((item, idx, arr) => (
                            <div key={item.id} className="timeline-item-editor">
                                <input type="text" value={item.label} onChange={(e) => {
                                    const timeline = [...activeCelebration.timeline];
                                    const targetIndex = timeline.findIndex(t => t.id === item.id);
                                    timeline[targetIndex].label = e.target.value;
                                    updateCelebration({ timeline });
                                }} />
                                <div className="timeline-controls">
                                    <button disabled={idx === 0} onClick={() => {
                                        if (idx === 0) return;
                                        const sorted = [...arr];
                                        [sorted[idx - 1], sorted[idx]] = [sorted[idx], sorted[idx - 1]];
                                        const timeline = sorted.map((t, orderIndex) => ({ ...t, order: orderIndex }));
                                        updateCelebration({ timeline });
                                    }}>↑</button>
                                    <button disabled={idx === arr.length - 1} onClick={() => {
                                        if (idx === arr.length - 1) return;
                                        const sorted = [...arr];
                                        [sorted[idx], sorted[idx + 1]] = [sorted[idx + 1], sorted[idx]];
                                        const timeline = sorted.map((t, orderIndex) => ({ ...t, order: orderIndex }));
                                        updateCelebration({ timeline });
                                    }}>↓</button>
                                    <button className="admin-button danger" onClick={() => {
                                        const timeline = activeCelebration.timeline.filter(t => t.id !== item.id);
                                        updateCelebration({ timeline });
                                    }}>Sil</button>
                                </div>
                        </div>
                      ))}
                        <button className="admin-button secondary" onClick={() => {
                            const newItem = { id: `tm-${Date.now()}`, label: 'Yeni Adım', order: activeCelebration.timeline.length };
                            updateCelebration({ timeline: [...activeCelebration.timeline, newItem] });
                        }}>+ Adım Ekle</button>
                    </div>
                )}

                {activeCelebration && activeTab === 'diff' && (
                    <div className="admin-section">
                        <div className="admin-section-title">Farkı Bul</div>
                        {(activeCelebration.oddOneOutGame?.items || []).map((item, idx) => (
                            <div key={item.id} className="quiz-option-editor">
                                <input type="text" value={item.icon} onChange={(e) => {
                                    if (!activeCelebration.oddOneOutGame) return;
                                    const items = [...activeCelebration.oddOneOutGame.items];
                                    items[idx].icon = e.target.value;
                                    updateCelebration({ oddOneOutGame: { items } });
                                }} style={{ width: '80px', textAlign: 'center' }} placeholder="Emoji" />
                                <label className="quiz-correct-toggle">
                                    <input type="radio" checked={!!item.isOdd} onChange={() => {
                                        if (!activeCelebration.oddOneOutGame) return;
                                        const items = activeCelebration.oddOneOutGame.items.map((itm, i) => ({ ...itm, isOdd: i === idx }));
                                        updateCelebration({ oddOneOutGame: { items } });
                                    }} />
                                    Farklı
                        </label>
                                <button className="admin-button danger" onClick={() => {
                                    if (!activeCelebration.oddOneOutGame) return;
                                    const items = activeCelebration.oddOneOutGame.items.filter((_, i) => i !== idx);
                                    updateCelebration({ oddOneOutGame: { items } });
                                }}>X</button>
                      </div>
                        ))}
                        <button className="admin-button secondary" onClick={() => {
                            const newItem = { id: `odd-${Date.now()}`, icon: '🍎', isOdd: false };
                            updateCelebration({ oddOneOutGame: { items: [...(activeCelebration.oddOneOutGame?.items || []), newItem] } });
                        }}>+ Kart Ekle</button>
                      </div>
                )}

                {activeCelebration && activeTab === 'shadow' && (
                    <div className="admin-section">
                        <div className="admin-section-title">Gölge Eşleştirme</div>
                        {(activeCelebration.silhouetteGame || []).map((item, idx) => (
                            <div key={item.id} className="puzzle-piece-editor">
                                <input type="text" value={item.label} onChange={(e) => {
                                    if (!activeCelebration.silhouetteGame) return;
                                    const items = [...activeCelebration.silhouetteGame];
                                    items[idx].label = e.target.value;
                                    updateCelebration({ silhouetteGame: items });
                                }} placeholder="Etiket" />
                                <input type="text" value={item.icon} onChange={(e) => {
                                    if (!activeCelebration.silhouetteGame) return;
                                    const items = [...activeCelebration.silhouetteGame];
                                    items[idx].icon = e.target.value;
                                    updateCelebration({ silhouetteGame: items });
                                }} style={{ width: '80px', textAlign: 'center' }} placeholder="Emoji" />
                                <input type="color" value={item.color || '#ffffff'} onChange={(e) => {
                                    if (!activeCelebration.silhouetteGame) return;
                                    const items = [...activeCelebration.silhouetteGame];
                                    items[idx].color = e.target.value;
                                    updateCelebration({ silhouetteGame: items });
                                }} />
                                <button className="admin-button danger" onClick={() => {
                                    if (!activeCelebration.silhouetteGame) return;
                                    const items = activeCelebration.silhouetteGame.filter((_, i) => i !== idx);
                                    updateCelebration({ silhouetteGame: items });
                                }}>X</button>
                    </div>
                        ))}
                        <button className="admin-button secondary" onClick={() => {
                            const newItem = { id: `sil-${Date.now()}`, label: 'Yeni Gölge', icon: '⭐', color: '#FDE68A' };
                            updateCelebration({ silhouetteGame: [...(activeCelebration.silhouetteGame || []), newItem] });
                        }}>+ Gölge Ekle</button>
                  </div>
                )}

                  </div>

              {hasUnsavedChanges && activeLevel && (
                  <div className="save-bar fade-in">
                    <div className="save-bar-info">{activeLevel.title} düzenleniyor... (Kaydedilmemiş değişiklikler)</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="admin-button secondary" onClick={() => selectLevel(activeLevel)}>Değişiklikleri Geri Al</button>
                        <button className="admin-button primary" onClick={handleSave} disabled={isLoading}>{isLoading ? 'Kaydediliyor...' : 'Kaydet & Yayınla'}</button>
                          </div>
                    </div>
                  )}
          </>
        )}
      </div>

      {showAIModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="modal-content" style={{ background: 'white', padding: '30px', borderRadius: '20px', width: '400px', maxWidth: '90%' }}>
                <h3>✨ Yapay Zeka ile İçerik Üret</h3>
                <p>Konuyu yaz, gerisini bana bırak!</p>
                <div className="admin-field-group">
                    <label>Konu / Tema</label>
                    <input type="text" placeholder="Örn: 23 Nisan, Hayvanlar..." value={aiTopic} onChange={(e) => setAiTopic(e.target.value)} autoFocus />
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button className="admin-button secondary" onClick={() => setShowAIModal(false)}>İptal</button>
                    <button className="admin-button primary" onClick={handleAIGenerate} disabled={isGenerating || !aiTopic}>{isGenerating ? 'Üretiliyor...' : 'Üret'}</button>
                </div>
            </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
            <div className="modal-content" style={{ background: 'white', padding: '40px', borderRadius: '24px', width: '500px', maxWidth: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
                <h2 style={{ margin: '0 0 10px 0', fontSize: '1.8rem', color: '#2D2D2D' }}>✨ Yeni Bölüm Oluştur</h2>
                <p style={{ margin: '0 0 30px 0', color: '#666', fontSize: '0.95rem' }}>Template içerikle başla, sonra düzenle!</p>
                
                <div className="admin-field-group" style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>📝 Bölüm ID <span style={{ color: 'red' }}>*</span></label>
                    <input 
                        type="text" 
                        placeholder="ornek-bolum (küçük harf, tire ile)" 
                        value={newLevelDraft.id} 
                        onChange={(e) => setNewLevelDraft({...newLevelDraft, id: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})} 
                        style={{ padding: '12px', fontSize: '1rem' }}
                        autoFocus
                    />
                    <small style={{ display: 'block', marginTop: '5px', color: '#666' }}>Benzersiz bir ID girin (URL'de görünecek)</small>
                </div>

                <div className="admin-field-group" style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>📌 Başlık <span style={{ color: 'red' }}>*</span></label>
                    <input 
                        type="text" 
                        placeholder="Örn: 23 Nisan Ulusal Egemenlik Bayramı" 
                        value={newLevelDraft.title} 
                        onChange={(e) => setNewLevelDraft({...newLevelDraft, title: e.target.value})} 
                        style={{ padding: '12px', fontSize: '1rem' }}
                    />
                </div>

                <div className="admin-field-group" style={{ marginBottom: '20px' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>📂 Kategori</label>
                    <select 
                        value={newLevelDraft.category} 
                        onChange={(e) => setNewLevelDraft({...newLevelDraft, category: e.target.value})}
                        style={{ padding: '12px', fontSize: '1rem', width: '100%', borderRadius: '10px', border: '1px solid #ddd' }}
                    >
                        <option value="Milli Bayramlar">Milli Bayramlar</option>
                        <option value="Özel Günler">Özel Günler</option>
                        <option value="Kültür">Kültür</option>
                        <option value="Tarih">Tarih</option>
                        <option value="Diğer">Diğer</option>
                    </select>
                </div>

                <div className="admin-field-group" style={{ marginBottom: '30px' }}>
                    <label style={{ fontWeight: 'bold', marginBottom: '8px', display: 'block' }}>🎮 Bölüm Tipi</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                            className={`admin-button ${newLevelDraft.type === 'celebration' ? 'primary' : 'secondary'}`}
                            onClick={() => setNewLevelDraft({...newLevelDraft, type: 'celebration'})}
                            style={{ flex: 1, padding: '15px', fontSize: '1rem' }}
                        >
                            🎉 Kutlama (Oyunlu)
                        </button>
                        <button 
                            className={`admin-button ${newLevelDraft.type === 'standard' ? 'primary' : 'secondary'}`}
                            onClick={() => setNewLevelDraft({...newLevelDraft, type: 'standard'})}
                            style={{ flex: 1, padding: '15px', fontSize: '1rem' }}
                        >
                            📖 Standart (Hikaye)
                        </button>
                    </div>
                    <small style={{ display: 'block', marginTop: '10px', color: '#666', textAlign: 'center' }}>
                        {newLevelDraft.type === 'celebration' 
                            ? '✨ Video + tüm oyunlar ile hazır template' 
                            : '📚 Hikaye + sorular ile hazır template'}
                    </small>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px' }}>
                    <button className="admin-button secondary" onClick={() => setShowCreateModal(false)} style={{ padding: '12px 24px', fontSize: '1rem' }}>
                        ❌ İptal
                    </button>
                    <button 
                        className="admin-button primary" 
                        onClick={handleConfirmCreate} 
                        disabled={isLoading || !newLevelDraft.id || !newLevelDraft.title}
                        style={{ padding: '12px 24px', fontSize: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                    >
                        {isLoading ? '⏳ Oluşturuluyor...' : '✨ Template ile Oluştur'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
