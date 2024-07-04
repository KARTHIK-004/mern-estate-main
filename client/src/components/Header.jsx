import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="w-16">
              <img src="images/HostelNow.png" alt="" />
            </span>
            <span className="text-slate-500">Hostel</span>
            <span className="text-slate-700">Now</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/search">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Properties
            </li>
          </Link>
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex text-sm bg-slate-800 rounded-full focus:ring-4 focus:ring-slate-300"
                id="user-menu-button"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={currentUser.avatar}
                  alt="user photo"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-lg divide-y divide-slate-100">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-slate-900">
                      @{currentUser.username}
                    </span>
                    <span className="block text-sm text-slate-500 truncate">
                      {currentUser.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <Link to="/profile">
                      <li className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        Dashboard
                      </li>
                    </Link>
                    <Link to="/show-listing">
                      <li className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">
                        Show Listing
                      </li>
                    </Link>
                    <span
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-sm text-red-700 cursor-pointer"
                    >
                      Sign out
                    </span>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/sign-in">
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
