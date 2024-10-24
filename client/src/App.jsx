import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RecordsPage from "./pages/Records";
import ProfileList from "./pages/Profiles";
import VerifyEmail from "./pages/Verify";

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
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/profiles" element={<ProfileList />} />
        <Route path="/verify" element={<VerifyEmail />} />
      </Routes>
    </Router>
    </>
    
  )
}

export default App