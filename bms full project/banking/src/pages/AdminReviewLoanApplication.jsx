import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminReviewLoanApplication = () => {

    const { applicationId } = useParams();

    const navigate = useNavigate();

    const [application, setApplication] =
        useState(null);

    const [remarks, setRemarks] =
        useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [message, setMessage] = useState("");
    const [isApproved, setIsApproved] = useState(false);

    const getApi =
        `http://localhost:8080/api/loan-application/${applicationId}/admin`;

    const approveApi =
        `http://localhost:8080/api/loan-application/${applicationId}/approve`;

    const rejectApi =
        `http://localhost:8080/api/loan-application/${applicationId}/reject`;

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        const getApplication = async () => {

            try {

                const response =
                    await axios.get(
                        getApi,
                        config_details
                    );

                setApplication(
                    response.data
                );

            }
            catch (err) {

                console.error(err)

            }

        };

        getApplication();

    }, []);

    const approveApplication = async () => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        try {

            await axios.put(
                approveApi,
                {},
                config_details
            );

            setMessage(
                "Loan Approved Successfully"
            );

            setIsApproved(true);

            setShowSuccessModal(true);

        }
        catch (err) {

            setMessage(
                "Approval Failed"
            );

            setShowErrorModal(true);
        }

    };

    const rejectApplication = async () => {

        if (!remarks.trim()) {

            setMessage(
                "Please enter rejection remarks"
            );

            setShowErrorModal(true);

            return;

        }

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        try {

            await axios.put(
                rejectApi,
                {
                    remarks
                },
                config_details
            );

            setMessage(
                "Loan Rejected Successfully"
            );

            setIsApproved(false);

            setShowSuccessModal(true);

        }
        catch (err) {

            setMessage(
                "Loan Rejected Successfully"
            );

            setIsApproved(false);

            setShowSuccessModal(true);

        }

    };

    if (!application) {

        return <h3>Loading...</h3>;

    }

    return (

        <div className="container mt-4">

            <h2>
                Review Loan Application
            </h2>

            <div className="card mt-3">

                <div className="card-body">

                    <p>
                        <strong>
                            Application ID:
                        </strong>
                        {" "}
                        {
                            application.applicationId
                        }
                    </p>

                    <p>
                        <strong>
                            Customer:
                        </strong>
                        {" "}
                        {
                            application.customerName
                        }
                    </p>

                    <p>
                        <strong>
                            Account Number:
                        </strong>
                        {" "}
                        {
                            application.accountNumber
                        }
                    </p>

                    <p>
                        <strong>
                            Loan Type:
                        </strong>
                        {" "}
                        {
                            application.loanType
                        }
                    </p>

                    <p>
                        <strong>
                            Principal Amount:
                        </strong>
                        {" "}
                        {
                            application.principalAmount
                        }
                    </p>

                    <p>
                        <strong>
                            Interest Rate:
                        </strong>
                        {" "}
                        {
                            application.interestRate
                        } %
                    </p>

                    <p>
                        <strong>
                            Term:
                        </strong>
                        {" "}
                        {
                            application.termInMonth
                        }
                        {" "}
                        Months
                    </p>

                    <p>
                        <strong>
                            EMI:
                        </strong>
                        {" "}
                        {
                            application.emiAmount
                        }
                    </p>

                    <p>
                        <strong>
                            Total Repayable:
                        </strong>
                        {" "}
                        {
                            application.totalRepayableAmount
                        }
                    </p>

                    <p>
                        <strong>
                            Executive Remarks:
                        </strong>
                    </p>

                    <div className="alert alert-info">

                        {
                            application.remarks
                        }

                    </div>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-header">

                    <h4>
                        Admin Decision
                    </h4>

                </div>

                <div className="card-body">

                    <div className="mb-3">

                        <label className="form-label">

                            Rejection Remarks

                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            value={remarks}
                            onChange={(e) =>
                                setRemarks(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <button
                        className="btn btn-success me-2"
                        onClick={
                            approveApplication
                        }
                    >
                        Approve
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={
                            rejectApplication
                        }
                    >
                        Reject
                    </button>

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
                                                "/admin/loan-applications"
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

export default AdminReviewLoanApplication;