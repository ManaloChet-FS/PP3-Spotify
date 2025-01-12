import { useEffect } from "react";
import { FaSpotify } from "react-icons/fa";
import { useNavigate } from "react-router";
import { Cover } from "../components";

interface searchProps {
  loggedIn: boolean
}

const Search = ({ loggedIn }: searchProps) => {
  // const [results, setResults] = useState<object | null>(null);
  const results = null;

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn])

  return (
    <section className="h-full">
      {!results ? (<>
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
              <Cover />
              <Cover />
              <Cover />
              <Cover />
              <Cover />
              <Cover />
            </div>
          </section>
          <section>
            <h3 className="border-b-4 pb-2 mb-4">Artists</h3>
            <div className="flex items-center justify-start gap-5 px-4">
              <Cover />
              <Cover />
              <Cover />
              <Cover />
              <Cover />
              <Cover />
            </div>
          </section>
          <section>
            <h3 className="border-b-4 pb-2 mb-4">Albums</h3>
            <div className="flex items-center justify-start gap-5 px-4">
              <Cover />
              <Cover />
              <Cover />
              <Cover />
              <Cover />
              <Cover />
            </div>
          </section>
        </div>)}
    </section>
  )
}

export default Search;