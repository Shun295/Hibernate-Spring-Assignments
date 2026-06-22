import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminCreateLoanType = () => {

    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loanType, setLoanType] = useState("");

    const [interestRate, setInterestRate] = useState("");
    const [maxTermMonths, setMaxTermMonths] = useState("");
    const [maxLoanAmount, setMaxLoanAmount] = useState("");
    const createLoanType =async (e) => {
            e.preventDefault();
            try {
                const config = {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token")
                    }
                };
                const body = {
                    loanType,
                    interestRate,
                    maxTermMonths,
                    maxLoanAmount
                };
                await axios.post(
                    "http://localhost:8080/api/loan-type/create",
                    body,
                    config
                );
                setShowSuccessModal(true);
            }
            catch (err) {
                console.error(err);
                setErrorMessage(err.response.data.message ||"Failed to create loan type"
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

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Create Loan Type
                        </h1>

                        <p className="page-subtitle">
                            Create a new loan product
                        </p>

                    </div>

                    <div className="card account-request-card">

                        <div className="card-body">

                            <form
                                onSubmit={
                                    createLoanType
                                }
                            >

                                <div className="mb-3">

                                    <label>
                                        Loan Type
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={loanType}
                                        onChange={(e) =>
                                                setLoanType(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        Interest Rate (%)
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        value={interestRate}
                                        onChange={
                                            (e) =>setInterestRate(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>
                                        Max Term Months
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={
                                            maxTermMonths
                                        }
                                        onChange={
                                            (e) =>
                                                setMaxTermMonths(
                                                    e.target.value
                                                )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-4">

                                    <label>
                                        Max Loan Amount
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        value={
                                            maxLoanAmount
                                        }
                                        onChange={
                                            (e) =>
                                                setMaxLoanAmount(
                                                    e.target.value
                                                )
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Create Loan Type
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

                                <div className="modal-header">

                                    <h5 className="modal-title">
                                        Success
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Loan Type Created Successfully
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-success"
                                        onClick={() => {

                                            setShowSuccessModal(
                                                false
                                            );

                                            navigate(
                                                "/admin/loan-types"
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
                                        {errorMessage}
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

export default AdminCreateLoanType;