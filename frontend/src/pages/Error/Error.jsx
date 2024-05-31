import { Link } from "react-router-dom";
import ErrorSvg from "../../assets/images/404-error.svg";
import "../../sass/pages/_Error.scss";

function Error() {
    return (
        <div className="error-page">
            <main>
                <section className="error">
                    <h2 className="sr-only">Error 404</h2>
                    <img src={ErrorSvg} alt="error 404" className="errorSvg" />
                    <p className="text-error">
                        Sorry, the page you are looking for does not exist.
                    </p>
                    <p className="text-error">Please return to homepage</p>
                    <Link to="/">
                        <button className="button-404">
                            Back to the homepage
                        </button>
                    </Link>
                </section>
            </main>
        </div>
    );
}

export default Error;
