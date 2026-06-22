const TransactionMonitoringHistory = ({
    transactions,
    page,
    totalPages,
    getTransactionHistory,
    onView
}) => {


    return (

        <div className="card mt-4 shadow-sm">

            <div className="card-header">

                <h4>
                    All Transactions
                </h4>

            </div>

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-hover">

                        <thead className="table-light">

                            <tr>
                                <th>
                                    ID
                                </th>

                                <th>
                                    Reference Number
                                </th>

                                <th>
                                    Account Number
                                </th>

                                <th>
                                    Transaction Type
                                </th>

                                <th>
                                    Amount
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Action
                                </th>

                            </tr>

                        </thead>
<tbody>
{
    transactions.length > 0 ?

    transactions.map(transaction => {

        console.log("id =", transaction.id);

        return (
            <tr key={transaction.id}>

                <td>
                    <strong>
                        {transaction.id}
                    </strong>
                </td>
                <td>
                    <strong>
                        {transaction.referenceNumber}
                    </strong>
                </td>

                <td>{transaction.accountNumber}</td>

                <td>{transaction.transactionType}</td>

                <td className="balance-cell">
                    ₹{Number(transaction.amount).toLocaleString()}
                </td>

                <td>
                    <span
                        className={
                            transaction.transactionStatus === "SUCCESS"
                                ? "status-badge active"
                                : "status-badge rejected"
                        }
                    >
                        {transaction.transactionStatus}
                    </span>
                </td>

                <td>
                    {new Date(
                        transaction.transactionDate
                    ).toLocaleString()}
                </td>

                <td>
                    <button
    className="btn btn-outline-primary"
    onClick={() =>
        onView(transaction.id)
    }
>
    View
</button>
                </td>

            </tr>
        );
    })

    :

    <tr>
        <td colSpan="7" className="text-center">
            No Transactions Found
        </td>
    </tr>
}
</tbody>
                    </table>

                </div>

                 <nav aria-label="Page navigation example" className="mt-4">

                    <ul className="pagination justify-content-center">

                        <li className="page-item">

                            <button
                                className="page-link"
                                disabled={page === 0}
                                onClick={() =>getTransactionHistory(page - 1)}
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
                                        onClick={() => getTransactionHistory(index)}
                                    >
                                        {index+1}
                                    </button>

                                </li>

                            ))
                        }

                        <li className="page-item">

                            <button
                                className="page-link"
                                disabled={page === totalPages - 1}
                                onClick={() => getTransactionHistory(page + 1)}
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

export default TransactionMonitoringHistory;
