import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import CreatePost from "./components/CreatePost";
import NavBar from "./components/NavBar";
import Introduction from "./components/Introduction";
import BackToTopButton from "./components/BackToTopButton";

function App() {
  return (
    <div className="min-h-screen w-full min-w-screen overflow-x-hidden bg-gray-100">
      <Router>
        <NavBar />
        <div className="bg-gray-100 px-30 py-10 min-h-screen w-full max-w-screen overflow-x-hidden">
          <div className="rounded-xl min-h-[60vh]">
            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/createPost" element={<CreatePost />} />
            </Routes>
          </div>
        </div>
        <BackToTopButton />
      </Router>
    </div>
  );
}

export default App;
