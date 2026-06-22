import { useEffect, useState } from "react";
import axios from "axios";

const TransferForm = () => {

    const [accounts, setAccounts] = useState([]);

    const [beneficiaries, setBeneficiaries] = useState([]);

    const [accountId, setAccountId] = useState("");

    const [beneficiaryId, setBeneficiaryId] = useState("");

    const [amount, setAmount] = useState("");

    const [description, setDescription] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [showErrorModal, setShowErrorModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const myAccountsApi =
        "http://localhost:8080/api/account/my-accounts";

    const beneficiariesApi =
        "http://localhost:8080/api/beneficiary/all";

    const transferApi =
        "http://localhost:8080/api/transaction/transfer";

    useEffect(() => {

        const config_details = {

            headers: {

                Authorization:
                    "Bearer " +
                    localStorage.getItem(
                        "token"
                    )

            }

        };

        const getAccounts =
            async () => {

                const response =
                    await axios.get(

                        `${myAccountsApi}?page=0&size=100`,

                        config_details

                    );

                setAccounts(
                    response.data.data
                );

            };

        const getBeneficiaries =
            async () => {

                console.log("TOKEN =>",
                    localStorage.getItem("token")
                );
                const response =
                    await axios.get(

                        beneficiariesApi,

                        config_details

                    );

                setBeneficiaries(
                    response.data
                );

            };

        getAccounts();

        getBeneficiaries();

    }, []);

    const handleTransfer =
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

                    transferApi,

                    {

                        accountId,

                        beneficiaryId,

                        amount,

                        description

                    },

                    config_details

                );

                setShowSuccessModal(
                    true
                );

                setAccountId("");
                setBeneficiaryId("");
                setAmount("");

                setDescription("");

            }
            catch (err) {

                console.error(err);

                setErrorMessage(
                    err.response.data.message ||
                    "Transfer Failed"
                );

                setShowErrorModal(
                    true
                );

            }
        };

    return (

        <div className="card">

            <div className="card-header">

                <h4>
                    Fund Transfer
                </h4>

            </div>

            <div className="card-body">

                <form
                    onSubmit={
                        handleTransfer
                    }
                >

                    <div className="mb-3">

                        <label
                            className="form-label"
                        >
                            From Account
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

                                        </option>

                                    )
                                )
                            }

                        </select>

                    </div>

                    <div className="mb-3">

                        <label
                            className="form-label"
                        >
                            Beneficiary
                        </label>

                        <select
                            className="form-select"
                            value={beneficiaryId}
                            onChange={(e) =>
                                setBeneficiaryId(
                                    e.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Select Beneficiary
                            </option>

                            {
                                beneficiaries.map(
                                    beneficiary => (

                                        <option
                                            key={
                                                beneficiary.id
                                            }
                                            value={
                                                beneficiary.id
                                            }
                                        >

                                            {
                                                beneficiary.name
                                            }
                                            {" - "}
                                            {
                                                beneficiary.accountNumber
                                            }

                                        </option>

                                    )
                                )
                            }

                        </select>

                    </div>

                    <div className="mb-3">

                        <label
                            className="form-label"
                        >
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

                        <label
                            className="form-label"
                        >
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
                        className="btn btn-success"
                    >
                        Transfer
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
                                        Transfer Successful
                                    </h5>

                                </div>

                                <div className="modal-body">

                                    <p>
                                        Funds have been transferred successfully.
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
                                        Transfer Failed
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

export default TransferForm;