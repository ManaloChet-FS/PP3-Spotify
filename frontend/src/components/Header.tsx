import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { FaSpotify, FaSearch } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

interface HeaderProps {
  setResults: Dispatch<SetStateAction<Results | null>>
}

const Header = ({ setResults }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!errorMessage) return;

    setTimeout(() => {
      setErrorMessage("")
    }, 5000);

  }, [errorMessage])

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    if (query.trim() === "") return;

    axios.get(`/spotify/search?q=${query.trim()}`,)
      .then(({ data }) => {
        setResults(data);
      })
      .catch((err) => {
        console.log(err);
        const errMsg = err.response.data.msg || "Unknown error!";
        switch(err.status) {
          case 400:
            setErrorMessage(errMsg);
            break;
          case 401:
            setErrorMessage(errMsg);
            navigate("/login");
            break;
          default:
            setErrorMessage(errMsg);
        }
      });

    setQuery("");
  }

  return (
    <header className="relative bg-spotifyGreen text-slate-50 h-16 px-4 shadow-sm flex justify-between items-center">
      <div className="flex-1">
        <FaSpotify className="text-4xl" />
      </div>
      {isLoggedIn && <>
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-2 flex-1">
          <FaSearch />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for a song, artist, or album..."
            autoComplete="off"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-b w-96 outline-none placeholder:text-slate-50 placeholder:opacity-75" />
        </form>
        <div className="sm:flex-1"></div>
      </>}
      {errorMessage && <div className={`absolute flex items-center gap-1 bg-red-600 text-slate-50 -bottom-12 left-1/2 -translate-x-1/2 py-2 px-4 rounded-md font-semibold`}><MdErrorOutline />{errorMessage}</div>}
    </header>
  )
}

export default Header;