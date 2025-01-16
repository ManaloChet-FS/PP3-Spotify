import { useState } from "react";
import { Routes, Route } from "react-router";
import { Header } from "./components";
import { Login, Search } from "./pages";

function App() {
  const [results, setResults] = useState<Results | null>(null);

  return (
    <>
      <Header setResults={setResults} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Search results={results} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </>
  )
}

export default App
