import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/welcome");
    };

    return (
        <div className="text-center fade-in-section">
            <h2 className="mb-4">🚪 Login to WheelGo</h2>
            <button className="btn btn-primary px-5 py-2 fw-bold" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
};

export default LoginPage;
