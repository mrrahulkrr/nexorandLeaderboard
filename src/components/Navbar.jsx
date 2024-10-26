
// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { UserDropdown } from './Userdropdown';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="font-semibold text-xl">
            Nexorand
          </Link>
          {user && (
            <>
              <Link to="/home">
                <Button variant="ghost">Home</Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="ghost">Leaderboard</Button>
              </Link>
            </>
          )}
        </div>
        <div>
          {user ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
