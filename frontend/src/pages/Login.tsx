import { FaSpotify } from "react-icons/fa";
import { AuthButton } from "../components";

const Login = () => {
  return (
    <section className="flex flex-col justify-center items-center h-full text-slate-50">
      <FaSpotify className="text-spotifyGreen text-4xl" />
      <h2 className="font-bold text-2xl">Please Login</h2>
      <p className="text-lg text-center my-4 max-w-sm">In order to search for artists, tracks, or songs you must login to your Spotify account</p>
      <AuthButton isLogin={true} />
    </section>
  )
}

export default Login;