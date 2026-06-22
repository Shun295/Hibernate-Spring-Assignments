import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavbarExecutive = () => {

    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] =
        useState(false);

    const username =
        localStorage.getItem(
            "username"
        );

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <>

            <nav
                className="navbar navbar-expand-lg bg-white shadow-sm px-4"
            >

                <div className="container-fluid">

                    <h4
                        className="mb-0 fw-bold"
                        style={{
                            color: "#0F172A"
                        }}
                    >
                        Maverick Bank
                    </h4>

                    <div
                        className="d-flex align-items-center"
                    >

                        <span
                            className="me-3 fw-semibold text-secondary"
                        >
                            Welcome, {username}
                        </span>

                        <button
                            className="btn btn-success rounded-circle me-3"
                            style={{
                                width: "45px",
                                height: "45px"
                            }}
                            onClick={() =>
                                navigate(
                                    "/executive/profile"
                                )
                            }
                        >

                            {
                                username
                                    ?.charAt(0)
                                    ?.toUpperCase()
                            }

                        </button>

                        <button
                            className="btn btn-outline-danger"
                            onClick={() =>
                                setShowLogoutModal(
                                    true
                                )
                            }
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </nav>

            {

                showLogoutModal && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            backgroundColor:
                                "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content border-0 shadow">

                                <div className="modal-header">

                                    <h5 className="modal-title">

                                        Confirm Logout

                                    </h5>

                                </div>

                                <div className="modal-body">

                                    Are you sure you want to logout?

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowLogoutModal(
                                                false
                                            )
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={
                                            logout
                                        }
                                    >
                                        Logout
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )

            }

        </>

    );

};

export default NavbarExecutive;