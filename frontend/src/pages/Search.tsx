import { DispatchWithoutAction, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
// import { useNavigate } from "react-router";
// import { Cover } from "../components";
// import axios from "axios";

interface searchProps {
  toggleLogin: DispatchWithoutAction
}

const Search = ({ toggleLogin }: searchProps) => {
  // const [songs, setSongs] = useState<Song[]>([]);
  // const [artists, setArtists] = useState<Artist[]>([]);
  // const [albums, setAlbums] = useState<Album[]>([]);
  // const [resultsReady, setResultsReady] = useState<boolean>(false);

  // const navigate = useNavigate();

  useEffect(() => {
    toggleLogin();
  }, [])

  return (
    <section className="h-full">
      <>
        <div className="flex flex-col justify-center items-center h-full text-slate-50">
          <FaSpotify className="text-spotifyGreen text-4xl" />
          <h2 className="font-bold text-2xl">No Results</h2>
          <p className="text-lg text-center max-w-sm">Please type in a search query to get started...</p>
        </div>
      </>
    </section>
  )
}

export default Search;