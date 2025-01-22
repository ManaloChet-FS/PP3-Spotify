import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { Cover } from "../components";
import { useNavigate } from "react-router";

interface SearchProps {
  results: Results | null
}

const Search = ({ results }: SearchProps) => {
  const [songs, setSongs] = useState<Item[]>([]);
  const [artists, setArtists] = useState<Item[]>([]);
  const [albums, setAlbums] = useState<Item[]>([]);
  const [resultsReady, setResultsReady] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const jwt = cookies.find(cookie => cookie.startsWith('jwt='));

    if (!jwt) navigate("/login");
  }, []);

  useEffect(() => {
    if (!results) return;

    setSongs(results.tracks.items);
    setArtists(results.artists.items);
    setAlbums(results.albums.items);

    setResultsReady(true);
  }, [results])

  return (
    <section className="h-full">
      {!resultsReady ? (<>
        <div className="flex flex-col justify-center items-center h-full text-slate-50">
          <FaSpotify className="text-spotifyGreen text-4xl" />
          <h2 className="font-bold text-2xl">No Results</h2>
          <p className="text-lg text-center max-w-sm">Please type in a search query to get started...</p>
        </div>
      </>) :
        (<div className="text-slate-50 font-semibold text-4xl flex flex-col justify-evenly h-full max-w-7xl mx-auto py-8 overflow-y-scroll sm:overflow-y-auto">
          <section className="px-8">
            <h3 className="border-b-4 pb-2 mb-4">Songs</h3>
            <div className="flex items-center justify-center sm:justify-start flex-wrap gap-5 px-3">
              {songs && songs.map((song, index) => <Cover key={index} item={song} />)}
            </div>
          </section>
          <section className="px-8">
            <h3 className="border-b-4 pb-2 mb-4">Artists</h3>
            <div className="flex items-center justify-center sm:justify-start flex-wrap gap-5 px-3">
              {artists && artists.map((artist, index) => <Cover key={index} item={artist} />)}
            </div>
          </section>
          <section className="px-8">
            <h3 className="border-b-4 pb-2 mb-4">Albums</h3>
            <div className="flex items-center justify-center sm:justify-start flex-wrap gap-5 px-3">
              {albums && albums.map((album, index) => <Cover key={index} item={album} />)}
            </div>
          </section>
        </div>)}
    </section>
  )
}

export default Search;