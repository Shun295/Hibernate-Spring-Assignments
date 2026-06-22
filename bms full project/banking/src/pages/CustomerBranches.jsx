import NavbarCustomer from "../components/Navbar-Customer";
import Sidebar from "../components/customer/Sidebar";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import "../styles/customer-common.css";
import { getAllBranches } from "../store/action/branchAction";

const CustomerBranches = () => {

    const dispatch = useDispatch();

    const { branches } =
        useSelector(
            state => state.branches
        );

    const [myBranch, setMyBranch] = useState(null);

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

                const response =
                    await axios.get(

                        "http://localhost:8080/api/branch/customer/my-branch",

                        config

                    );

                setMyBranch(
                    response.data
                );

            }
            catch (err) {

                console.log(
                    err
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
                            Branch Management
                        </h1>

                        <p className="page-subtitle">
                            View your assigned branch and explore all bank branches
                        </p>
                    </div>
                    <div className="table-card">

                        <div className="card-header">
                            <div className="row g-4 mb-4">

                                <div className="col-md-9">

                                    <div className="card account-request-card h-100">

                                        <div className="card-header bg-white border-0">
                                            <h4 className="mb-0">
                                                My Branch
                                            </h4>
                                        </div>

                                        <div className="card-body">

                                            <h3 className="branch-title">
                                                {myBranch?.branchName}
                                            </h3>

                                            <div className="row mt-4">

                                                <div className="col-md-6 mb-3">
                                                    <strong>IFSC Code</strong>
                                                    <p className="text-muted">
                                                        {myBranch?.ifscCode}
                                                    </p>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <strong>Email</strong>
                                                    <p className="text-muted">
                                                        {myBranch?.email}
                                                    </p>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <strong>Phone Number</strong>
                                                    <p className="text-muted">
                                                        {myBranch?.phoneNumber}
                                                    </p>
                                                </div>

                                                <div className="col-md-6 mb-3">
                                                    <strong>Address</strong>
                                                    <p className="text-muted">
                                                        {myBranch?.address}
                                                    </p>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-3">
                                    <div className="summary-card">
                                        <h5>TOTAL BRANCHES</h5>

                                        <h2>
                                            {
                                                branches.filter(
                                                    branch => branch.status === "ACTIVE"
                                                ).length
                                            }
                                        </h2>
                                        <p>Available Branches</p>
                                    </div>
                                </div>

                            </div>

                            <div className="card account-request-card mb-4">

                                <div className="card-header">

                                    <h4>
                                        All Branches
                                    </h4>

                                </div>

                                <div className="card-body">

                                    <table className="table accounts-table">

                                        <thead>

                                            <tr>

                                                <th>Branch ID</th>

                                                <th>Branch Name</th>

                                                <th>IFSC</th>

                                                <th>Email</th>

                                                <th>Phone</th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {
                                                branches
                                                    .filter(
                                                        branch => branch.status === "ACTIVE"
                                                    )
                                                    .map(branch => (

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
            </div>
        </div>

    );

};

export default CustomerBranches;