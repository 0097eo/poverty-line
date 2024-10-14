import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/Home";

const App = () => {
  return (
    <>
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
    </>
    
  )
}

export default App