import NavbarCustomer from "../Navbar-Customer";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/customer-common.css";

const AccountOpeningForm = () => {
    const accountTypesApi = "http://localhost:8080/api/account-type/all";

    const applyApi = "http://localhost:8080/api/accountOpeningReq/apply";
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorTitle, setErrorTitle] = useState("");
    const [errorMessage,setErrorMessage] = useState("");
    const [accountTypes, setAccountTypes] = useState([]);
    const [accountTypeId, setAccountTypeId] = useState("");
    const [pan, setPan] = useState(null);
    const [aadhar, setAadhar] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {

        const config_details = {
            headers: {
                Authorization:"Bearer " + localStorage.getItem("token")
            }
        };

        const loadAccountTypes = async () => {
            try {
                const response = await axios.get(accountTypesApi,config_details);
                console.log("Account Types:", response.data);
                setAccountTypes(response.data);
            }
            catch (err) {
                console.error(err);
            }
        };
        loadAccountTypes();

    }, []);
    const applyForAccount = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append("accountTypeId",accountTypeId);
        formData.append( "pan",pan);
        formData.append("aadhar",aadhar);
        formData.append("photo",photo);

        try {
            await axios.post(applyApi,formData,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                            "Content-Type":"multipart/form-data"
                    }
                }
            );

            setShowSuccessModal(
                true
            );
        }
        catch (err) {

            const message =
                err?.response?.data?.message;

            if (message ==="Customer already has this account type") {

                setErrorTitle("Account Already Exists");
                setErrorMessage("You already have this account type.");
            }
            else if (message ==="Pending request already exists for this account type") {

                setErrorTitle("Request Already Submitted");
                setErrorMessage("Your request is already under review.");
            }
            else {
                setErrorTitle( "Request Failed");
                setErrorMessage("Something went wrong. Please try again.");
            }
            setShowErrorModal(true);
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
                            Request New Account
                        </h1>
                        <p className="page-subtitle">
                            Submit your documents to apply for a new bank account
                        </p>
                    </div>

                    <div className="card account-request-card mt-4">

                        <div className="card-header bg-white border-0 pt-4 px-4">
                            <h3 className="form-title">
                                Account Opening Application
                            </h3>

                            <p className="form-subtitle">
                                Complete the details below and upload the required documents.
                            </p>
                        </div>

                        <div className="card-body">

                            <form onSubmit={applyForAccount}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Account Type
                                    </label>

                                    <select
                                        className="form-select"
                                        value={accountTypeId}
                                        onChange={(e) =>
                                            setAccountTypeId(e.target.value)
                                        }
                                        required
                                    >

                                        <h5 className="section-heading mb-3">
                                            Account Information
                                        </h5>
                                        <option value="">
                                            Select Account Type
                                        </option>

                                        {
                                            accountTypes.map((type) => (

                                                <option
                                                    key={type.id}
                                                    value={type.id}
                                                >
                                                    {type.AccountType}
                                                </option>

                                            ))
                                        }

                                    </select>

                                </div>

                                <div className="mb-3">
                                    <h5 className="section-heading mt-4 mb-3">
                                        Required Documents
                                    </h5>

                                    <label className="form-label fw-semibold">
                                        PAN Card Document
                                    </label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) =>
                                            setPan(e.target.files[0])
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Aadhar card document
                                    </label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) =>
                                            setAadhar(e.target.files[0])
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label fw-semibold">
                                        Passport Photo
                                    </label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) =>
                                            setPhoto(e.target.files[0])
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary px-4 py-2"
                                >
                                    Submit Request
                                </button>

                            </form>

                        </div>

                    </div>
                </div>

            </div>
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

                                    <h5 className="modal-title">
                                        {errorTitle}
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
                                        {
                                            setShowErrorModal(false)
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

                        <h5 className="modal-title text-success">
                            Request Submitted
                        </h5>

                    </div>

                    <div className="modal-body">

                        <p>
                            Your account opening request has been submitted successfully.
                        </p>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-success"
                            onClick={() => {

                                setShowSuccessModal(false
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

        </div>

    );
};

export default AccountOpeningForm;