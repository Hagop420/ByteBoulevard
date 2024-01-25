import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../css/NotFoundPage.css';

export function NotFoundPage() {
  return (
    <div className="pageContent">
      <div className="row">
        <div className="col text-center mb-5">
          <h3>Uh oh, we could not find the page you were looking for!</h3>
          <p className="text-muted">
            <Link to="/" className="flex justify-center text-4xl m-4">
              <FaHome />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
