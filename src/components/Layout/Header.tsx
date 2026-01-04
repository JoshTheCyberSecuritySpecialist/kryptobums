import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../../assets/kryptobumslogo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/characters', label: 'Characters' },
    { path: '/alley-ascension', label: 'Alley Ascension' },
    { path: '/whitepaper', label: 'Whitepaper' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/waitlist', label: 'Join Waitlist' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[#0B0D10] border-b-2 border-[#00FF9C] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center group">
            <img
              src={logo}
              alt="KryptoBums Logo"
              className="h-14 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-bold uppercase tracking-wider
                  transition-all duration-200
                  relative
                  ${isActive(link.path)
                    ? 'text-[#00FF9C]'
                    : 'text-[#9CA3AF] hover:text-[#00FF9C]'
                  }
                  ${isActive(link.path)
                    ? 'after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-[#00FF9C]'
                    : ''
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden text-[#00FF9C] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  block py-2 px-4 text-sm font-bold uppercase tracking-wider
                  transition-all duration-200 rounded
                  ${isActive(link.path)
                    ? 'text-[#00FF9C] bg-[#14161A]'
                    : 'text-[#9CA3AF] hover:text-[#00FF9C] hover:bg-[#14161A]'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};
