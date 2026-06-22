import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AdminCustomers = () => {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);

    const [searchUsername,setSearchUsername] =useState("");
   
    const [totalPages,setTotalPages] =useState(0);
    const [page,setPage] = useState(0);
    let count=0;
    const getAllApi ="http://localhost:8080/api/customer/Admin/getAll";

    const searchApi ="http://localhost:8080/api/customer/Admin/username/";

    //Set pageNo to 0 by default when no argument is passed to the function
    const getCustomers =
        async (pageNo = 0) => {
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
                const response =await axios.get(
                        `${getAllApi}?page=${pageNo}&size=10`,
                        config
                    );
                setCustomers(response.data.data);
                setTotalPages(response.data.totalPages);
            }
            catch (err) {

                console.error(err);
            }
        };

        //if not entered anything like spcae then ""==="" so first page customer will display
    const searchCustomer = async () => {
            if (searchUsername.trim() === ""
            ) {
                getCustomers(0);
                return;
            }
            try {
                const config = {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem( "token" )
                    }

                };

                const response =
                    await axios.get(
                        searchApi +searchUsername,
                        config
                    );

                setCustomers([response.data]);

                setTotalPages(1);

            }
            catch (err) {
                alert(
                    "Customer Not Found"
                );
            }

        };

  
    useEffect(() => {

        getCustomers(page);

    }, [page]);


    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Customer Management
                        </h1>

                        <p className="page-subtitle">
                            Search, monitor and manage customer profiles
                        </p>

                    </div>

                    <div className="row g-4 mb-4">

                        <div className="col-md-4">

                            <div className="dashboard-card-blue">

                                <h5>TOTAL CUSTOMERS</h5>

                                <h2>{customers.length}</h2>

                                <p>Registered Customers</p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="dashboard-card-green">

                                <h5>CURRENT PAGE</h5>

                                <h2>{page + 1}</h2>

                                <p>Viewing Records</p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="dashboard-card-purple">

                                <h5>TOTAL PAGES</h5>

                                <h2>{totalPages}</h2>

                                <p>Available Pages</p>

                            </div>

                        </div>

                    </div>

                    <div className="card account-request-card mb-4">

                        <div className="card-body">

                            <h3 className="form-title">
                                Search Customers
                            </h3>

                            <p className="form-subtitle">
                                Search customers by username
                            </p>

                            <div className="row g-3">

                                <div className="col-md-8">

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Username"
                                        value={searchUsername}
                                        onChange={(e) =>
                                            setSearchUsername(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="col-md-2">

                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={searchCustomer}
                                    >
                                        Search
                                    </button>

                                </div>

                                <div className="col-md-2">

                                    <button
                                        className="btn btn-secondary w-100"
                                        onClick={() => {

                                            setSearchUsername("");

                                            getCustomers(0);

                                        }}
                                    >
                                        Reset
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card account-request-card">

                        <div className="card-header bg-white border-0">

                            <h3 className="form-title">
                                Customer Directory
                            </h3>

                            <p className="form-subtitle">
                                View and manage all registered customers
                            </p>

                        </div>

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Customer Code
                                        </th>

                                        <th>
                                            Customer
                                        </th>

                                        <th>
                                            Contact
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        customers.length > 0 ?

                                            customers.map(

                                                (
                                                    customer
                                                ) => (

                                                    <tr
                                                        key={
                                                            customer.id
                                                        }
                                                    >

                                                        <td>

                                                            <strong>

                                                                CUST-

                                                                {
                                                                    String(
                                                                        customer.id
                                                                    ).padStart(
                                                                        3,
                                                                        "0"
                                                                    )
                                                                }

                                                            </strong>

                                                        </td>

                                                        <td>

                                                            <div className="fw-semibold">

                                                                {
                                                                    customer.firstName
                                                                }

                                                                {" "}

                                                                {
                                                                    customer.lastName
                                                                }

                                                            </div>

                                                            <small className="text-muted">

                                                                ID :
                                                                {" "}
                                                                {
                                                                    customer.id
                                                                }

                                                            </small>

                                                        </td>

                                                        <td>

                                                            <div>
                                                                📧 {customer.email}
                                                            </div>

                                                            <small className="text-muted">
                                                                📞 {customer.phoneNumber}
                                                            </small>

                                                        </td>

                                                        <td>

                                                            <div className="d-flex gap-2">

                                                                <button
                                                                    className="btn btn-outline-primary btn-sm"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/admin/customer/${customer.id}`
                                                                        )
                                                                    }
                                                                >
                                                                    View
                                                                </button>


                                                        

                                                            </div>

                                                        </td>

                                                    </tr>

                                                )

                                            )

                                            :

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center py-4"
                                                >
                                                    No Customers Found
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
                                                className={`page-item ${page === index ? "active" : ""
                                                    }`}
                                            >

                                                <button
                                                    className="page-link"
                                                    onClick={() => setPage(index)}
                                                >
                                                    {count=count + 1}
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

                </div>

            </div>

        </div>

    );

};

export default AdminCustomers;