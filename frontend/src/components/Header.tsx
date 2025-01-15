import { FaSpotify, FaSearch } from "react-icons/fa";

interface HeaderProps {
  loggedIn: boolean,
}

const Header = ({ loggedIn }: HeaderProps) => {
  return (
    <header className="bg-spotifyGreen text-slate-50 h-16 px-4 shadow-sm flex justify-between items-center">
      <div className="flex-1">
        <FaSpotify className="text-4xl" />
      </div>
      {loggedIn && <>
        {/* Will be shown when user is logged in */}
        <div className="flex justify-center items-center gap-2 flex-1">
          <FaSearch />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search for a song, artist, or album..."
            autoComplete="off"
            className="bg-transparent border-b w-96 outline-none placeholder:text-slate-50 placeholder:opacity-75" />
        </div>
        <div className="flex-1"></div>
      </>}
    </header>
  )
}

export default Header;