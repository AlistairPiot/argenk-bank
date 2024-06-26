import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/argentBankLogo.webp";
import { logout } from "../redux/actions/authActions";
import "../sass/components/_Header.scss";

function Header() {
    /* Updates user data on header component from state redux */
    const isConnected = useSelector((state) => state.auth.token);
    const username = useSelector((state) => state.user.userData.username);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout());
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
    };
    return (
        <header>
            <h1 className="title-one">Argent Bank</h1>
            <nav>
                <Link to="/">
                    <img src={Logo} alt="Bank Logo" />
                </Link>
                {isConnected ? (
                    <div className="connected">
                        <Link to="/profile">
                            <i className="fa-solid fa-2x fa-circle-user" />
                            <p>{username}</p>
                        </Link>
                        <Link to="/" onClick={logoutHandler}>
                            <i className="fa-solid fa-arrow-right-from-bracket heho" />
                        </Link>
                    </div>
                ) : (
                    <div>
                        <Link to="/login">
                            <i className="fa-solid fa-circle-user"></i>
                            <p>Sign In</p>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;
