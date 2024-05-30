import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import Error from "./pages/Error/Error.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import "./sass/main.scss";

export default function App() {
    const isConnected = useSelector((state) => state.auth.isConnected);

    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route
                    path="profile"
                    element={
                        isConnected ? <Profile /> : <Navigate to="/login" />
                    }
                />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
}
