import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Context, server } from "./main.jsx";
import { useContext, useEffect } from "react";


function App() {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context)

  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/users/me`, {
      withCredentials: true
    }).then((res) => {
      setUser(res.data.user)
      setIsAuthenticated(true)
      setLoading(false)
    }).catch((error) => {
      setUser({})
      setIsAuthenticated(false)
      setLoading(false)
    })
  }, [])



  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App
