import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const AdminLoanDetails = () => {

    const { loanId } = useParams();

    const [loan, setLoan] = useState(null);

    const [monitoring, setMonitoring] = useState(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const config = {
        headers: {
            Authorization:
                "Bearer " +
                localStorage.getItem(
                    "token"
                )

        }
    };

    useEffect(() => {

        loadLoan();

    }, []);

    const loadLoan =
        async () => {

            try {

                const loanResponse =
                    await axios.get(

                        `http://localhost:8080/api/loan/${loanId}`,

                        config

                    );

                setLoan(
                    loanResponse.data
                );

                const monitoringResponse =
                    await axios.get(

                        `http://localhost:8080/api/loan/monitoring/${loanId}`,

                        config

                    );

                setMonitoring(
                    monitoringResponse.data
                );

            }
            catch (err) {

                console.error(err)

            }

        };

    const completeLoan =
        async () => {

            try {

                await axios.put(

                    `http://localhost:8080/api/loan/${loanId}/complete`,

                    {},

                    config

                );

                setSuccessMessage(
                    "Loan Completed Successfully"
                );

                setShowSuccessModal(true);

                loadLoan();

            }
            catch (err) {

                console.error(err)
                setErrorMessage(
                    "Failed to Complete Loan"
                );

                setShowErrorModal(true);

            }

        };

    const closeLoan =
        async () => {

            try {

                await axios.put(

                    `http://localhost:8080/api/loan/${loanId}/close`,

                    {},

                    config

                );
                setSuccessMessage(
                    "Loan Closed Successfully"
                );

                setShowSuccessModal(true);

                loadLoan();

            }
            catch (err) {

                console.error(err)
                setErrorMessage(
                    "Failed to Close Loan"
                );

                setShowErrorModal(true);

            }

        };

    const defaultLoan = async () => {
        try {
            await axios.put(
                `http://localhost:8080/api/loan/${loanId}/default`,
                {},
                config
            );

            setSuccessMessage(
                "Loan Marked As Default"
            );

            setShowSuccessModal(true);
            loadLoan();

        }
        catch (err) {

            console.error(err)
            setErrorMessage(
                "Failed To Mark Loan As Default"
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
                        Loan Details
                    </h1>

                    {/* Loan Information */}

                    <div className="card mt-4">

                        <div className="card-header">

                            <h4>
                                Loan Information
                            </h4>

                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6">

                                    <p>

                                        <strong>
                                            Loan ID :
                                        </strong>

                                        {" "}
                                        {loan?.loanId}

                                    </p>

                                    <p>

                                        <strong>
                                            Loan Application ID :
                                        </strong>

                                        {" "}
                                        {
                                            loan?.loanApplicationId
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Status :
                                        </strong>

                                        {" "}

                                        <span
                                            className={
                                                loan?.loanStatus === "ACTIVE"

                                                    ?

                                                    "badge bg-success"

                                                    :

                                                    loan?.loanStatus === "DEFAULTED"

                                                        ?

                                                        "badge bg-danger"

                                                        :

                                                        "badge bg-secondary"
                                            }
                                        >

                                            {
                                                loan?.loanStatus
                                            }

                                        </span>

                                    </p>

                                </div>

                                <div className="col-md-6">

                                    <p>

                                        <strong>
                                            Balance Amount :
                                        </strong>

                                        {" "}
                                        ₹
                                        {
                                            loan?.balanceAmount
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Start Date :
                                        </strong>

                                        {" "}
                                        {
                                            loan?.startDate
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            End Date :
                                        </strong>

                                        {" "}
                                        {
                                            loan?.endDate
                                        }

                                    </p>

                                </div>

                            </div>

                            <p>

                                <strong>
                                    Created At :
                                </strong>

                                {" "}
                                {loan?.createdAt}

                            </p>

                        </div>

                    </div>

                    {/* Monitoring */}

                    <div className="card mt-4">

                        <div className="card-header">

                            <h4>
                                Loan Monitoring
                            </h4>

                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6">

                                    <p>

                                        <strong>
                                            Customer Name :
                                        </strong>

                                        {" "}
                                        {
                                            monitoring?.customerName
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Original Loan Amount :
                                        </strong>

                                        {" "}
                                        ₹
                                        {
                                            monitoring?.originalLoanAmount
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Total Repaid :
                                        </strong>

                                        {" "}
                                        ₹
                                        {
                                            monitoring?.totalRepaidAmount
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Balance Amount :
                                        </strong>

                                        {" "}
                                        ₹
                                        {
                                            monitoring?.balanceAmount
                                        }

                                    </p>

                                </div>

                                <div className="col-md-6">

                                    <p>

                                        <strong>
                                            EMI Amount :
                                        </strong>

                                        {" "}
                                        ₹
                                        {
                                            monitoring?.emiAmount
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Repayment % :
                                        </strong>

                                        {" "}
                                        {
                                            monitoring?.repaymentPercentage
                                        }
                                        %

                                    </p>

                                    <p>

                                        <strong>
                                            Next Due Date :
                                        </strong>

                                        {" "}
                                        {
                                            monitoring?.nextDueDate
                                        }

                                    </p>

                                    <p>

                                        <strong>
                                            Status :
                                        </strong>

                                        {" "}
                                        {
                                            monitoring?.status
                                        }

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Actions */}

                    <div className="card mt-4">

                        <div className="card-header">

                            <h4>
                                Actions
                            </h4>

                        </div>

                        <div className="card-body">

                            {
                                loan?.loanStatus === "ACTIVE"

                                &&

                                <>
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={
                                            completeLoan
                                        }
                                    >
                                        Complete Loan
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={
                                            defaultLoan
                                        }
                                    >
                                        Mark Default
                                    </button>
                                </>
                            }

                            {
                                loan?.loanStatus === "COMPLETED"

                                &&

                                <button
                                    className="btn btn-warning"
                                    onClick={
                                        closeLoan
                                    }
                                >
                                    Close Loan
                                </button>
                            }

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
                            backgroundColor: "rgba(0,0,0,0.5)"
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
                                        {successMessage}
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            setShowSuccessModal(false)
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

            {
                showErrorModal && (

                    <div
                        className="modal fade show"
                        style={{
                            display: "block",
                            backgroundColor: "rgba(0,0,0,0.5)"
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

export default AdminLoanDetails;