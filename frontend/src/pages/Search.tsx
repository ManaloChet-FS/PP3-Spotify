import { DispatchWithoutAction, useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import { useNavigate } from "react-router";
// import { Cover } from "../components";
import axios from "axios";

interface searchProps {
  toggleLogin: DispatchWithoutAction
}

const Search = ({ toggleLogin }: searchProps) => {
  // const [songs, setSongs] = useState<Song[]>([]);
  // const [artists, setArtists] = useState<Artist[]>([]);
  // const [albums, setAlbums] = useState<Album[]>([]);
  // const [resultsReady, setResultsReady] = useState<boolean>(false);
  const resultsReady = false;

  const navigate = useNavigate();

  useEffect(() => {
    toggleLogin();

    axios.get("/spotify/search")
      .catch(() => {
        navigate("/login");
      });
  }, [])

  return (
    <section className="h-full">
      {!resultsReady ? (<>
        <div className="flex flex-col justify-center items-center h-full text-slate-50">
          <FaSpotify className="text-spotifyGreen text-4xl" />
          <h2 className="font-bold text-2xl">No Results</h2>
          <p className="text-lg text-center max-w-sm">Please type in a search query to get started...</p>
        </div>
      </>) :
        (<div className="text-slate-50 font-semibold text-4xl flex flex-col justify-evenly h-full max-w-7xl mx-auto">
          <section>
            <h3 className="border-b-4 pb-2 mb-4">Songs</h3>
            <div className="flex items-center justify-start gap-5 px-4">
              {/* {songs.map((song, index) => <Cover key={index} name={song.name} />)} */}
            </div>
          </section>
          <section>
            <h3 className="border-b-4 pb-2 mb-4">Artists</h3>
            <div className="flex items-center justify-start gap-5 px-4">
              {/* {artists.map((artist, index) => <Cover key={index} name={artist.name} />)} */}
            </div>
          </section>
          <section>
            <h3 className="border-b-4 pb-2 mb-4">Albums</h3>
            <div className="flex items-center justify-start gap-5 px-4">
              {/* {albums.map((album, index) => <Cover key={index} name={album.name} />)} */}
            </div>
          </section>
        </div>)}
    </section>
  )
}

export default Search;