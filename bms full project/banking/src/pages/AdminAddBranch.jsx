import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const AdminAddBranch = () => {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [branchName, setBranchName] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const addBranch = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("token")
                }
            };

            const body = {
                branchName,
                ifscCode,
                address,
                email,
                phoneNumber
            }
            await axios.post("http://localhost:8080/api/branch/admin/addBranch",
                body,
                config
            );

            setShowSuccessModal(true);
        }
        catch (err) {
            console.error(err)

        }
    };

    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        Add Branch
                    </h1>

                    <div
                        className="card mt-4"
                    >

                        <div
                            className="card-body"
                        >

                            <form
                                onSubmit={
                                    addBranch
                                }
                            >

                                <div
                                    className="mb-3"
                                >

                                    <label>
                                        Branch Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        required
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

                                <div
                                    className="mb-3"
                                >

                                    <label>
                                        IFSC Code
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        required
                                        value={
                                            ifscCode
                                        }
                                        onChange={
                                            (e) =>
                                                setIfscCode(
                                                    e.target.value
                                                )
                                        }
                                    />

                                </div>

                                <div
                                    className="mb-3"
                                >

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

                                <div
                                    className="mb-3"
                                >

                                    <label>
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        required
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

                                <div
                                    className="mb-3"
                                >

                                    <label>
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        required
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
                                    className="btn btn-success"
                                >
                                    Add Branch
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

            {
                //success message shown
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

                                <div className="modal-header">

                                    <h5 className="modal-title">
                                        Success
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Branch Added Successfully
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-success"
                                        //when ok is clicked
                                        onClick={() => {
                                            setShowSuccessModal(false );
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

        </div>

    );

};

export default AdminAddBranch;