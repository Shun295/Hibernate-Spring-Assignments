import Sidebar from "../components/executive/Sidebar";
import NavbarExecutive from "../components/Navbar-Executive";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import { getAllBranches }
    from "../store/action/branchAction";

const ExecutiveBranches = () => {

    const dispatch =
        useDispatch();

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    let count = 0;
    const { branches } =
        useSelector(
            state => state.branches
        );

    const [myBranch, setMyBranch] = useState(null);

    const [customers,setCustomers] =useState([]);

    const [customerPage,setCustomerPage] =useState(0);

    const pageSize = 5;

    useEffect(() => {

        dispatch(
            getAllBranches()
        );

        getMyBranch();

    }, []);

    const getMyBranch =
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
                const customerResponse =
                    await axios.get(

                        "http://localhost:8080/api/customer/my-branch",

                        config

                    );

                setCustomers(
                    customerResponse.data
                );

                const response =
                    await axios.get(

                        "http://localhost:8080/api/branch/my-branch",

                        config

                    );

                setMyBranch(
                    response.data
                );

            }
            catch (err) {

                console.error(err)

            }

        };


    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />


                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Branch Management
                        </h1>

                        <p className="page-subtitle">
                            View branch details and customers assigned to branches
                        </p>

                    </div>
                    {/* MY BRANCH */}

                    <div className="card account-request-card">

                        <div className="card-header">

                            <h4>
                                My Branch
                            </h4>

                        </div>

                        <div className="card-body">

                            <h3 className="form-title">
                                {myBranch?.branchName}
                            </h3>

                            <p><strong>IFSC:</strong> {myBranch?.ifscCode}</p>

                            <p>
                                <strong>IFSC:</strong>{" "}
                                {myBranch?.ifscCode}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {myBranch?.email}
                            </p>

                            <p>
                                <strong>Phone:</strong>{" "}
                                {myBranch?.phoneNumber}
                            </p>

                            <p>
                                <strong>Address:</strong>{" "}
                                {myBranch?.address}
                            </p>

                        </div>

                    </div>

                    {/* CUSTOMERS IN MY BRANCH */}

                    <div className="card mt-4">

                        <div className="card-header">

                            <h3 className="form-title">
                                Customers In My Branch
                            </h3>

                        </div>

                        <div className="card-body">
                            <table
                                className="table accounts-table"
                            >

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Phone</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        customers.length > 0 ?

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
                                                            {" "}
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

                                                    </tr>

                                                )

                                            )

                                            :

                                            <tr>

                                                <td
                                                    colSpan="4"
                                                    className="text-center"
                                                >

                                                    No Customers Found

                                                </td>

                                            </tr>

                                    }

                                </tbody>

                            </table>

                            <nav>

                                <ul className="pagination justify-content-center">

                                    <li
                                        className="page-item"
                                    >

                                        <button
                                            className="page-link"
                                           disabled={page === 0}
                                            onClick={() =>
                                                setPage(
                                                    page - 1
                                                )
                                            }
                                        >
                                            Previous
                                        </button>

                                    </li>

                                    {

                                        [...Array(totalPages)]

                                        .map(

                                            (_, index) => (

                                                <li
                                                    key={index}
                                                    className="page-item"
                                                >

                                                    <button
                                                        className="page-link"
                                                        onClick={() =>
                                                            setPage(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        {
                                                           count=count+1
                                                        }
                                                    </button>

                                                </li>

                                            )

                                        )

                                    }

                                    <li
                                        className="page-item"
                                    >

                                        <button
                                            className="page-link"
                                            disabled={page === totalPages - 1}
                                            onClick={() =>
                                                setPage(
                                                    page + 1
                                                )
                                            }
                                        >
                                            Next
                                        </button>

                                    </li>

                                </ul>

                            </nav>

                        </div>

                    </div>


                    {/* ALL BRANCHES */}

                    <div className="card mt-4">

                        <div className="card-header">

                            <h3 className="form-title">
                                All Branches
                            </h3>

                        </div>

                        <div className="card-body">

                            <table
                                className="table table-bordered"
                            >

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Branch Name
                                        </th>

                                        <th>
                                            IFSC
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        branches.map(

                                            branch => (

                                                <tr
                                                    key={
                                                        branch.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            branch.id
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            branch.branchName
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            branch.ifscCode
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            branch.email
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            branch.phoneNumber
                                                        }
                                                    </td>

                                                </tr>

                                            )

                                        )
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

export default ExecutiveBranches;