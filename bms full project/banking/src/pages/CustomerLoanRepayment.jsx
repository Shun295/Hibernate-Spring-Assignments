import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";
import { useDispatch } from "react-redux";
import { getMyLoans } from "../store/action/loanAction";
import { useSelector } from "react-redux";

import { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const CustomerLoanRepayment = () => {
    const [repayments, setRepayments] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showSuccessModal, setShowSuccessModal] =useState(false);
    const [loanSummary, setLoanSummary] =useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] =useState(0);
    const { loans } = useSelector(
        state => state.loans
    );

    let count=0;
    const [loanId, setLoanId] =useState("");

    const [repaymentAmount,setRepaymentAmount] =useState("");

    const [paymentMode,setPaymentMode] =useState("");

    const repaymentApi =
        "http://localhost:8080/api/repayment/pay";
    const myRepaymentApi =
        "http://localhost:8080/api/repayment/my-repayments";
    const loanSummaryApi =
        "http://localhost:8080/api/repayment/summary";
    const submitRepayment =
        async (e) => {

            e.preventDefault();

            const body = {

                loanId,

                repaymentAmount,

                paymentMode

            };

            const config_details = {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem(
                            "token"
                        )
                }
            };

            try {

                await axios.post(
                    repaymentApi,
                    body,
                    config_details
                );
                await fetchMyRepayments();

                setShowSuccessModal(
                    true
                );

            }
            catch (err) {

                console.error(err)
            }

        };
    const fetchLoanSummary =
        async (loanId) => {

            const config_details = {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem(
                            "token"
                        )
                }
            };

            try {

                const response =
                    await axios.get(

                        `${loanSummaryApi}/${loanId}`,

                        config_details

                    );

                setLoanSummary(
                    response.data
                );

            }
            catch (err) {

                console.log(err);

            }

        };
    const handleLoanChange = async (e) => {

        const selectedLoanId = e.target.value;

        setLoanId(selectedLoanId);

        if (selectedLoanId) {

            await fetchLoanSummary(selectedLoanId);

        } else {

            setLoanSummary(null);

        }

    };
    useEffect(() => {
        dispatch(getMyLoans());

        fetchMyRepayments();

    }, [page]);

    const fetchMyRepayments = async () => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        try {

            const response = await axios.get(

                `${myRepaymentApi}?page=${page}&size=5`,

                config_details

            );

            setRepayments(
                response.data.data
            );

            setTotalPages(
                response.data.totalPages
            );

        }
        catch (err) {

            console.log(err);

        }

    };
    console.log("LOANS =", loans);
    return (

        <div>

            <NavbarCustomer />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">
                        <h1 className="page-title">
                            Loan Repayment
                        </h1>

                        <p className="page-subtitle">
                            Make repayments towards your active loans securely and conveniently
                        </p>
                    </div>

                    <div className="card account-request-card mt-4">

                        <div className="card-header bg-white border-0 pt-4 px-4">

                            <h3 className="form-title">
                                Loan Repayment Form
                            </h3>

                        </div>

                        <div className="card-body">

                            <form
                                onSubmit={
                                    submitRepayment
                                }
                            >

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        Select Loan
                                        
                                    </label>

                                    <select
                                        className="form-select"
                                        value={loanId}
                                        onChange={handleLoanChange}
                                        required
                                    >

                                        <option value="">
                                            Select Loan
                                        </option>

                                        {
                                            loans.map(
                                                (
                                                    loan
                                                ) => (

                                                    <option
                                                        key={
                                                            loan.loanId
                                                        }
                                                        value={
                                                            loan.loanId
                                                        }
                                                    >

                                                        {loan.loanId} | Balance ₹{Number(loan.balanceAmount).toLocaleString()}

                                                    </option>

                                                )
                                            )
                                        }

                                    </select>

                                </div>
                                {
                                    loanSummary && (

                                        <div className="row mb-4">

                                            <div className="col-md-4">

                                                <div className="card border-0 shadow-sm">

                                                    <div className="card-body text-center">

                                                        <h6 className="text-muted">
                                                            Outstanding Balance
                                                        </h6>

                                                        <h4 className="fw-bold text-primary">

                                                            ₹{
                                                                Number(
                                                                    loanSummary.balanceAmount
                                                                ).toLocaleString()
                                                            }

                                                        </h4>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-md-4">

                                                <div className="card border-0 shadow-sm">

                                                    <div className="card-body text-center">

                                                        <h6 className="text-muted">
                                                            EMI Amount
                                                        </h6>

                                                        <h4 className="fw-bold text-success">

                                                            ₹{
                                                                Number(
                                                                    loanSummary.emiAmount
                                                                ).toLocaleString()
                                                            }

                                                        </h4>

                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-md-4">

                                                <div className="card border-0 shadow-sm">

                                                    <div className="card-body text-center">

                                                        <h6 className="text-muted">
                                                            Next Due Date
                                                        </h6>

                                                        <h4 className="fw-bold text-danger">

                                                            {
                                                                loanSummary.nextDueDate
                                                            }

                                                        </h4>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    )
                                }

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        Repayment Amount


                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter repayment amount"
                                        value={
                                            repaymentAmount
                                        }
                                        onChange={(e) =>
                                            setRepaymentAmount(
                                                e.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label
                                        className="form-label"
                                    >
                                        Payment Mode
                                    </label>

                                    <select
                                        className="form-select"
                                        value={
                                            paymentMode
                                        }
                                        onChange={(e) =>
                                            setPaymentMode(
                                                e.target.value
                                            )
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Payment Mode
                                        </option>

                                        <option value="UPI">
                                            UPI
                                        </option>

                                        <option value="NET_BANKING">
                                            NET BANKING
                                        </option>

                                        <option value="CASH">
                                            CASH
                                        </option>

                                    </select>

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-3"
                                >
                                    Repay Loan
                                </button>

                            </form>

                        </div>

                    </div>
                    <div className="card mt-4">

                        <div className="card-header">

                            <h5 className="mb-0">
                                My Repayment History
                            </h5>

                        </div>

                        <div className="card-body">

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead>

                                        <tr>

                                            <th>
                                                Repayment ID
                                            </th>

                                            <th>
                                                Loan ID
                                            </th>

                                            <th>
                                                Amount
                                            </th>

                                            <th>
                                                Payment Mode
                                            </th>

                                            <th>
                                                Repayment Date
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            repayments.length > 0 ?

                                                repayments.map(
                                                    repayment => (

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
                                                                    repayment.loanId
                                                                }
                                                            </td>

                                                            <td>
                                                                ₹
                                                                {
                                                                    Number(
                                                                        repayment.repaymentAmount
                                                                    ).toLocaleString()
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

                                                        </tr>

                                                    )
                                                )

                                                :

                                                <tr>

                                                    <td
                                                        colSpan="5"
                                                        className="text-center"
                                                    >
                                                        No repayments found
                                                    </td>

                                                </tr>

                                        }

                                    </tbody>

                                </table>
                                <nav
                                    aria-label="Page navigation example"
                                    className="mt-4"
                                >

                                    <ul className="pagination justify-content-center">

                                        <li className="page-item">

                                            <button
                                                className="page-link"
                                                disabled={page === 0}
                                                onClick={() =>
                                                    setPage(page - 1)
                                                }
                                            >
                                                Previous
                                            </button>

                                        </li>

                                        {
                                            Array.from(
                                                { length: totalPages }
                                            ).map((_, index) => (

                                                <li
                                                    key={index}
                                                    className="page-item"
                                                >

                                                    <button
                                                        className="page-link"
                                                        onClick={() =>
                                                            setPage(index)
                                                        }
                                                    >
                                                        {count=count + 1}
                                                    </button>

                                                </li>

                                            ))
                                        }

                                        <li className="page-item">

                                            <button
                                                className="page-link"
                                                disabled={
                                                    page === totalPages - 1
                                                }
                                                onClick={() =>
                                                    setPage(page + 1)
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
                                        Repayment Successful
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Your loan repayment
                                        has been processed
                                        successfully.
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {

                                            setShowSuccessModal(
                                                false
                                            );

                                            navigate(
                                                "/customer/loans"
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

export default CustomerLoanRepayment;