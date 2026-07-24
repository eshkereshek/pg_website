import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../contexts/AuthContext';
import '../index.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isRobotVerified, setIsRobotVerified] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Заполните никнейм в игре');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Введите корректный E-mail');
      return;
    }
    if (!password) {
      setError('Заполните пароль');
      return;
    }
    if (password !== repeatPassword) {
      setError('Пароли не совпадают!');
      return;
    }
    if (!isRobotVerified) {
      setError('Пожалуйста, подтвердите, что вы не робот');
      return;
    }
    if (!agreeTerms) {
      setError('Необходимо согласиться с условиями соглашения и политикой конфиденциальности');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/auth/register`, { username, email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          <img src="/newicon.png" alt="Pagrysha Launcher" />
          <span>Pagrysha Launcher</span>
        </Link>
        <div className="nav-links">
          <Link to="/download">Скачать</Link>
          <Link to="/login" className="nav-btn">Войти</Link>
        </div>
      </nav>

      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card register-card">
            <h2>Регистрация</h2>
            <p>Создайте аккаунт для экосистемы Pagrysha</p>
            
            {error && <div className="auth-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="auth-form">
              {/* Никнейм */}
              <div className="input-group">
                <label>Никнейм в игре</label>
                <div className="input-with-icon">
                  <div className="input-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Никнейм в игре"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="input-group">
                <label>E-mail</label>
                <div className="input-with-icon">
                  <div className="input-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Ваш E-mail"
                  />
                </div>
              </div>

              {/* Пароль */}
              <div className="input-group">
                <label>Пароль</label>
                <div className="input-with-icon">
                  <div className="input-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v2h2v-2h2v-2h-8.35zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </svg>
                  </div>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Пароль от аккаунта"
                  />
                </div>
              </div>

              {/* Подтверждение пароля */}
              <div className="input-group">
                <label>Повторите пароль</label>
                <div className="input-with-icon">
                  <div className="input-icon-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v2h2v-2h2v-2h-8.35zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                    </svg>
                  </div>
                  <input 
                    type="password" 
                    value={repeatPassword} 
                    onChange={(e) => setRepeatPassword(e.target.value)} 
                    placeholder="Повторите пароль"
                  />
                </div>
              </div>

              {/* Капча "Я не робот" */}
              <div 
                className="captcha-box" 
                onClick={() => setIsRobotVerified(!isRobotVerified)}
              >
                <div className="captcha-left">
                  <div className={`captcha-checkbox ${isRobotVerified ? 'checked' : ''}`}>
                    {isRobotVerified && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                  <span className="captcha-label">Я не робот</span>
                </div>
                <div className="captcha-badge">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
                  </svg>
                  <span>reCAPTCHA</span>
                </div>
              </div>

              {/* Галочка Соглашения */}
              <div 
                className="terms-checkbox-row" 
                onClick={() => setAgreeTerms(!agreeTerms)}
              >
                <div className={`terms-checkbox ${agreeTerms ? 'checked' : ''}`}>
                  {agreeTerms && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </div>
                <span className="terms-checkbox-label">
                  Я согласен с <Link to="/terms" onClick={(e) => e.stopPropagation()}>условиями соглашения</Link> и <Link to="/privacy" onClick={(e) => e.stopPropagation()}>политикой конфиденциальности</Link>
                </span>
              </div>

              <button 
                type="submit" 
                className="register-submit-btn" 
                disabled={loading} 
              >
                {loading ? 'Регистрация...' : 'Зарегистрироваться'}
              </button>
            </form>
            
            <div className="auth-footer">
              Уже есть аккаунт? <Link to="/login">Войти</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
