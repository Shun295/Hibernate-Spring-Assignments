import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const AdminCustomerDetails = () => {

    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [accountPage, setAccountPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
 
    let count=0;
    useEffect(() => {

        loadCustomer();
        loadAccounts(accountPage);
    }, [accountPage]);
    const config = {
        headers: {
            Authorization:
                "Bearer " + localStorage.getItem("token")
        }
    };

    const loadCustomer =
        async () => {

            try {

                const response =
                    await axios.get(
                        `http://localhost:8080/api/customer/Admin/getById/${customerId}`,
                        config
                    );
                setCustomer(response.data);
            }
            catch (err) {

                console.error(err)
            }

        };

    const loadAccounts = async (page) => {

        try {

            const response =
                await axios.get(

                    `http://localhost:8080/api/account/customer/${customerId}?page=${page}&size=5`,

                    config

                );

            setAccounts(
                response.data.data
            );

            setTotalPages(
                response.data.totalPages
            );

        }
        catch (err) {

            console.error(err)

        }

    };

    //Take all elements in an array and reduce them into a single value.
    const totalBalance = accounts.reduce(
        (sum, account) => sum +
            Number(account.balance), 0);

    const activeAccounts =
        accounts.filter(
            account =>
                account.accountStatus === "ACTIVE" ).length;
    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <h1>
                        Customer Details
                    </h1>
                    <div className="row mb-4">

                        <div className="col-md-4">

                            <div className="card bg-primary text-white">

                                <div className="card-body">

                                    <h5>
                                        Accounts
                                    </h5>

                                    <h2>
                                        {
                                            accounts.length
                                        }
                                    </h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card bg-success text-white">

                                <div className="card-body">

                                    <h5>
                                        Total Balance
                                    </h5>

                                    <h2>

                                        ₹
                                        {
                                            totalBalance
                                        }

                                    </h2>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card bg-info text-white">

                                <div className="card-body">

                                    <h5>
                                        Active Accounts
                                    </h5>

                                    <h2>

                                        {
                                            activeAccounts
                                        }

                                    </h2>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card mt-4">

                        <div className="card-header">

                            <h4>
                                Customer Information
                            </h4>

                        </div>

                        <div className="card-body">

                            <div className="row">

                                <div className="col-md-6">

                                    <p>

                                        <strong>
                                            ID :
                                        </strong>

                                        {" "}
                                        {customer?.id}

                                    </p>

                                    <p>

                                        <strong>
                                            Username :
                                        </strong>

                                        {" "}
                                        {customer?.username}

                                    </p>

                                    <p>

                                        <strong>
                                            First Name :
                                        </strong>

                                        {" "}
                                        {customer?.firstName}

                                    </p>

                                    <p>

                                        <strong>
                                            Last Name :
                                        </strong>

                                        {" "}
                                        {customer?.lastName}

                                    </p>

                                    <p>

                                        <strong>
                                            Gender :
                                        </strong>

                                        {" "}
                                        {customer?.gender}

                                    </p>

                                </div>

                                <div className="col-md-6">

                                    <p>

                                        <strong>
                                            Email :
                                        </strong>

                                        {" "}
                                        {customer?.email}

                                    </p>

                                    <p>

                                        <strong>
                                            Phone :
                                        </strong>

                                        {" "}
                                        {customer?.phoneNumber}

                                    </p>

                                    <p>

                                        <strong>
                                            DOB :
                                        </strong>

                                        {" "}
                                        {customer?.dateOfBirth}

                                    </p>

                                    <p>

                                        <strong>
                                            PAN :
                                        </strong>

                                        {" "}
                                        {customer?.panNumber}

                                    </p>

                                    <p>

                                        <strong>
                                            Aadhar :
                                        </strong>

                                        {" "}
                                        {customer?.aadharNumber}

                                    </p>

                                </div>

                            </div>

                            <hr />

                            <p>

                                <strong>
                                    Address :
                                </strong>

                                {" "}
                                {customer?.address}

                            </p>

                        </div>

                    </div>

                    <div className="card mt-4">

                        <div className="card-header">

                            <h4>
                                Accounts
                            </h4>

                        </div>

                        <div className="card-body">

                            <table
                                className="table table-bordered"
                            >

                                <thead>

                                    <tr>

                                        <th>
                                            Account Number
                                        </th>

                                        <th>
                                            Balance
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Type
                                        </th>

                                        <th>
                                            Branch
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        accounts.map(

                                            account => (

                                                <tr
                                                    key={
                                                        account.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            account.accountNumber
                                                        }
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {
                                                            account.balance
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            account.accountStatus
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            account.accountType
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            account.branchName
                                                        }
                                                    </td>

                                                </tr>

                                            )

                                        )
                                    }

                                </tbody>

                            </table>

                            <nav aria-label="Page navigation example" className="mt-4">

                                <ul className="pagination justify-content-center">

                                    <li className="page-item">

                                        <button
                                            className="page-link"
                                            disabled={accountPage === 0}
                                            onClick={() =>
                                                setAccountPage(accountPage - 1)
                                            }
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
                                                    onClick={() =>
                                                        setAccountPage(index)
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
                                                accountPage === totalPages - 1
                                            }
                                            onClick={() =>
                                                setAccountPage(accountPage + 1)
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

    );

};

export default AdminCustomerDetails;