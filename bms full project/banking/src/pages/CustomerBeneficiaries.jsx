import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";

import { useState, useEffect } from "react";
import axios from "axios";

const CustomerBeneficiaries = () => {

    const [beneficiaries, setBeneficiaries] = useState([]);

    const [name, setName] = useState("");

    const [accountNumber, setAccountNumber] = useState("");

    const [ifscCode, setIfscCode] = useState("");

    const [description, setDescription] = useState("");

    const [successMsg, setSuccessMsg] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const addApi =
        "http://localhost:8080/api/beneficiary/add";

    const getApi =
        "http://localhost:8080/api/beneficiary/all";

    const config_details = {

        headers: {

            Authorization:
                "Bearer " +
                localStorage.getItem(
                    "token"
                )

        }

    };

    const getBeneficiaries =
        async () => {

            try {

                const response =
                    await axios.get(
                        getApi,
                        config_details
                    );

                setBeneficiaries(
                    response.data
                );

            }
            catch (err) {

                console.error(err)

            }

        };

    useEffect(() => {

        getBeneficiaries();

    }, []);

    const addBeneficiary =
        async (e) => {

            e.preventDefault();

            setSuccessMsg("");
            setErrorMsg("");

            try {

                await axios.post(

                    addApi,
                    {
                        name,
                        accountNumber,
                        ifscCode,
                        description
                    },
                    config_details
                );

                setSuccessMsg(
                    "Beneficiary Added Successfully"
                );

                setName("");
                setAccountNumber("");
                setIfscCode("");
                setDescription("");

                getBeneficiaries();

            }
            catch (err) {

                console.log(
                    err?.response
                );

                setErrorMsg(

                    err?.response?.data?.message ||

                    "Failed To Add Beneficiary"

                );

            }

        };

    const deactivateBeneficiary =
        async (beneficiaryId) => {

            try {

                await axios.put(

                    `http://localhost:8080/api/beneficiary/deactivate/${beneficiaryId}`,

                    {},

                    config_details

                );

                setSuccessMsg(
                    "Beneficiary Deactivated"
                );

                getBeneficiaries();

            }
            catch (err) {

                console.log(
                    err?.response
                );

                setErrorMsg(
                    "Unable To Deactivate Beneficiary"
                );

            }

        };

    const activateBeneficiary =
        async (beneficiaryId) => {

            try {

                await axios.put(

                    `http://localhost:8080/api/beneficiary/activate/${beneficiaryId}`,

                    {},

                    config_details

                );

                getBeneficiaries();

            }
            catch (err) {

                console.log(
                    err?.response
                );

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
                            Beneficiary Management
                        </h1>

                        <p className="page-subtitle">
                            Add, manage and activate beneficiaries for fund transfers
                        </p>

                    </div>

                    {
                        successMsg &&

                        <div className="alert alert-success">

                            {successMsg}

                        </div>
                    }

                    {
                        errorMsg &&

                        <div className="alert alert-danger">

                            {errorMsg}

                        </div>
                    }

                    <div className="card account-request-card">
                        <div className="card-header bg-white border-0 pt-4 px-4">

                            <h3 className="form-title">
                                Add New Beneficiary
                            </h3>

                            <p className="form-subtitle">
                                Enter beneficiary account details for future transfers
                            </p>

                        </div>

                        <div className="card-body">

                            <form
                                onSubmit={
                                    addBeneficiary
                                }
                            >

                                <div className="mb-3">


                                    <label
                                        className="form-label"
                                    >
                                        Beneficiary Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) =>
                                            setName(
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
                                        Account Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={accountNumber}
                                        onChange={(e) =>
                                            setAccountNumber(
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
                                        IFSC Code
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={ifscCode}
                                        onChange={(e) =>
                                            setIfscCode(
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
                                    className="btn btn-success w-100 py-3"
                                >
                                    Add Beneficiary
                                </button>

                            </form>

                        </div>

                    </div>

                    <div className="table-card mt-4">

                        <div className="card-header">

                            <h3 className="form-title">
                                My Beneficiaries
                            </h3>

                        </div>

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Name</th>

                                        <th>
                                            Account Number
                                        </th>

                                        <th>
                                            IFSC Code
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        beneficiaries.length > 0 ?

                                            beneficiaries.map(

                                                beneficiary => (

                                                    <tr
                                                        key={
                                                            beneficiary.id
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                beneficiary.id
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                beneficiary.name
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                beneficiary.accountNumber
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                beneficiary.ifscCode
                                                            }
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={
                                                                    beneficiary.beneficiaryStatus === "ACTIVE"
                                                                        ? "status-badge active"
                                                                        : "status-badge closed"
                                                                }
                                                            >
                                                                {beneficiary.beneficiaryStatus}
                                                            </span>
                                                        </td>

                                                        <td>

                                                            {
                                                                beneficiary.beneficiaryStatus ===
                                                                    "ACTIVE" ?

                                                                    <button
                                                                        className="btn btn-outline-danger btn-sm"
                                                                        onClick={() =>
                                                                            deactivateBeneficiary(
                                                                                beneficiary.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Deactivate
                                                                    </button>

                                                                    :

                                                                    <button
                                                                        className="btn btn-outline-success btn-sm"
                                                                        onClick={() =>
                                                                            activateBeneficiary(
                                                                                beneficiary.id
                                                                            )
                                                                        }
                                                                    >
                                                                        Activate
                                                                    </button>
                                                            }

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
                                                    No Beneficiaries Found
                                                </td>

                                            </tr>

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default CustomerBeneficiaries;