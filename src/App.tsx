import { Routes, Route } from "react-router-dom"
import { Error, Home, SearchResult } from "./pages"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search-results" element={<SearchResult />} />
      <Route
        path="*"
        element={<Error message="The page could not be found" path="/" />}
      />
    </Routes>
  )
}

export default App
