import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import EditPost from './components/EditPost';
import CreatePost from './components/CreatePost';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create"
          element={<PrivateRoute element={CreatePost} />}
        />
        <Route
          path="/edit/:id"
          element={<PrivateRoute element={EditPost} />}
        />
      </Routes>
    </Router>
  );
}

export default App;