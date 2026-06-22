import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/customer-common.css";
const NavbarCustomer = () => {

    const navigate = useNavigate();
const [showLogoutModal, setShowLogoutModal] = useState(false);
    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    const username =
        localStorage.getItem(
            "username"
        );

    return (

        <div>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">

                <div className="container-fluid">
 <div className="d-flex align-items-center">

                <h4
                    className="mb-0 fw-bold"
                    style={{
                        color:"#0F172A"
                    }}
                >
                    Maverick Bank
                </h4>

            </div>

                    <div className="collapse navbar-collapse">

                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">

                               

                            </li>

                        </ul>

                        <div className="d-flex align-items-center">

                            <p className="me-3 fw-bold">

                                Welcome {username}

                            </p>

                            <button
                                className="btn btn-primary rounded-circle me-3"
                                style={{
                                    width: "45px",
                                    height: "45px"
                                }}
                                onClick={() =>
                                    navigate(
                                        "/customer/profile"
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
    onClick={() => setShowLogoutModal(true)}
>
    Logout
</button>
                        </div>

                    </div>

                </div>

            </nav>
            {
    showLogoutModal && (

        <div
            className="modal d-block"
            tabIndex="-1"
            style={{
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Confirm Logout
                        </h5>

                    </div>

                    <div className="modal-body">

                        <p>
                            Are you sure you want to logout?
                        </p>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={() =>
                                setShowLogoutModal(false)
                            }
                        >
                            No
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Yes, Logout
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )
}

        </div>

    );

};

export default NavbarCustomer;