import NavbarCustomer from "../Navbar-Customer";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/customer-common.css";
const RequestClosureForm = () => {

    const navigate = useNavigate();
    const myAccountsApi =
        "http://localhost:8080/api/account/my-accounts";
    const requestClosureApi =
        "http://localhost:8080/api/accountClosure/customer/request";
    const [accounts, setAccounts] = useState([]);

    const [accountId, setAccountId] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [reason, setReason] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        const getAccounts = async () => {

            try {

                const response = await axios.get(
                    myAccountsApi,
                    config_details
                );

                console.log(response.data);

                setAccounts(response.data.data);

            }
            catch (err) {

                console.log(err?.response);

            }

        };

        getAccounts();

    }, []);
    const openConfirmation = (e) => {
        e.preventDefault();
        setShowConfirm(true);
    };
    const submitRequest = async (e) => {

        e.preventDefault();

        const body = {
            accountId,
            reason
        };

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            await axios.post(
                requestClosureApi,
                body,
                config_details
            );

            setShowSuccessModal(
                true
            );
        }
        catch (err) {

            console.error(err);

            setErrorMessage(
                err.response.data.message ||
                "Unable to submit request"
            );

            setShowErrorModal(
                true
            );

        }
    };
    return (
        <div>

            <NavbarCustomer />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">
                    <div className="page-header mb-4">
                        <h1 className="page-title">
                            Account Closure Request
                        </h1>

                        <p className="page-subtitle">
                            Submit a request to permanently close an existing account
                        </p>
                    </div>

                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0 pt-4 px-4">



                            <p className="form-subtitle">
                                Select the account you wish to close and provide a reason.
                            </p>

                        </div>

                        <div className="card-body">
                            <form onSubmit={openConfirmation}>

                                <div className="mb-3">
                                    <h5 className="section-heading mb-3">
                                        Account Information
                                    </h5>

                                    <select
                                        className="form-control"
                                        value={accountId}
                                        onChange={(e) =>
                                            setAccountId(e.target.value)
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Account
                                        </option>

                                        {
                                            accounts.map((account) => (

                                                <option
                                                    key={account.id}
                                                    value={account.id}
                                                >
                                                    {account.accountNumber}
                                                    {" - "}
                                                    {account.accountType}
                                                </option>

                                            ))
                                        }

                                    </select>

                                </div>

                                <div className="mb-3">
                                    <h5 className="section-heading mt-4 mb-3">
                                        Closure Details
                                    </h5>

                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        value={reason}
                                        onChange={(e) =>
                                            setReason(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger w-100 py-3"
                                >
                                    Submit Request
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

            {
                showConfirm && (
                    <div
                        className="modal d-block"
                        style={{
                            backgroundColor: "rgba(0,0,0,0.5)"
                        }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title text-danger fw-bold">
                                        Confirm Account Closure
                                    </h5>

                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowConfirm(false)}
                                    ></button>
                                </div>

                                <div className="modal-body">
                                    <p className="mb-0">
                                        This action will submit an account closure request for review.
                                        Are you sure you want to continue?
                                    </p>
                                </div>

                                <div className="modal-footer">

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowConfirm(false)}
                                    >
                                        No
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            setShowConfirm(false);

                                            submitRequest({
                                                preventDefault: () => { }
                                            });
                                        }}
                                    >
                                        Yes, Submit
                                    </button>

                                </div>

                            </div>
                        </div>
                    </div>
                )
            }

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
                                        Request Submitted
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Your account closure request has been submitted successfully.
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
                                                "/customer/closure-requests"
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

                                <div className="modal-header">

                                    <h5 className="modal-title text-danger">
                                        Request Failed
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
                                            setShowErrorModal(
                                                false
                                            )
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

export default RequestClosureForm;