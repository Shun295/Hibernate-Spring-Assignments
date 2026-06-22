import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const api =
        "http://localhost:8080/api/auth/forgot-password";

    const resetPassword = async (e) => {

        e.preventDefault();

        setMessage("");

        if (
            newPassword !== confirmPassword
        ) {

            setMessage(
                "Passwords do not match"
            );

            return;

        }

        try {

            await axios.put(
                api,
                {
                    email,
                    newPassword
                }
            );

            alert(
                "Password Reset Successfully"
            );

            navigate("/login");

        }
        catch (err) {

            console.log(
                err?.response
            );

            setMessage(
                err?.response?.data?.message ||
                "Unable To Reset Password"
            );

        }

    };

    return (

        <div className="container">

            <div
                className="row justify-content-center align-items-center"
                style={{
                    minHeight: "100vh"
                }}
            >

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body p-4">

                            <h2 className="text-center mb-4">
                                Forgot Password
                            </h2>

                            {
                                message &&

                                <div className="alert alert-danger">

                                    {message}

                                </div>

                            }

                            <form
                            autoComplete="off"
                                onSubmit={
                                    resetPassword
                                }
                            >

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(
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
    autoComplete="new-password"
    onChange={(e) =>
        setNewPassword(e.target.value)
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
    autoComplete="new-password"
    onChange={(e) =>
        setConfirmPassword(e.target.value)
    }
    required
/>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-warning w-100"
                                >
                                    Reset Password
                                </button>

                            </form>

                            <div className="text-center mt-3">

                                <span
                                    className="text-primary"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        navigate("/login")
                                    }
                                >
                                    Back To Login
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ForgotPassword;