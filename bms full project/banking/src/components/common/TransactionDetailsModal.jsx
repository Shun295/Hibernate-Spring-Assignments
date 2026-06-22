const TransactionDetailsModal = ({
    transaction,
    closeModal
}) => {

    if (!transaction)
        return null;

    return (

        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{
                backgroundColor:
                    "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h4>
                            Transaction Details
                        </h4>

                        <button
                            className="btn-close"
                            onClick={
                                closeModal
                            }
                        />

                    </div>

                    <div className="modal-body">

                        <div className="row">

                            <div className="col-md-6">

                                <p>
                                    <strong>
                                        Reference Number:
                                    </strong>

                                    <br />

                                    {
                                        transaction.referenceNumber
                                    }
                                </p>

                            </div>

                            <div className="col-md-6">

                                <p>
                                    <strong>
                                        Transaction Type:
                                    </strong>

                                    <br />

                                    {
                                        transaction.transactionType
                                    }
                                </p>

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6">

                                <p>
                                    <strong>
                                        Entry Type:
                                    </strong>

                                    <br />

                                    {
                                        transaction.entryType
                                    }
                                </p>

                            </div>

                            <div className="col-md-6">

                                <p>
                                    <strong>
                                        Status:
                                    </strong>

                                    <br />

                                    {
                                        transaction.transactionStatus
                                    }
                                </p>

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6">

                                <p>
                                    <strong>
                                        Amount:
                                    </strong>

                                    <br />

                                    ₹
                                    {
                                        transaction.amount
                                    }
                                </p>

                            </div>

                            <div className="col-md-6">

                                <p>
                                    <strong>
                                        Balance After Transaction:
                                    </strong>

                                    <br />

                                    ₹
                                    {
                                        transaction.balanceAfterTxn
                                    }
                                </p>

                            </div>

                        </div>

                        <hr />

                        <h5>
                            Beneficiary Details
                        </h5>

                        <p>

                            <strong>
                                Beneficiary Name:
                            </strong>

                            <br />

                            {
                                transaction.beneficiaryName ||
                                "N/A"
                            }

                        </p>

                        <p>

                            <strong>
                                Beneficiary Account:
                            </strong>

                            <br />

                            {
                                transaction.beneficiaryAccountNumber ||
                                "N/A"
                            }

                        </p>

                        <hr />

                        <p>

                            <strong>
                                Description:
                            </strong>

                            <br />

                            {
                                transaction.description
                            }

                        </p>

                        <p>

                            <strong>
                                Transaction Date:
                            </strong>

                            <br />

                            {
                                new Date(
                                    transaction.transactionDate
                                ).toLocaleString()
                            }

                        </p>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={
                                closeModal
                            }
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default TransactionDetailsModal;