import { Link } from "react-router-dom";

const Navbar = () => {

    return (

        <nav className="navbar navbar-expand-lg bg-white shadow-sm">

            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand fw-bold"
                    style={{
                        color: "#0F172A",
                        fontSize: "1.5rem"
                    }}
                >
                    Maverick Bank
                </Link>

                <div className="collapse navbar-collapse">

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">

                            <Link
                                to="/"
                                className="nav-link fw-semibold"
                            >
                                Home
                            </Link>

                        </li>

                    </ul>

                    <Link
                        to="/login"
                        className="btn btn-primary px-4"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;