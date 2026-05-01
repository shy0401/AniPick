import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="empty-state">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
      <Link className="button-primary" to="/">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
