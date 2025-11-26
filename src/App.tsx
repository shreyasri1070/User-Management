import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserDetail from "./components/UserDetail";

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<UserForm mode="create" />} />
          <Route path="/edit/:id" element={<UserForm mode="edit" />} />
          <Route path="/users/:id" element={<UserDetail />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
