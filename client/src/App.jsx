import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/Profile";

const App = () => {
  return (
    <>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
    </>
    
  )
}

export default App