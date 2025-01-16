import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { FaSpotify, FaSearch } from "react-icons/fa";
import { useLocation } from "react-router";
import axios from "axios";

interface HeaderProps {
  setResults: Dispatch<SetStateAction<Results | null>>
}

const Header = ({ setResults }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    axios.get(`/spotify/search?q=${query}`,)
      .then(({ data }) => {
        setResults(data);
      });
  }

  return (
    <header className="bg-spotifyGreen text-slate-50 h-16 px-4 shadow-sm flex justify-between items-center">
      <div className="flex-1">
        <FaSpotify className="text-4xl" />
      </div>
      {isLoggedIn && <>
        {/* Will be shown when user is logged in */}
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-2 flex-1">
          <FaSearch />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for a song, artist, or album..."
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-b w-96 outline-none placeholder:text-slate-50 placeholder:opacity-75" />
        </form>
        <div className="flex-1"></div>
      </>}
    </header>
  )
}

export default Header;