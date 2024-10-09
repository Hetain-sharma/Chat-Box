import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatBox from "./ChatBox";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={ChatBox} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
