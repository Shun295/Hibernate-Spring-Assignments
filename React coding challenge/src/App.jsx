import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";


import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

function App() {
  return (
   <>
      <nav className="navbar navbar-dark bg-dark p-3">

        <NavLink to="/users" className="text-white text-decoration-none me-4">
          User List
        </NavLink>

        <NavLink to="/add-user" className="text-white text-decoration-none">
          Add User
        </NavLink>
      </nav>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="*" element={<UserList />} />
      </Routes>
      </>

  )
}

export default App