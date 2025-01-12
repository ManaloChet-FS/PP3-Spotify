import { useReducer } from "react";
import { Routes, Route } from "react-router";
import { Header } from "./components";
import { Login, Search } from "./pages";

function App() {
  const [loggedIn, toggleLogin] = useReducer(state => !state, false);

  return (
    <>
      <Header loggedIn={loggedIn} toggleLogin={toggleLogin} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Search loggedIn={loggedIn} />} />
          <Route path="/login" element={<Login toggleLogin={toggleLogin} />} />
        </Routes>
      </main>
    </>
  )
}

export default App
