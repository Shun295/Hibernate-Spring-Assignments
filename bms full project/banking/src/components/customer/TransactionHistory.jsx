import { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = () => {

    const [accounts, setAccounts] = useState([]);

    const [accountId, setAccountId] = useState("");

    const [transactions, setTransactions] = useState([]);

    const [referenceNumber, setReferenceNumber] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);
    let count = 0;

    const myAccountsApi = "http://localhost:8080/api/account/my-accounts";

    useEffect(() => {

        const getAccounts =
            async () => {

                try {

                    const config_details = {

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

                            `${myAccountsApi}?page=0&size=10`,

                            config_details

                        );

                    setAccounts(
                        response.data.data
                    );

                }
                catch (err) {

                    console.log(
                        err?.response
                    );

                }

            };

        getAccounts();

    }, []);

    useEffect(() => {

        if (!accountId) {

            return;

        }

        const getHistory =
            async () => {

                try {

                    const config_details = {

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

                            `http://localhost:8080/api/transaction/history/${accountId}?page=${page}&size=10`,

                            config_details

                        );

                    setTransactions(
                        response.data.data
                    );
                    console.log(response.data.data);

                    setTotalPages(
                        response.data.totalPages
                    );

                }
                catch (err) {

                    console.log(
                        err?.response
                    );

                }

            };

        getHistory();

    }, [accountId, page]);

    const applyFilters = async (pageNo = 0) => {

        if (!accountId) {
            alert("Please select an account");
            return;
        }

        try {

            const config_details = {

                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }

            };

            const response = await axios.get(

                `http://localhost:8080/api/transaction/customer/filter/${accountId}?referenceNumber=${referenceNumber || ""}&type=${type || ""}&status=${status || ""}&page=${pageNo}&size=10`,

                config_details

            );

            setTransactions(
                response.data.data
            );

            setTotalPages(
                response.data.totalPages
            );

            setPage(
                pageNo
            );

        }
        catch (err) {

            console.log(
                err?.response
            );

        }

    };

    const resetFilters = () => {

        setReferenceNumber("");
        setType("");
        setStatus("");

        setPage(0);

        if (accountId) {

            const getHistory = async () => {

                try {

                    const config_details = {
                        headers: {
                            Authorization:
                                "Bearer " +
                                localStorage.getItem("token")
                        }
                    };

                    const response = await axios.get(
                        `http://localhost:8080/api/transaction/history/${accountId}?page=0&size=10`,
                        config_details
                    );

                    setTransactions(
                        response.data.data
                    );

                    setTotalPages(
                        response.data.totalPages
                    );

                }
                catch (err) {

                    console.log(
                        err?.response
                    );

                }

            };

            getHistory();

        }

    };
    return (

        <div className="card">

            <div className="card-header">

                <h4>
                    Transaction History
                </h4>

            </div>

            <div className="card-body">

                <div className="mb-3">

                    <label
                        className="form-label"
                    >
                        Account
                    </label>

                    <select
                        className="form-select"
                        value={accountId}
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
                            accounts.map(
                                account => (

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

                                    </option>

                                )
                            )
                        }

                    </select>

                </div>
                <div className="row mb-3">

                    <div className="col-md-4">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Reference Number"
                            value={referenceNumber}
                            onChange={(e) =>
                                setReferenceNumber(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    <div className="col-md-3">

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
                                All Types
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
                                All Status
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

                    <div className="col-md-2 d-flex gap-2">

    <button
        className="btn btn-primary flex-fill"
        onClick={() => applyFilters(0)}
    >
        Search
    </button>

    <button
        className="btn btn-secondary flex-fill"
        onClick={resetFilters}
    >
        Reset
    </button>

</div>
                </div>

                <table className="table table-bordered">

                    <thead>

                        <tr>

                            <th>
                                Reference
                            </th>

                            <th>
                                Type
                            </th>

                            <th>
                                Entry
                            </th>

                            <th>
                                Amount
                            </th>

                            <th>
                                Description
                            </th>

                            <th>
                                Balance
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Date
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            transactions.length > 0 ?

                                transactions.map(
                                    txn => (

                                        <tr
                                            key={
                                                txn.id
                                            }
                                        >

                                            <td>
                                                {
                                                    txn.referenceNumber
                                                }
                                            </td>

                                            <td>
                                                {
                                                    txn.transactionType
                                                }
                                            </td>

                                            <td>
                                                {
                                                    txn.entryType
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    txn.amount
                                                }
                                            </td>

                                            <td>
                                                {
                                                    txn.description
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    txn.balanceAfterTxn
                                                }
                                            </td>

                                            <td>
                                                {
                                                    txn.transactionStatus
                                                }
                                            </td>

                                            <td>
                                                {
                                                    txn.transactionDate
                                                }
                                            </td>

                                        </tr>

                                    )
                                )

                                :

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center"
                                    >
                                        No Transactions
                                    </td>

                                </tr>
                        }

                    </tbody>

                </table>

                <nav aria-label="Page navigation example" className="mt-4">

                    <ul className="pagination justify-content-center">

                        <li className="page-item">

                            <button
                                className="page-link"
                                disabled={page === 0}
                                onClick={() => setPage(page - 1)}
                            >
                                Previous
                            </button>

                        </li>

                        {
                            Array.from({ length: totalPages }).map((_, index) => (

                                <li
                                    key={index}
                                    className="page-item"
                                >

                                    <button
                                        className="page-link"
                                        onClick={() => {

                                            if (referenceNumber || type || status
                                            ) { applyFilters(index); }
                                            else { setPage(index); }
                                        }}
                                    >
                                        {count = count + 1}
                                    </button>

                                </li>

                            ))
                        }

                        <li className="page-item">

                            <button
                                className="page-link"
                                disabled={page === totalPages - 1}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>

                        </li>

                    </ul>

                </nav>

            </div>

        </div>

    );

};

export default TransactionHistory;