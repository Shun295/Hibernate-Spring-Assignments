import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminLoanMonitoring = () => {

    const { loanId } = useParams();

    const [loan, setLoan] = useState(null);
    const [repayments, setRepayments] = useState([]);
    const [page, setPages] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const monitoringApi = `http://localhost:8080/api/loan/monitoring/${loanId}`;

    const repaymentApi = `http://localhost:8080/api/repayment/loan/${loanId}`;

    let count = 0;
   const config = {
    headers: {
        Authorization:
            "Bearer " +
            localStorage.getItem("token")
    }
};

const getLoanMonitoring = async () => {

    try {

        const response =
            await axios.get(
                monitoringApi,
                config
            );

        setLoan(
            response.data
        );

    }
    catch (err) {

        console.error(err);

    }

};

const getRepayments = async () => {

    try {

        const response =
            await axios.get(
                `${repaymentApi}?page=${page}&size=10`,
                config
            );

        setRepayments(
            response.data.data
        );

        setTotalPages(
            response.data.totalPages
        );

    }
    catch (err) {

        console.error(err);

    }

};

useEffect(() => {

    getLoanMonitoring();

    getRepayments();

}, [loanId, page]);

   const sendReminder = async (loanId) => {

    try {

        await axios.put(
            `http://localhost:8080/api/loan/admin/send-reminder/${loanId}`,
            {},
            config
        );

        setSuccessMessage(
            "Reminder Sent Successfully"
        );

        setShowSuccessModal(true);

        getLoanMonitoring();

    }
    catch (err) {

        console.error(err);

    }

};
    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        Loan Monitoring
                    </h1>

                    {
                        loan && (

                            <div className="card">

                                <div className="card-header">

                                    <h4>
                                        Loan Monitoring
                                    </h4>

                                </div>

                                <div className="card-body">

                                    <div className="row">

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Customer
                                                </strong>

                                                <br />

                                                {
                                                    loan.customerName
                                                }

                                            </p>

                                        </div>

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Loan ID
                                                </strong>

                                                <br />

                                                {
                                                    loan.loanId
                                                }

                                            </p>

                                        </div>

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Balance
                                                </strong>

                                                <br />

                                                ₹
                                                {
                                                    loan.balanceAmount
                                                }

                                            </p>

                                        </div>

                                    </div>

                                    <div className="row">

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    EMI
                                                </strong>

                                                <br />

                                                ₹
                                                {
                                                    loan.emiAmount
                                                }

                                            </p>

                                        </div>

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Next Due Date
                                                </strong>

                                                <br />

                                                {
                                                    loan.nextDueDate
                                                }

                                            </p>

                                        </div>

                                        <div className="col-md-4">

                                            <p>

                                                <strong>
                                                    Status
                                                </strong>

                                                <br />

                                                <span
                                                    className={
                                                        loan.status ===
                                                            "OVERDUE"

                                                            ?

                                                            "badge bg-danger"

                                                            :

                                                            "badge bg-success"
                                                    }
                                                >

                                                    {
                                                        loan.status
                                                    }

                                                </span>

                                                {
                                                    loan.status === "OVERDUE" &&
                                                    !loan.reminderSent &&

                                                    <div className="mt-2">

                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            onClick={() => sendReminder(loan.loanId)}
                                                        >
                                                            Send Reminder
                                                        </button>

                                                    </div>
                                                }

                                                {
                                                    loan.reminderSent &&

                                                    <div className="mt-2">

                                                        <span className="badge bg-info">
                                                            Reminder Sent ✓
                                                        </span>

                                                    </div>
                                                }


                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    }

                    <div className="card mt-4">

                        <div className="card-header">

                            <h4>
                                Repayment Transactions
                            </h4>

                        </div>

                        <div className="card-body">

                            <table className="table table-bordered">

                                <thead>

                                    <tr>

                                        <th>
                                            Repayment ID
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Payment Mode
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Reference
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        repayments.length > 0 ?

                                            repayments.map(
                                                (repayment) => (

                                                    <tr
                                                        key={
                                                            repayment.repaymentId
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                repayment.repaymentId
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                repayment.repaymentAmount
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                repayment.paymentMode
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                repayment.repaymentDate
                                                            }
                                                        </td>

                                                        <td>

                                                            TXN-

                                                            {
                                                                repayment.transactionReference?.substring(
                                                                    0,
                                                                    8
                                                                )
                                                            }

                                                        </td>

                                                    </tr>

                                                )
                                            )

                                            :

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="text-center"
                                                >
                                                    No Repayments Found
                                                </td>

                                            </tr>
                                    }

                                </tbody>

                            </table>

                            <nav className="mt-4">

                                <ul className="pagination justify-content-center">

                                    <li
                                        className="page=item"
                                    >

                                        <button
                                            className="page-link"
                                            disabled={page === 0}
                                            onClick={() =>
                                                setPages(
                                                    page - 1
                                                )
                                            }
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {

                                        [...Array(totalPages)]

                                            .map(

                                                (_, index) => (

                                                    <li
                                                        key={index}
                                                        className="page-item"
                                                    >

                                                        <button
                                                            className="page-link"

                                                            onClick={() =>
                                                                setPages(
                                                                    index
                                                                )
                                                            }
                                                        >
                                                            {count = count + 1}
                                                        </button>

                                                    </li>

                                                )

                                            )

                                    }

                                    <li
                                        className="page-item"
                                    >

                                        <button
                                            className="page-link"
                                            disabled={page === totalPages - 1}
                                            onClick={() =>
                                                setPages(
                                                    page + 1
                                                )
                                            }
                                        >
                                            Next
                                        </button>

                                    </li>

                                </ul>

                            </nav>

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

        </div>

    );

};

export default AdminLoanMonitoring;