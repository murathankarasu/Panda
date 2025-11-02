import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { levelContent } from '../data/levelContent';
import { Question } from '../types';
import { levels } from '../data/levels';
import { updateLevelProgress, unlockNextLevel } from '../utils/progress';
import { incrementLevelCompletedToday } from '../utils/dailyQuests';
import { speakText, stopSpeaking, getTTSVolume, setTTSVolume, isSpeaking } from '../utils/tts';
import './LevelPage.css';
import CelebrationLevel from './levels/CelebrationLevel';

type ScreenState = 'story' | 'question' | 'result';

export default function LevelPage() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const [screenState, setScreenState] = useState<ScreenState>('story');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [ttsVolume, setTtsVolume] = useState(getTTSVolume());
  const [isPlaying, setIsPlaying] = useState(false);

  const level = levels.find(l => l.id === levelId);
  const content = levelContent[levelId || ''];

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const celebrationIds = new Set([
    'milli-29-ekim',
    'milli-23-nisan',
    'milli-19-mayis',
    'milli-30-agustos',
    'dini-ramazan',
    'dini-kurban',
    'kandil-mevlid',
    'kandil-regaip',
    'kandil-mirac',
    'kandil-berat',
    'gunler-kadir',
    'gunler-asure',
  ]);

  if (level && celebrationIds.has(level.id)) {
    return <CelebrationLevel level={level} />;
  }

  // Get image path based on provided hero media or fallback assets
  const getImagePath = (): string => {
    if (content?.heroMedia?.src) {
      return content.heroMedia.src;
    }
    if (!level) return '/assets/order1.webp';
    return `/assets/order${level.order}.webp`;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setTtsVolume(newVolume);
    setTTSVolume(newVolume);
  };

  const handlePlayStory = async () => {
    if (!content?.story) return;
    
    if (isSpeaking()) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      stopSpeaking(); // Stop any ongoing speech
      setIsPlaying(true);
      
      try {
        const audio = await speakText(content.story, ttsVolume);
        if (audio) {
          // Check if speaking is done by polling or using events
          const checkSpeaking = setInterval(() => {
            if (!isSpeaking()) {
              setIsPlaying(false);
              clearInterval(checkSpeaking);
            }
          }, 100);
          
          // Stop checking after 30 seconds (max time for story)
          setTimeout(() => {
            clearInterval(checkSpeaking);
            setIsPlaying(false);
          }, 30000);
        } else {
          setIsPlaying(false);
        }
      } catch (error) {
        console.error('Error speaking text:', error);
        setIsPlaying(false);
      }
    }
  };

  const handleStoryContinue = () => {
    stopSpeaking();
    setIsPlaying(false);
    setScreenState('question');
  };

  if (!level || !content) {
    return (
      <div className="level-page error">
        <h2>Seviye bulunamadı</h2>
        <button onClick={() => navigate('/map')}>Ana Sayfaya Dön</button>
      </div>
    );
  }

  const currentQuestion = content.questions[currentQuestionIndex];
  const totalQuestions = content.questions.length;
  const currentScore = correctCount * 10;

  const getOptionLabel = (question: Question, index: number): string => {
    if (question.options) {
      return question.options[index] ?? '';
    }
    if (question.imageOptions) {
      return question.imageOptions[index]?.label ?? '';
    }
    return '';
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }

    setShowResult(true);
  };

  const handleQuestionNext = () => {
    if (currentQuestionIndex < content.questions.length - 1) {
      // Next question
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Level completed
      const stars = Math.floor((correctCount / content.questions.length) * 3);
      updateLevelProgress(levelId!, stars, true);
      
      // Increment daily quest progress
      incrementLevelCompletedToday();
      
      // Unlock next level
      unlockNextLevel(levels, levelId!);
      window.dispatchEvent(new Event('progress-updated'));
      
      setTimeout(() => {
        navigate('/map');
      }, 2000);
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="question-container">
            <div className="question-text">{currentQuestion.question}</div>
            <div className="options">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    showResult
                      ? index === currentQuestion.correctAnswer
                        ? 'correct'
                        : selectedAnswer === index
                        ? 'incorrect'
                        : ''
                      : ''
                  }`}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'image-choice':
        return (
          <div className="question-container">
            <div className="question-text">{currentQuestion.question}</div>
            <div className="image-options">
              {currentQuestion.imageOptions?.map((option, index) => {
                const isCorrectOption = index === currentQuestion.correctAnswer;
                const isSelected = selectedAnswer === index;

                let statusClass = '';
                if (showResult) {
                  if (isCorrectOption) {
                    statusClass = 'correct';
                  } else if (isSelected) {
                    statusClass = 'incorrect';
                  }
                }

                return (
                  <button
                    key={option.label}
                    className={`image-option-card ${statusClass}`}
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    aria-label={option.alt || option.label}
                  >
                    <div className="image-option-visual">
                      {option.emoji ? (
                        <span className="image-option-emoji" role="img" aria-hidden="true">
                          {option.emoji}
                        </span>
                      ) : option.image ? (
                        <img
                          src={option.image}
                          alt={option.alt || option.label}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.opacity = '0.2';
                          }}
                        />
                      ) : (
                        <span className="image-option-emoji" role="img" aria-hidden="true">
                          ❓
                        </span>
                      )}
                    </div>
                    <span className="image-option-label">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'true-false':
        return (
          <div className="question-container">
            <div className="question-text">{currentQuestion.question}</div>
            <div className="options">
              <button
                className={`option-button ${
                  showResult
                    ? currentQuestion.correctAnswer === 0
                      ? 'correct'
                      : selectedAnswer === 0
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                onClick={() => !showResult && handleAnswer(0)}
                disabled={showResult}
              >
                Doğru
              </button>
              <button
                className={`option-button ${
                  showResult
                    ? currentQuestion.correctAnswer === 1
                      ? 'correct'
                      : selectedAnswer === 1
                      ? 'incorrect'
                      : ''
                    : ''
                }`}
                onClick={() => !showResult && handleAnswer(1)}
                disabled={showResult}
              >
                Yanlış
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Story Screen
  if (screenState === 'story') {
    return (
      <div className="level-page story-screen">
        <div className="story-container">
          {/* Left side - Image */}
          <div className="story-image-container">
            <img 
              src={getImagePath()} 
              alt={content?.heroMedia?.alt || level.title}
              className="story-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                const currentSrc = target.src;
                const heroSrc = content?.heroMedia?.src;

                // If hero görseli yüklenemedi, yerel sıraya dön
                if (heroSrc && currentSrc === heroSrc && level) {
                  target.src = `/assets/order${level.order}.webp`;
                  return;
                }

                // WebP başarısızsa PNG'ye düş
                if (target.src.endsWith('.webp') && level) {
                  target.src = `/assets/order${level.order}.png`;
                  return;
                }

                // Son çare olarak varsayılan görsel
                target.src = '/assets/order1.webp';
              }}
            />
          </div>

          {/* Right side - Story text and controls */}
          <div className="story-content-container">
            <div className="story-header">
              <button className="back-button" onClick={() => navigate('/map')}>
                ← Geri
              </button>
              <h2 className="level-title">{level.title}</h2>
              <p className="level-subtitle">{level.description}</p>
            </div>

            <div className="story-text-container">
              <p className="story-text">{content.story}</p>
            </div>

            <div className="story-controls">
              {/* TTS Controls */}
              <div className="tts-controls">
                <button 
                  className={`play-button ${isPlaying ? 'playing' : ''}`}
                  onClick={handlePlayStory}
                  title={isPlaying ? 'Duraklat' : 'Oku'}
                >
                  {isPlaying ? '⏸' : '▶'}
                </button>
                
                <div className="volume-control">
                  <label>🔊 Ses Seviyesi</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={ttsVolume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                  />
                  <span className="volume-value">{Math.round(ttsVolume * 100)}%</span>
                </div>
              </div>

              <button className="continue-button" onClick={handleStoryContinue}>
                Devam Et →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question Screen
  return (
    <div className="level-page question-screen">
      <div className="question-header">
        <button className="back-button" onClick={() => navigate('/map')}>
          ← Geri
        </button>
        <h2>{level.title}</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentQuestionIndex + 1) / content.questions.length) * 100}%`,
            }}
          />
        </div>
        <div className="question-counter">
          Soru {currentQuestionIndex + 1} / {content.questions.length}
        </div>
      </div>

      <div className="question-scoreboard">
        <div className="score-item">
          <span className="score-icon">⭐</span>
          <span className="score-text">{currentScore} Puan</span>
        </div>
        <div className="score-item">
          <span className="score-icon">🎯</span>
          <span className="score-text">
            {correctCount} / {totalQuestions} Doğru
          </span>
        </div>
      </div>

      {renderQuestion()}

      {showResult && (
        <div className="result-section">
          <div className="result-message">
            {selectedAnswer === currentQuestion.correctAnswer ? (
              <>
                <span className="result-icon">✓</span>
                <p>Harika! Doğru kartı seçtin!</p>
                <p className="reward-text">
                  {currentQuestion.reward || '🎉 +10 Panda Puanı'}
                </p>
              </>
            ) : (
              <>
                <span className="result-icon">✗</span>
                <p>
                  Doğru kart: {getOptionLabel(currentQuestion, currentQuestion.correctAnswer as number)}
                </p>
              </>
            )}
            {currentQuestion.explanation && (
              <p className="explanation">{currentQuestion.explanation}</p>
            )}
          </div>
          <button className="next-button" onClick={handleQuestionNext}>
            {currentQuestionIndex < content.questions.length - 1 ? 'Devam Et →' : 'Bölümü Tamamla'}
          </button>
        </div>
      )}
    </div>
  );
}
