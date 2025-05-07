import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Search, User } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useAuthUser } from "../store/authUser";
import { useContentStore } from "../store/content";
import ConfirmModal from "./confirmModal";

const NavbarHomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuthUser();
  const navigate = useNavigate();
  const { contentType, setContentType } = useContentStore();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowDropdown(false);
    };

    if (showDropdown) {
      document.addEventListener("pointerdown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDropdown]);

  const handleLogoutClick = () => {
    setShowModal(true);
    setShowDropdown(false);
  };

  const handleConfirmLogout = async () => {
    await logout();
    setShowModal(false);
    navigate("/login");
  };

  return (
    <>
    <header className="backdrop-blur-md relative bg-black/40 text-white shadow-md  top-0 z-50 border-b border-yellow-400/30">
      <nav className="container  mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold text-yellow-400 tracking-widest"
        >
          BeeWatch
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigate('/search')}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full shadow transition hover:scale-105"
          >
            <Search size={20} />
            Search
          </button>

          <Link to="/" onClick={() => setContentType("movie")} className="hover:text-yellow-400 transition">
            Movies
          </Link>
          <Link to="/" onClick={() => setContentType("tv")} className="hover:text-yellow-400 transition">
            TV Shows
          </Link>
          <Link to="/watchlist" className="hover:text-yellow-400 transition">
            Watchlist
          </Link>
          <Link to="/history" className="hover:text-yellow-400 transition">
            Search History
          </Link>
        </div>


        {/* User Profile Dropdown */}
        {user && (
          <div className="hidden md:flex relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Toggle user menu"
              aria-expanded={showDropdown}
              className="flex items-center justify-center w-10 h-10 text-lg font-bold uppercase bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow"
            >
              {user.username.charAt(0)}
            </button>

            {showDropdown && (
          <div className="absolute right-0 mt-2 w-60 bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-semibold">{user.username}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>

            <button
              onClick={() => {
                setShowDropdown(false);
                navigate("/watchlist");
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-yellow-100"
            >
              📺 Watchlist
            </button>

            <button
              onClick={handleLogoutClick}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-yellow-100 flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
            )}
          </div>
        )}


        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            className="text-yellow-400 hover:text-yellow-300 transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/90 px-4 pb-6 pt-2 space-y-4 text-base font-medium transition-all">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/search');
            }}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full shadow w-full"
          >
            <Search size={18} />
            Search
          </button>

          <ul className="space-y-3">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/" onClick={() => {
                setContentType("movie");
                setIsOpen(false);
              }}>Movies</Link>
            </li>
            <li>
              <Link to="/" onClick={() => {
                setContentType("tv");
                setIsOpen(false);
              }}>TV Shows</Link>
            </li>
            <li>
              <Link to="/watchlist" onClick={() => setIsOpen(false)}>Watchlist</Link>
            </li>
            <li>
              <Link to="/history" onClick={() => setIsOpen(false)}>Search History</Link>
            </li>
            {user && (
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowModal(true);
                  }}
                  className="w-full text-left text-yellow-400 font-semibold"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
      {showModal && (
        <ConfirmModal
          title="Confirm Logout"
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
     
  
};

export default NavbarHomeScreen;
