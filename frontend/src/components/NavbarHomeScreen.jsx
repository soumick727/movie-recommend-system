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
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuthUser();
  const navigate = useNavigate();
  const { contentType, setContentType } = useContentStore();

  //console.log("user in navbar :", user);
    console.log("content type in navbar :", contentType);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
      }
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="text-3xl font-extrabold text-yellow-400 tracking-widest"
        >
          BeeWatch
        </Link>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-zinc-900 border border-zinc-700 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-yellow-400"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies or shows..."
            className="bg-transparent text-sm text-white placeholder-gray-400 outline-none w-64 md:w-80"
          />
          <button
            type="submit"
            className="text-yellow-400 hover:text-yellow-500 ml-2"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-6 items-center text-base font-semibold ml-6">
          <li>
            <Link to="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 transition"
              onClick={() => setContentType("movie")}
            >
              Movies
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 transition"
              onClick={() => setContentType("tv")}
            >
              TV Shows
            </Link>
          </li>
          <li>
            <Link to="/watchlist" className="hover:text-yellow-400 transition">
              Watchlist
            </Link>
          </li>
          <li>
            <Link to="/history" className="hover:text-yellow-400 transition">
              Search History
            </Link>
          </li>
        </ul>

        {/* User Dropdown */}
        {user && (
          <div className="hidden md:flex relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="Toggle user menu"
              aria-expanded={showDropdown}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold shadow-sm"
            >
              <User size={18} />
              {user.username}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg z-10 transition duration-200">
                <button
                  onClick={handleLogoutClick}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-black hover:bg-yellow-100 rounded-b"
                >
                  <LogOut size={16} className="inline mr-2 mb-0.5" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
            className="text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-black px-4 pb-6 space-y-4 text-base font-medium">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-zinc-900 border border-zinc-700 rounded-full px-4 py-2"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent text-white outline-none placeholder-gray-400 flex-1 text-sm"
            />
            <button
              type="submit"
              className="text-yellow-400 hover:text-yellow-500"
            >
              <Search size={18} />
            </button>
          </form>

          <ul className="space-y-3">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  setContentType("movie");
                  setIsOpen(false);
                }}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  setContentType("tv");
                  setIsOpen(false);
                }}
              >
                TV Shows
              </Link>
            </li>
            <li>
              <Link to="/watchlist" onClick={() => setIsOpen(false)}>
                Watchlist
              </Link>
            </li>
            <li>
              <Link to="/history" onClick={() => setIsOpen(false)}>
                Search History
              </Link>
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

      {/* Confirm Logout Modal */}
      {showModal && (
        <ConfirmModal
          title="Confirm Logout"
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowModal(false)}
        />
      )}
    </header>
  );
};

export default NavbarHomeScreen;
