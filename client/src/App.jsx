import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";

const App = () => {
  return (
    <>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
    </>
    
  )
}

export default App