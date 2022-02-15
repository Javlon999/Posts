import "./App.css";
import React from "react";
import { Route, Routes, Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Posts from "./container/posts/Posts";
import SelectedPosts from "./container/posts/components/selectedPosts/SelectedPosts";

// maing app component and router for inside post details 

function App() {
  return (
    <div className="App">
      <div className="Content">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/post/:slug" element={<SelectedPosts />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default React.memo(App);
