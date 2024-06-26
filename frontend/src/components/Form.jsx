import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailed, loginSuccess } from "../redux/actions/authActions.js";
import "../sass/components/_Form.scss";

function Form() {
    /* Allows you to retrieve the data entered by the user in the form */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const localStorageToken = localStorage.getItem("token");
        if (localStorageToken) {
            dispatch(loginSuccess(localStorageToken));
            navigate("/profile");
        } else {
            sessionStorage.removeItem("token");
        }
    }, [dispatch, navigate]);

    /* Asynchronous form function */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:3001/api/v1/user/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );
            if (response.ok) {
                const data = await response.json();
                const token = data.body.token;
                dispatch(loginSuccess(token));
                sessionStorage.setItem("token", token);
                if (rememberMe) {
                    localStorage.setItem("token", token);
                }
                navigate("/profile");
            } else {
                alert("Incorrect email/password");
                const error = "Incorrect email/password";
                dispatch(loginFailed(error));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="sign-in-content">
            <i className="fa-solid fa-circle-user"></i>
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="input-remember">
                    <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(event) =>
                            setRememberMe(event.target.checked)
                        }
                    />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className="sign-in-button">Sign In</button>
            </form>
        </section>
    );
}

export default Form;
