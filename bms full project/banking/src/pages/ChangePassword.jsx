import NavbarCustomer from "../components/Navbar-Customer";
import NavbarExecutive from "../components/Navbar-Executive";

import CustomerSidebar from "../components/customer/Sidebar";
import ExecutiveSidebar from "../components/executive/Sidebar";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {

    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const [showSuccessModal, setShowSuccessModal] =
        useState(false);

    const [showErrorModal, setShowErrorModal] =
        useState(false);

    const api =
        "http://localhost:8080/api/auth/change-password";

    const changePassword =
        async (e) => {

            e.preventDefault();

            setMessage("");

            if (newPassword !== confirmPassword) {

                setMessage(
                    "Passwords do not match"
                );

                setShowErrorModal(true);

                return;

            }

            try {

                const config_details = {

                    headers: {

                        Authorization:
                            "Bearer " +
                            localStorage.getItem(
                                "token"
                            )

                    }

                };

                await axios.put(

                    api,

                    {
                        oldPassword,

                        newPassword

                    },

                    config_details

                );

                setMessage(
                    "Password Changed Successfully. Please Login Again."
                );

                setShowSuccessModal(true);
            }
            catch (err) {

                console.erroe(err)

                setMessage(

                    err?.response?.data?.message ||

                    "Unable To Change Password"

                );

                setShowErrorModal(true);

            }

        };

    return (

        <div>
            {
                role === "EXECUTIVE"
                    ? <NavbarExecutive />
                    : <NavbarCustomer />
            }

            <div className="d-flex">

                {
                    role === "EXECUTIVE"
                        ? <ExecutiveSidebar />
                        : <CustomerSidebar />
                }

                <div className="container-fluid p-4">

                    <h1>
                        Change Password
                    </h1>

                    <div
                        className="card mt-4"
                        style={{
                            maxWidth: "600px"
                        }}
                    >

                        <div className="card-body">

                            <form
                                onSubmit={
                                    changePassword
                                }
                            >

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        Current Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={oldPassword}
                                        onChange={(e) =>
                                            setOldPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        Confirm Password
                                    </label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>



                                <button
                                    className="btn btn-warning"
                                >
                                    Change Password
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
            {
                showSuccessModal && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            backgroundColor:
                                "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header bg-success text-white">

                                    <h5 className="modal-title">
                                        Success
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        {message}
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-success"
                                        onClick={() => {

                                            setShowSuccessModal(false);

                                            localStorage.clear();

                                            navigate("/login");

                                        }}
                                    >
                                        OK
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

            {
                showErrorModal && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            backgroundColor:
                                "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog modal-dialog-centered">

                            <div className="modal-content">

                                <div className="modal-header bg-danger text-white">

                                    <h5 className="modal-title">
                                        Error
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        {message}
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            setShowErrorModal(false)
                                        }
                                    >
                                        OK
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

export default ChangePassword;