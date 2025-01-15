import { useReducer } from "react";
import { Routes, Route } from "react-router";
import { Header } from "./components";
import { Login, Search } from "./pages";

function App() {
  const [loggedIn, toggleLogin] = useReducer(state => !state, false);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Search toggleLogin={toggleLogin} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App
