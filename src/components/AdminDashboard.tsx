import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { levels } from '../data/levels';
import { firebaseService } from '../services/firebaseService';
import {
  getCelebrationConfigMap,
  updateCelebrationOverride,
} from '../data/celebrationConfigs';
import type {
  CelebrationConfig,
} from '../types/celebration';
import './AdminDashboard.css';

// Helpers
const parseList = (raw: string): string[] => raw.split('\n').map(s => s.trim()).filter(Boolean);
const parseLetterPool = (raw: string): string[] => raw.split(/[\s,]+/).map(s => s.trim().toUpperCase()).filter(Boolean);

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data State
  const [refreshKey, setRefreshKey] = useState(0);
  const [isSeeding, setIsSeeding] = useState(false);
  const [activeLevelId, setActiveLevelId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Computed Data
  const configMap = useMemo(() => getCelebrationConfigMap(), [refreshKey]);
  const celebrationIds = useMemo(() => Object.keys(configMap), [configMap]);
  
  // Only show levels that have config
  const activeLevels = useMemo(
    () => levels.filter(level => celebrationIds.includes(level.id)),
    [celebrationIds]
  );

  // Drafts State
  const initialDrafts = useMemo(() => {
    const drafts: Record<string, CelebrationConfig> = {};
    celebrationIds.forEach(id => {
      drafts[id] = JSON.parse(JSON.stringify(configMap[id]));
    });
    return drafts;
  }, [celebrationIds, configMap]);

  const [drafts, setDrafts] = useState<Record<string, CelebrationConfig>>(initialDrafts);

  // Load Remote Data
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadRemoteConfigs = async () => {
      const newDrafts = { ...initialDrafts };
      let hasUpdates = false;

      for (const id of celebrationIds) {
        try {
          const remoteConfig = await firebaseService.getCelebrationConfig(id);
          if (remoteConfig) {
            // Merge logic: remote takes precedence, but keep local defaults for new fields if missing in remote
            const localDefault = configMap[id];
            newDrafts[id] = {
                ...localDefault,
                ...remoteConfig,
                // Ensure nested objects exist if remote is partial (legacy data)
                oddOneOutGame: remoteConfig.oddOneOutGame || localDefault.oddOneOutGame,
                sortingGame: remoteConfig.sortingGame || localDefault.sortingGame,
                silhouetteGame: remoteConfig.silhouetteGame || localDefault.silhouetteGame,
            };
            hasUpdates = true;
          }
        } catch (e) {
          console.error(`Failed to load config for ${id}`, e);
        }
      }

      if (hasUpdates) {
        setDrafts(newDrafts);
      }
    };

    loadRemoteConfigs();
  }, [isAuthenticated, celebrationIds, initialDrafts, configMap]);

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const envUser = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
    const envPass = import.meta.env.VITE_ADMIN_PASSWORD || '1234';

    if (username === envUser && password === envPass) {
      setIsAuthenticated(true);
      setLoginError('');
      if (activeLevels.length > 0) {
        setActiveLevelId(activeLevels[0].id);
      }
    } else {
      setLoginError('Kullanıcı adı veya şifre hatalı.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Draft Updates
  const updateDraft = (levelId: string, updater: (draft: CelebrationConfig) => void) => {
    setDrafts(prev => {
      const current = prev[levelId];
      if (!current) return prev;
      const clone = JSON.parse(JSON.stringify(current));
      updater(clone);
      return { ...prev, [levelId]: clone };
    });
  };

  // Actions
  const handleSeed = async () => {
    if (!window.confirm('Mevcut veritabanı üzerine yazılacak. Onaylıyor musunuz?')) return;
    setIsSeeding(true);
    try {
      await firebaseService.seedData();
      setMessage({ type: 'success', text: 'Veriler başarıyla yüklendi!' });
      setRefreshKey(p => p + 1);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Veri yükleme hatası!' });
    } finally {
      setIsSeeding(false);
    }
  };

  const saveLevel = async (levelId: string) => {
    const draft = drafts[levelId];
    if (!draft) return;
    try {
      await firebaseService.saveCelebrationConfig(levelId, draft);
      updateCelebrationOverride(levelId, draft);
      setMessage({ type: 'success', text: 'Değişiklikler kaydedildi.' });
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Kaydetme başarısız.' });
    }
  };

  // Render Helper: Active Level Draft
  const activeDraft = activeLevelId ? drafts[activeLevelId] : null;

  // --- Render ---

  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="login-card">
          <h1>Yönetici Girişi</h1>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              className="login-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Şifre"
              className="login-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">Giriş Yap</button>
            {loginError && <div className="login-error">{loginError}</div>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">Özel Öğren<br/>Admin</div>
        
        <nav className="sidebar-nav">
          {activeLevels.map(level => (
            <button
              key={level.id}
              className={`nav-item ${activeLevelId === level.id ? 'active' : ''}`}
              onClick={() => setActiveLevelId(level.id)}
            >
              {level.title}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleSeed} disabled={isSeeding} className="seed-button admin-button">
            {isSeeding ? 'Yükleniyor...' : '🔄 Verileri Sıfırla'}
          </button>
          <button onClick={() => navigate('/map')} className="back-button">
            ← Haritaya Dön
          </button>
          <button onClick={handleLogout} className="logout-button">
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="admin-content">
        {message && (
          <div className={`flash-message ${message.type}`}>
            {message.text}
            <button onClick={() => setMessage(null)} style={{marginLeft:10, background:'none', border:'none', color:'white', cursor:'pointer'}}>✕</button>
          </div>
        )}

        {activeLevelId && activeDraft ? (
          <div className="admin-level-editor">
            <div className="admin-header">
              <h2>{activeLevels.find(l => l.id === activeLevelId)?.title}</h2>
              <span className="admin-badge">{activeLevelId}</span>
            </div>

            {/* Video & Intro */}
            <div className="admin-level-card">
              <div className="admin-section-title">Genel Bilgiler</div>
              <div className="admin-split">
                <div className="admin-field-group">
                  <label>Video ID</label>
                  <input
                    type="text"
                    value={activeDraft.videoId}
                    onChange={e => updateDraft(activeLevelId, d => { d.videoId = e.target.value; })}
                  />
                </div>
                <div className="admin-video-preview">
                    <iframe
                      src={`https://www.youtube.com/embed/${activeDraft.videoId}`}
                      style={{width: '100%', height: '150px', borderRadius: '15px', border: 'none'}}
                    />
                </div>
              </div>
              <div className="admin-field-group">
                <label>Giriş Metni</label>
                <textarea
                  rows={3}
                  value={activeDraft.intro}
                  onChange={e => updateDraft(activeLevelId, d => { d.intro = e.target.value; })}
                />
              </div>
              <div className="admin-field-group">
                <label>Hazırlık İpuçları (Her satıra bir tane)</label>
                <textarea
                  rows={4}
                  value={activeDraft.prepHints.join('\n')}
                  onChange={e => updateDraft(activeLevelId, d => { d.prepHints = parseList(e.target.value); })}
                />
              </div>
            </div>

            {/* Games Editors */}
            <div className="admin-level-card">
              <div className="admin-section-title">Kelime Oyunu</div>
              <div className="admin-split">
                <div className="admin-field-group">
                  <label>Soru</label>
                  <input
                    type="text"
                    value={activeDraft.wordGame.prompt}
                    onChange={e => updateDraft(activeLevelId, d => { d.wordGame.prompt = e.target.value; })}
                  />
                </div>
                <div className="admin-field-group">
                  <label>Cevap</label>
                  <input
                    type="text"
                    value={activeDraft.wordGame.answer}
                    onChange={e => updateDraft(activeLevelId, d => { d.wordGame.answer = e.target.value.toUpperCase(); })}
                  />
                </div>
              </div>
              <div className="admin-field-group">
                <label>Harf Havuzu (Otomatik oluşur, elle düzenlenebilir)</label>
                <input
                  type="text"
                  value={activeDraft.wordGame.letterPool.join(' ')}
                  onChange={e => updateDraft(activeLevelId, d => { d.wordGame.letterPool = parseLetterPool(e.target.value); })}
                />
              </div>
            </div>

            {/* Advanced Games JSON Fallback */}
            <div className="admin-level-card">
              <div className="admin-section-title">Gelişmiş Oyun Ayarları (JSON)</div>
              <p style={{fontSize:'0.9rem', color:'#666', marginBottom:'10px'}}>
                Farkı Bul, Gölge Eşleştirme ve Kategorileştirme oyunları için detaylı ayarları buradan yapabilirsiniz.
              </p>
              
              <div className="admin-field-group">
                <label>Farkı Bul (Odd One Out)</label>
                <textarea
                  rows={6}
                  style={{fontFamily: 'monospace', fontSize: '0.85rem'}}
                  value={JSON.stringify(activeDraft.oddOneOutGame, null, 2)}
                  onChange={e => updateDraft(activeLevelId, d => {
                    try {
                      d.oddOneOutGame = JSON.parse(e.target.value);
                    } catch {}
                  })}
                />
              </div>

              <div className="admin-field-group">
                <label>Gölge Eşleştirme</label>
                <textarea
                  rows={6}
                  style={{fontFamily: 'monospace', fontSize: '0.85rem'}}
                  value={JSON.stringify(activeDraft.silhouetteGame, null, 2)}
                  onChange={e => updateDraft(activeLevelId, d => {
                    try {
                      d.silhouetteGame = JSON.parse(e.target.value);
                    } catch {}
                  })}
                />
              </div>

              <div className="admin-field-group">
                <label>Kategorileştirme</label>
                <textarea
                  rows={6}
                  style={{fontFamily: 'monospace', fontSize: '0.85rem'}}
                  value={JSON.stringify(activeDraft.sortingGame, null, 2)}
                  onChange={e => updateDraft(activeLevelId, d => {
                    try {
                      d.sortingGame = JSON.parse(e.target.value);
                    } catch {}
                  })}
                />
              </div>
            </div>

            {/* Sticky Save Bar */}
            <div className="save-bar">
              <div className="save-bar-info">
                {activeLevels.find(l => l.id === activeLevelId)?.title || activeLevelId} düzenleniyor
              </div>
              <div style={{display:'flex', gap:'10px'}}>
                <button 
                  className="admin-button secondary" 
                  onClick={() => updateDraft(activeLevelId, d => {
                    // Reset to default (re-clone initial map)
                    const original = configMap[activeLevelId];
                    if(original) Object.assign(d, JSON.parse(JSON.stringify(original)));
                  })}
                >
                  Değişiklikleri Geri Al
                </button>
                <button 
                  className="admin-button primary" 
                  onClick={() => saveLevel(activeLevelId)}
                >
                  Kaydet ve Yayınla
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="admin-placeholder">
            <h2>Soldan bir seviye seçin</h2>
          </div>
        )}
      </main>
    </div>
  );
}
