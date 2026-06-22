import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllBranches } from "../store/action/branchAction";
const AdminBranchDashboard = () => {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    let count = 0;
    const { branches } =
        useSelector(
            state => state.branches
        );

    const api = "http://localhost:8080/api/branch/admin/dashboard";

    useEffect(() => {
        const getDashboard =
            async () => {
                try {
                    const config = {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token")

                        }

                    };

                    const response = await axios.get(api, config);
                    setDashboard(response.data);

                }
                catch (err) {

                    console.error(err);
                }
            };

        getDashboard();
        dispatch(getAllBranches(currentPage)
        );
    }, [currentPage]);

    const activateBranch = async (branchId) => {
        try {
            const config = {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("token")
                }

            };

            await axios.put(
                `http://localhost:8080/api/branch/activate/${branchId}`,
                {},
                config
            );

            dispatch(getAllBranches(currentPage));

        }
        catch (err) {

            console.error(err);

        }

    };

    const deactivateBranch = async (branchId) => {

        try {

            const config = {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")

                }

            };

            await axios.put(
                `http://localhost:8080/api/branch/deactivate/${branchId}`,
                {},
                config
            );
            dispatch(getAllBranches(currentPage));
        }
        catch (err) {
            console.error(err)
        }
    };

    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">
                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Branch Management
                        </h1>

                        <p className="page-subtitle">
                            Monitor branches, executives and customer distribution
                        </p>

                    </div>
                    <div className="row g-4 mt-2">

                        <div className="col-md-4">

                            <div className="dashboard-card-blue">

                                <h5>TOTAL BRANCHES</h5>

                                <h2>{dashboard?.totalBranches}</h2>

                                <p>Registered Branches</p>

                            </div>

                        </div>
                        <div className="col-md-4">

                            <div className="dashboard-card-green">

                                <h5>ACTIVE BRANCHES</h5>

                                <h2>
                                    {dashboard?.activeBranches}
                                </h2>

                                <p>Operational Branches</p>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="dashboard-card-red">

                                <h5>INACTIVE BRANCHES</h5>

                                <h2>
                                    {dashboard?.inactiveBranches}
                                </h2>

                                <p>Disabled Branches</p>

                            </div>

                        </div>
                        <div className="row g-4 mt-1">
                            <div className="col-md-6">

                                <div className="dashboard-card-purple">

                                    <h5>TOTAL EXECUTIVES</h5>

                                    <h2>
                                        {dashboard?.totalExecutives}
                                    </h2>

                                    <p>Assigned Staff Members</p>

                                </div>

                            </div>

                            <div className="col-md-6">

                                <div className="dashboard-card-orange">

                                    <h5>TOTAL CUSTOMERS</h5>

                                    <h2>
                                        {dashboard?.totalCustomers}
                                    </h2>

                                    <p>Registered Customers</p>

                                </div>

                            </div>

                        </div>

                        <div className="card account-request-card mt-5">

                            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
                                <div>

                                    <h3 className="form-title">
                                        Branch Directory
                                    </h3>

                                    <p className="form-subtitle">
                                        View and manage all banking branches
                                    </p>

                                </div>

                                <button
                                    className="btn btn-success px-4"
                                    onClick={() =>
                                        navigate(
                                            "/admin/branch/add"
                                        )
                                    }
                                >
                                    + Add Branch
                                </button>

                            </div>

                            <div className="card-body">

                                <table className="table accounts-table">

                                    <thead>
                                        <tr>
                                            <th>Branch Code</th>
                                            <th>Branch Details</th>
                                            <th>Contact</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {
                                            branches.map((branch) => (

                                                <tr key={branch.id}>

                                                    <td>
                                                        <strong>
                                                            BR-{String(branch.id).padStart(3, "0")}
                                                        </strong>
                                                    </td>

                                                    <td>

                                                        <div className="fw-semibold">
                                                            {branch.branchName}
                                                        </div>

                                                        <small className="text-muted">
                                                            IFSC : {branch.ifscCode}
                                                        </small>

                                                    </td>

                                                    <td>

                                                        <div>
                                                            📧 {branch.email}
                                                        </div>

                                                        <small className="text-muted">
                                                            📞 {branch.phoneNumber}
                                                        </small>

                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge ${branch.status === "ACTIVE"
                                                                ? "bg-success"
                                                                : "bg-danger"
                                                                }`}
                                                        >
                                                            {branch.status}
                                                        </span>
                                                    </td>
                                                    <td>

                                                        <div className="d-flex gap-2">

                                                            <button
                                                                className="btn btn-outline-primary btn-sm"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/branch/${branch.id}`
                                                                    )
                                                                }
                                                            >
                                                                View
                                                            </button>

                                                            <button
                                                                className="btn btn-outline-warning btn-sm"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/branch/update/${branch.id}`
                                                                    )
                                                                }
                                                            >
                                                                Update
                                                            </button>

                                                            <div className="dropdown">

                                                                <button
                                                                    className="btn btn-secondary btn-sm dropdown-toggle"
                                                                    type="button"
                                                                    data-bs-toggle="dropdown"
                                                                >
                                                                    More
                                                                </button>

                                                                <ul className="dropdown-menu">

                                                                    {branch.status === "ACTIVE" ? (

                                                                        <li>
                                                                            <button
                                                                                className="dropdown-item text-danger"
                                                                                onClick={() =>
                                                                                    deactivateBranch(branch.id)
                                                                                }
                                                                            >
                                                                                Deactivate
                                                                            </button>
                                                                        </li>

                                                                    ) : (

                                                                        <li>
                                                                            <button
                                                                                className="dropdown-item text-success"
                                                                                onClick={() =>
                                                                                    activateBranch(branch.id)
                                                                                }
                                                                            >
                                                                                Activate
                                                                            </button>
                                                                        </li>

                                                                    )}

                                                                </ul>

                                                            </div>

                                                        </div>

                                                    </td>

                                                </tr>

                                            ))
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
                                                <li
                                                    className="page-item"
                                                    key={index}
                                                >
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
        </div>
    );

};

export default AdminBranchDashboard;