import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경'}
      title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
      <span className="theme-toggle-text">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
