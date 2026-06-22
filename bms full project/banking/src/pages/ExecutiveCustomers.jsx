import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";
import "../styles/executive-common.css";
import { useNavigate } from "react-router-dom";

const ExecutiveCustomers = () => {

    const navigate = useNavigate();

    const [customers, setCustomers] =
        useState([]);

    const [searchId, setSearchId] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const pageSize = 5;
    let count = 0;


    const getCustomers =
        async () => {

            try {

                const config = {

                    headers: {

                        Authorization:
                            "Bearer " +
                            localStorage.getItem(
                                "token"
                            )

                    }

                };

                const response = await axios.get(
                    `http://localhost:8080/api/customer/Admin/getAll?page=${currentPage}&size=${pageSize}`,
                    config
                );

                setCustomers(
                    response.data.data
                );
                setTotalPages(response.data.totalPages)

            }
            catch (err) {

                console.log(
                    err?.response
                );

            }

        };

    const searchCustomer =
        async () => {

            if (
                searchId === ""
            ) {

                getCustomers();

                return;

            }

            try {

                const config = {

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

                        `http://localhost:8080/api/customer/Admin/getById/${searchId}`,

                        config

                    );

                setCustomers(
                    [
                        response.data
                    ]
                );

                setCurrentPage(0);
            }
            catch (err) {

                console.log(err);

                if (err.response?.status === 404) {
                    alert("Customer Not Found");
                } else {
                    alert("Something Went Wrong");
                }

            }

        };

    useEffect(() => {
        getCustomers();
    }, [currentPage]);
    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />
                <div className="container-fluid p-4">
                    <div className="page-header mb-4 d-flex justify-content-between align-items-center">

                        <div>
                            <h1 className="page-title">
                                Customer Management
                            </h1>

                            <p className="page-subtitle">
                                View, search and manage customer records
                            </p>
                        </div>

                        <button
                            className="btn btn-success px-4"
                            onClick={() =>
                                navigate("/executive/addCustomer")
                            }
                        >
                            + Add Customer
                        </button>

                    </div>


                    <div className="card account-request-card">

                        <div
                            className="card-body"
                        >

                            <h5 className="section-heading mb-3">
                                Search Customer
                            </h5>
                            <div
                                className="row"
                            >


                                <div
                                    className="col-md-9"
                                >

                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Search By Customer ID"
                                        value={searchId}
                                        onChange={(e) => {

                                            const value = e.target.value;

                                            setSearchId(value);

                                            if (value === "") {
                                                getCustomers();
                                            }
                                        }}
                                    />

                                </div>

                                <div
                                    className="col-md-3"
                                >

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={
                                            searchCustomer
                                        }
                                    >
                                        Search
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div
                        className="card mt-4"
                    >

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Customer Directory
                            </h3>

                            <p className="form-subtitle">
                                All registered customers in the banking system
                            </p>

                        </div>

                        <div
                            className="card-body"
                        >

                            <table
                                className="table accounts-table"
                            >

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            First Name
                                        </th>

                                        <th>
                                            Last Name
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        customers.map(

                                            customer => (

                                                <tr
                                                    key={
                                                        customer.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            customer.id
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            customer.firstName
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            customer.lastName
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            customer.email
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            customer.phoneNumber
                                                        }
                                                    </td>

                                                    <td>

                                                        <button
                                                            className="btn btn-outline-primary btn-sm me-2"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/executive/customer/${customer.id}`
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </button>

                                                        <button
                                                            className="btn btn-outline-warning btn-sm"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/executive/updateCustomer/${customer.id}`
                                                                )
                                                            }
                                                        >
                                                            Update
                                                        </button>

                                                    </td>

                                                </tr>

                                            )

                                        )

                                    }

                                </tbody>

                            </table>

                            <nav aria-label="Page navigation example">

                                <ul className="pagination justify-content-center">

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            disabled={currentPage === 0}
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            Previous
                                        </button>
                                    </li>

                                    {

                                        Array.from({ length: totalPages }).map((_, index) => (
                                            <li key={index} className="page-item">

                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(index)}
                                                >
                                                    {count = count + 1}
                                                </button>
                                            </li>
                                        ))
                                    }

                                    <li className="page-item">
                                        <button
                                            className="page-link"
                                            disabled={currentPage === totalPages - 1}
                                            onClick={() => setCurrentPage(currentPage + 1)}
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

export default ExecutiveCustomers;