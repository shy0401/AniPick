import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import ThemeToggle from './ThemeToggle';

const langOptions = [
  { value: 'ko', label: '한국어', short: 'KO' },
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'ja', label: '日本語', short: 'JA' },
];

function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const selected = langOptions.find((item) => item.value === lang) || langOptions[0];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="logo">
          AniPick
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/">{t('home')}</NavLink>
          <NavLink to="/browse">{t('browse')}</NavLink>
          {user && <NavLink to="/mypage">{t('myPage')}</NavLink>}
          {isAdmin && <NavLink to="/admin">{t('admin')}</NavLink>}
        </nav>

        <div className="auth-actions">
          <ThemeToggle />
          <div className="lang-menu-wrap">
            <button
              type="button"
              className="button-outline lang-trigger"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Language"
            >
              <span aria-hidden="true">🌐</span>
              <span>{selected.short}</span>
            </button>
            {open && (
              <div className="lang-dropdown" role="menu">
                {langOptions.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={`lang-option ${lang === option.value ? 'active' : ''}`}
                    onClick={() => {
                      setLang(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {user ? (
            <>
              <span className="nickname">{user.nickname}</span>
              <button type="button" className="button-outline" onClick={handleLogout}>
                {t('logout')}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="button-outline">
                {t('login')}
              </NavLink>
              <NavLink to="/register" className="button-primary nav-register">
                {t('register')}
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
