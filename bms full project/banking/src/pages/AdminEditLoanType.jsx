import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AdminEditLoanType = () => {

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const { id } = useParams();

    const [loanType, setLoanType] = useState("");

    const [interestRate, setInterestRate] = useState("");

    const [maxTermMonths, setMaxTermMonths] = useState("");

    const [maxLoanAmount, setMaxLoanAmount] = useState("");
    useEffect(() => {

        loadLoanType();

    }, []);

    const loadLoanType =
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

                        `http://localhost:8080/api/loan-type/${id}`,

                        config

                    );

                setLoanType(response.data.loanType);

                setInterestRate(response.data.interestRate);

                setMaxTermMonths(response.data.maxTermMonths);

                setMaxLoanAmount(response.data.maxLoanAmount);

            }
            catch (err) {

                console.error(err)

            }

        };

    const updateLoanType =
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

                const body = {

                    loanType,

                    interestRate,

                    maxTermMonths,

                    maxLoanAmount

                };

                await axios.put(
                    `http://localhost:8080/api/loan-type/${id}/update`,
                    body,
                    config
                );

                setShowSuccessModal(true);

            }
            catch (err) {

                console.log(
                    err?.response
                );

                alert(
                    "Failed to update loan type"
                );

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
                            Edit Loan Type
                        </h1>

                        <p className="page-subtitle">
                            Update loan product details
                        </p>

                    </div>

                    <div className="card account-request-card">

                        <div className="card-body">

                            <form
                                onSubmit={
                                    updateLoanType
                                }
                            >

                                <div className="mb-3">

                                    <label>
                                        Loan Type
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={
                                            loanType
                                        }
                                        onChange={
                                            (e) =>
                                                setLoanType(
                                                    e.target.value
                                                )
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
                                        value={
                                            interestRate
                                        }
                                        onChange={
                                            (e) =>
                                                setInterestRate(
                                                    e.target.value
                                                )
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
                                    Update Loan Type
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
                                        Loan Type Updated Successfully
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-success"
                                        onClick={() => {

                                            setShowSuccessModal(false);

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

        </div>

    );

};

export default AdminEditLoanType;