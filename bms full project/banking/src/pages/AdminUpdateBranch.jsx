import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

const AdminUpdateBranch = () => {

    const { branchId } = useParams();

    const navigate = useNavigate();

    const [branchName, setBranchName] = useState("");

    const [address, setAddress] = useState("");

    const [email, setEmail] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        const getBranch =
            async () => {

                try {

                    const config = {

                        headers: {

                            Authorization:
                                "Bearer " +
                                localStorage.getItem(
                                    "token"
                                )

                        }

                    };

                    const response =
                        await axios.get(

                            `http://localhost:8080/api/branch/${branchId}`,

                            config

                        );

                    setBranchName(
                        response.data.branchName
                    );

                    setAddress(
                        response.data.address
                    );

                    setEmail(
                        response.data.email
                    );

                    setPhoneNumber(
                        response.data.phoneNumber
                    );

                }
                catch (err) {

                    console.error(err)

                }

            };

        getBranch();

    }, []);

    const updateBranch =
        async (e) => {

            e.preventDefault();

            try {

                const config = {

                    headers: {

                        Authorization:
                            "Bearer " +
                            localStorage.getItem(
                                "token"
                            )

                    }

                };

                await axios.put(

                    `http://localhost:8080/api/branch/admin/update/${branchId}`,

                    {

                        branchName,

                        address,

                        email,

                        phoneNumber

                    },

                    config

                );

                setMessage(
                    "Branch Updated Successfully"
                );

                setShowSuccessModal(true);

            }
            catch (err) {

                console.error(err);

                setMessage(
                    err.response.data.message ||
                    "Failed to Update Branch"
                );

                setShowErrorModal(true);

            }

        };

    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        Update Branch
                    </h1>

                    <div className="card mt-4">

                        <div className="card-body">

                            <form
                                onSubmit={
                                    updateBranch
                                }
                            >

                                <div className="mb-3">

                                    <label>
                                        Branch Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            branchName
                                        }
                                        onChange={
                                            (e) =>
                                                setBranchName(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        Address
                                    </label>

                                    <textarea
                                        className="form-control"
                                        value={
                                            address
                                        }
                                        onChange={
                                            (e) =>
                                                setAddress(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={
                                            email
                                        }
                                        onChange={
                                            (e) =>
                                                setEmail(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            phoneNumber
                                        }
                                        onChange={
                                            (e) =>
                                                setPhoneNumber(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>

                                <button
                                    className="btn btn-warning"
                                >
                                    Update Branch
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

                                            navigate(
                                                "/admin/branches"
                                            );

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

export default AdminUpdateBranch;