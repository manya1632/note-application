import React from 'react'
import Home from './pages/HomePage/Home'
import Signin from './pages/SigninPage/Signin'
import Signup from './pages/SignupPage/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element={<Home></Home>}></Route>
      <Route path="/signup" exact element={<Signup/>}></Route>
      <Route path="/signin" exact element={<Signin/>}></Route>
    </Routes>
  </Router>
)

const App = () => {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
