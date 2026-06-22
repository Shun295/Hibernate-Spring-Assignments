import { useEffect, useState } from "react";
import axios from "axios";

import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";
import "../styles/customer-common.css";
import { useNavigate, useParams }
    from "react-router-dom";
const CustomerJointAccountRequest = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);

    const [accountId, setAccountId] = useState("");

    const [jointAccountNumber, setJointAccountNumber] = useState("");

    const [reason, setReason] = useState("");

    const [holder, setHolder] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

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

        getMyAccounts();

    }, []);

    const getMyAccounts =
        async () => {

            try {

                const response =
                    await axios.get(

                        "http://localhost:8080/api/account/my-accounts?page=0&size=50",

                        config

                    );

                setAccounts(
                    response.data.data
                );

            }
            catch (err) {

                console.error(err)

            }

        };

    const searchHolder =
        async () => {

            if (!jointAccountNumber) {

                setErrorMessage(
                    "Enter Account Number"
                );

                setShowErrorModal(true);


                return;

            }

            try {

                const response =
                    await axios.get(

                        `http://localhost:8080/api/jointAccReq/search-holder?accountNumber=${jointAccountNumber}`,

                        config

                    );

                setHolder(
                    response.data
                );

            }
            catch (err) {

                console.error(err)
                setErrorMessage(
                    "Account Not Found"
                );

                setShowErrorModal(true);

                setHolder(
                    null
                );

            }

        };

    const submitRequest =
        async (e) => {

            e.preventDefault();
            try {
                await axios.post(
                    "http://localhost:8080/api/jointAccReq/request",
                    {
                        accountId: Number(accountId),
                        jointHolderCustomerId: holder.customerId,
                        reason: reason
                    },
                    config
                );
                setShowSuccessModal( true);
                setAccountId("");
                setJointAccountNumber("");
                setReason("");
                setHolder(null);
            }
            catch (err) {
                console.error(err)
                setErrorMessage(err.response.data ||"Unable To Submit Request");
                setShowErrorModal(true);
            }

        };

    return (

        <div>

            <NavbarCustomer />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0 pt-4 px-4">

                            <h3 className="form-title">
                                Joint Holder Application
                            </h3>

                            <p className="form-subtitle">
                                Select an account and add a secondary account holder.
                            </p>

                        </div>

                        <div className="card-body">

                            <form
                                onSubmit={
                                    submitRequest
                                }
                            >

                                <div className="mb-3">

                                    <h5 className="section-heading mb-3">
                                        Account Information
                                    </h5>
                                    <label
                                        className="form-label"
                                    >
                                        Primary Account
                                    </label>

                                    <select
                                        className="form-select"
                                        required
                                        value={
                                            accountId
                                        }
                                        onChange={(e) =>
                                            setAccountId(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Account
                                        </option>

                                        {

                                            accounts?.map(

                                                (
                                                    account
                                                ) => (

                                                    <option
                                                        key={
                                                            account.id
                                                        }
                                                        value={
                                                            account.id
                                                        }
                                                    >

                                                        {
                                                            account.accountNumber
                                                        }

                                                        {" - "}

                                                        {
                                                            account.accountType
                                                        }

                                                    </option>

                                                )

                                            )

                                        }

                                    </select>

                                </div>

                                <div className="mb-3">
                                    <h5 className="section-heading mt-4 mb-3">
                                        Joint Holder Details
                                    </h5>
                                    <label
                                        className="form-label"
                                    >
                                        Joint Holder Account Number
                                    </label>

                                    <div className="d-flex gap-2">

                                        <input
                                            type="text"
                                            className="form-control"
                                            required
                                            placeholder="Enter Account Number"
                                            value={
                                                jointAccountNumber
                                            }
                                            onChange={(e) =>
                                                setJointAccountNumber(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-primary px-4"
                                            
                                            onClick={
                                                searchHolder
                                            }
                                        >
                                            Search
                                        </button>

                                    </div>

                                </div>

                                {

                                    holder && (

                                        <div className="customer-found-card">

                                            <h6>
                                                Customer Found
                                            </h6>

                                            <p
                                                className="
                                                mb-1
                                                "
                                            >

                                                <strong>
                                                    Name :
                                                </strong>

                                                {" "}

                                                {
                                                    holder.customerName
                                                }

                                            </p>

                                            <p
                                                className="
                                                mb-0
                                                "
                                            >

                                                <strong>
                                                    Account :
                                                </strong>

                                                {" "}

                                                {
                                                    holder.accountNumber
                                                }

                                            </p>

                                        </div>

                                    )

                                }

                                <div className="mb-3">
                                    <h5 className="section-heading mt-4 mb-3">
                                        Request Details
                                    </h5>
                                    <label
                                        className="form-label"
                                    >
                                        Reason
                                    </label>

                                    <textarea
                                        rows="3"
                                        className="form-control"
                                        placeholder="Enter reason for adding joint holder"
                                        required
                                        value={
                                            reason
                                        }
                                        onChange={(e) =>
                                            setReason(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100 py-3"
                                >
                                    Submit Request
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
                                        Request Submitted
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Joint Account Request Submitted Successfully.
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
                                                "/customer/accounts"
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

export default CustomerJointAccountRequest;