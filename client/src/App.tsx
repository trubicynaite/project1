import { Route, Routes } from "react-router";

import Layout from "./components/outlets/Layout";
import Home from "./components/pages/Home";
import Books from "./components/pages/Books";
import SpecificBookPage from "./components/pages/SpecificBookPage";
import EditBook from "./components/pages/EditBook";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import UserPage from "./components/pages/UserPage";
import UploadBook from "./components/pages/UploadBook";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="books/:id" element={<SpecificBookPage />} />
          <Route path="edit/:id" element={<EditBook />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="user" element={<UserPage />} />
          <Route path="uploadBook" element={<UploadBook />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;
