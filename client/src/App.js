import "./App.scss";
import React, { useContext } from "react";
import TopBar from "./components/topBar/TopBar";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AllPosts from "./pages/posts/AllPosts";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import Write from "./pages/write/Write";

function App() {
  const { user } = useContext(Context); // detecting if user
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
        ></Route>
        <Route path="/write" element={user ? <Write /> : <Home />} />
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/posts" element={<AllPosts />}></Route>
        <Route
          path="/settings"
          element={user ? <Settings /> : <Register />}
        ></Route>
        <Route path="/posts/:id" element={<Single />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
