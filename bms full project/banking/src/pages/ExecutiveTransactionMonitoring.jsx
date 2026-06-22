import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";
import TransactionMonitoringHistory from "../components/executive/TransactionMonitoringHistory";
import TransactionDetailsModal from "../components/common/TransactionDetailsModal";

import { useEffect, useState } from "react";
import axios from "axios";

const ExecutiveTransactionMonitoring = () => {

    const [transactions, setTransactions] = useState([]);
    const [referenceNumber, setReferenceNumber] = useState("");

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");

    const [selectedTransaction, setSelectedTransaction] =
        useState(null);

    useEffect(() => {

        getTransactions(0);

    }, []);

    const getTransactions = async (pageNo = 0) => {

        try {

            const config = {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            };

            const response = await axios.get(
                `http://localhost:8080/api/transaction/all?page=${pageNo}&size=5`,
                config
            );

            setTransactions(response.data.data);
            setPage(pageNo);
            setTotalPages(response.data.totalPages);

        }
        catch (err) {

            console.log(err?.response);

        }

    };

   const viewTransaction = async (id) => {

    console.log("Sending ID:", id);

    try {

        const config = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        const response = await axios.get(
            `http://localhost:8080/api/transaction/details/${id}`,
            config
        );

        setSelectedTransaction(
            response.data
        );

    }
    catch (err) {

        console.log(
            "Status:",
            err?.response?.status
        );

        console.log(
            "Data:",
            err?.response?.data
        );

    }

};

    const applyFilters = async (pageNo = 0) => {

        try {

            const config = {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            };

            const response = await axios.get(
                `http://localhost:8080/api/transaction/filter?startDate=${startDate || ""}&endDate=${endDate || ""}&type=${type || ""}&status=${status || ""}&page=${pageNo}&size=5`,
                config
            );

            setTransactions(response.data.data);
            setPage(pageNo);
            setTotalPages(response.data.totalPages);

        }
        catch (err) {

            console.log(err?.response);

        }

    };

    const resetFilters = () => {

        setStartDate("");
        setEndDate("");
        setType("");
        setStatus("");

        getTransactions(0);

    };

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Transaction Monitoring
                        </h1>

                        <p className="page-subtitle">
                            Monitor all banking transactions
                        </p>

                    </div>

                    {/* Search Transaction */}

                    <div className="card account-request-card mb-4">

                        <div className="card-body">

                            <h5 className="section-heading mb-3">
                                Search Transaction
                            </h5>

                            <div className="row">

                                <div className="col-md-10">

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter the ID"
                                        value={referenceNumber}
                                        onChange={(e) =>
                                            setReferenceNumber(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-md-2">

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() =>
                                            viewTransaction(
                                                referenceNumber
                                            )
                                        }
                                    >
                                        Search
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Filter Transaction */}

                    <div className="card account-request-card mb-4">

                        <div className="card-body">

                            <h5 className="section-heading mb-3">
                                Filter Transactions
                            </h5>

                            <div className="row">

                                <div className="col-md-3">

                                    <label>
                                        Start Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={startDate}
                                        onChange={(e) =>
                                            setStartDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-md-3">

                                    <label>
                                        End Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        value={endDate}
                                        onChange={(e) =>
                                            setEndDate(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-md-3">

                                    <label>
                                        Transaction Type
                                    </label>

                                    <select
                                        className="form-select"
                                        value={type}
                                        onChange={(e) =>
                                            setType(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            All
                                        </option>

                                        <option value="DEPOSIT">
                                            Deposit
                                        </option>

                                        <option value="WITHDRAWAL">
                                            Withdrawal
                                        </option>

                                        <option value="TRANSFER">
                                            Transfer
                                        </option>

                                    </select>

                                </div>

                                <div className="col-md-3">

                                    <label>
                                        Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={status}
                                        onChange={(e) =>
                                            setStatus(
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">
                                            All
                                        </option>

                                        <option value="SUCCESS">
                                            Success
                                        </option>

                                        <option value="FAILED">
                                            Failed
                                        </option>

                                        <option value="PENDING">
                                            Pending
                                        </option>

                                    </select>

                                </div>

                            </div>

                            <div className="row mt-3">

                                <div className="col-md-6">

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={() =>
                                            applyFilters(0)
                                        }
                                    >
                                        Apply Filters
                                    </button>

                                </div>

                                <div className="col-md-6">

                                    <button
                                        className="btn btn-secondary w-100"
                                        onClick={resetFilters}
                                    >
                                        Reset
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    <TransactionMonitoringHistory
                        transactions={transactions}
                        page={page}
                        totalPages={totalPages}
                        getTransactionHistory={
                            startDate ||
                            endDate ||
                            status ||
                            type
                                ? applyFilters
                                : getTransactions
                        }
                        onView={viewTransaction}
                    />

                </div>

            </div>

            {
                selectedTransaction && (

                    <TransactionDetailsModal
                        transaction={selectedTransaction}
                        closeModal={() =>
                            setSelectedTransaction(
                                null
                            )
                        }
                    />

                )
            }

        </div>

    );

};

export default ExecutiveTransactionMonitoring;