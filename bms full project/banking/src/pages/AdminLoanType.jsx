import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLoanType = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLoanTypeId, setSelectedLoanTypeId] = useState(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const [loanTypes, setLoanTypes] = useState([]);

    useEffect(() => {

        loadLoanTypes();

    }, []);

    const loadLoanTypes =async () => {
            try {
                const config = {
                    headers: {
                        Authorization:
                            "Bearer " +localStorage.getItem(
                                "token"
                            )

                    }

                };

                const response =
                    await axios.get(

                        "http://localhost:8080/api/loan-type/all",

                        config

                    );

                setLoanTypes(
                    response.data
                );

            }
            catch (err) {

                console.log(
                    err?.response
                );

            }

        };

    const deleteLoanType = async () => {

        try {

            const config = {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            };

            await axios.delete(
                `http://localhost:8080/api/loan-type/delete/${selectedLoanTypeId}`,
                config
            );

            setMessage(
                "Loan Type Deleted Successfully"
            );

            setShowDeleteModal(false);

            setShowSuccessModal(true);

            loadLoanTypes();

        }
        catch (err) {

            console.error(err);

            setMessage(
                "Failed to Delete Loan Type"
            );

            setShowDeleteModal(false);

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
                            Loan Type Management
                        </h1>

                        <p className="page-subtitle">
                            Create and manage loan products offered by the bank
                        </p>

                    </div>

                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">

                            <div>

                                <h3 className="form-title">
                                    Loan Types
                                </h3>

                                <p className="form-subtitle">
                                    Available loan products
                                </p>

                            </div>

                            <button
                                className="btn btn-primary"
                                onClick={() =>
                                    navigate(
                                        "/admin/loan-types/create"
                                    )
                                }
                            >
                                Create Loan Type
                            </button>

                        </div>

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Loan Type</th>
                                        <th>Interest Rate</th>
                                        <th>Max Term</th>
                                        <th>Max Amount</th>
                                        <th>Action</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        loanTypes.length > 0 ?

                                            loanTypes.map(
                                                (loanType) => (

                                                    <tr
                                                        key={
                                                            loanType.id
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                loanType.id
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                loanType.loanType
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                loanType.interestRate
                                                            }%
                                                        </td>

                                                        <td>
                                                            {
                                                                loanType.maxTermMonths
                                                            }
                                                            {" "}Months
                                                        </td>

                                                        <td>

                                                            ₹

                                                            {

                                                                Number(
                                                                    loanType.maxLoanAmount
                                                                ).toLocaleString()

                                                            }

                                                        </td>

                                                        <td>

                                                            <button
                                                                className="btn btn-outline-primary btn-sm me-2"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/loan-types/${loanType.id}/edit`
                                                                    )
                                                                }
                                                            >
                                                                Edit
                                                            </button>

                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => {

                                                                    setSelectedLoanTypeId(
                                                                        loanType.id
                                                                    );

                                                                    setShowDeleteModal(true);

                                                                }}
                                                            >
                                                                Delete
                                                            </button>

                                                        </td>
                                                    </tr>

                                                )
                                            )

                                            :

                                            <tr>

                                                <td
                                                    colSpan="6"
                                                    className="text-center"
                                                >
                                                    No Loan Types Found
                                                </td>

                                            </tr>

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

            {
                showDeleteModal && (

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
                                        Confirm Delete
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Are you sure you want to delete this Loan Type?
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowDeleteModal(false)
                                        }
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-danger"
                                        onClick={deleteLoanType}
                                    >
                                        Delete
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

export default AdminLoanType;