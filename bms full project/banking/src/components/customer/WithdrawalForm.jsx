import { useEffect, useState } from "react";
import axios from "axios";

const WithdrawalForm = () => {

    const [accounts, setAccounts] = useState([]);

    const [accountId, setAccountId] = useState("");

    const [amount, setAmount] = useState("");

    const [description, setDescription] = useState("");

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const myAccountsApi = "http://localhost:8080/api/account/my-accounts";

    const withdrawalApi = "http://localhost:8080/api/transaction/withdrawal";

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
                            `${myAccountsApi}?page=0&size=100`,
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

    const handleWithdrawal =
        async (e) => {

            e.preventDefault();

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

                await axios.post(

                    withdrawalApi,

                    {

                        accountId,

                        amount,

                        description

                    },

                    config_details

                );

                setShowSuccessModal(
                    true
                );
                setAccountId("")
                setAmount("");
                setDescription("");

            }
            catch (err) {

                console.error(err);
console.log(err.response.data);
                setErrorMessage(
    err.response.data.message || "Withdrawal Failed"
);
                setShowErrorModal(true);

            }

        };

    return (

        <div className="card">

            <div className="card-header">

                <h4>
                    Withdraw Money
                </h4>

            </div>

            <div className="card-body">

                <form
                    onSubmit={
                        handleWithdrawal
                    }
                >

                    <div className="mb-3">

                        <label className="form-label">
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
                            required
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

                        <label className="form-label">
                            Amount
                        </label>

                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) =>
                                setAmount(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            required
                        />

                    </div>

                    <button
                        className="btn btn-warning"
                    >
                        Withdraw
                    </button>

                </form>

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
                                        Withdrawal Successful
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Amount withdrawn successfully.
                                    </p>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            setShowSuccessModal(
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
                            Withdrawal Failed
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

export default WithdrawalForm;