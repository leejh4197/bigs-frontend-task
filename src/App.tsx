import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Board from "./pages/Board";
import WriteBoard from "./pages/WriteBoard";
import BoardDetail from "./pages/BoardDetail";
import EditBoard from "./pages/EditBoard";
import PrivateRoute from "./components/common/PrivateRoute";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route element={<SideBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/board" element={<Board />} />
            <Route path="/writeboard" element={<WriteBoard />} />
            <Route path="/board/:id" element={<BoardDetail />} />
            <Route path="/editboard/:id" element={<EditBoard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
