import { useState, useEffect } from "react";
import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExecutiveManagement = () => {

    const navigate = useNavigate();
    const getAllExecutiveApi = "http://localhost:8080/api/executive/admin/executive/getAll";
    const searchExecutiveApi =
        "http://localhost:8080/api/executive/search";
    const branchApi =
        "http://localhost:8080/api/branch/all";

    const [executives, setExecutives] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [designation, setDesignation] = useState("");
    const [branchId, setBranchId] = useState("");
    const [branches, setBranches] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    let count=0;
    const getAllExecutives = async () => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            const response = await axios.get(
                `${getAllExecutiveApi}?page=${currentPage}&size=5`,
                config_details
            );

            console.log(response.data);

            setExecutives(response.data.data);
            setTotalPages(response.data.totalPages);

        }
        catch (err) {
            console.error(err)
        }

    };

    const getAllBranches = async () => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " + localStorage.getItem("token")
            }
        };

        try {

            const response = await axios.get(
                branchApi,
                config_details
            );

            console.log(response.data);

            setBranches(response.data.data);

        }
        catch (err) {
            console.error(err)
        }

    };

    useEffect(() => {

        getAllExecutives();

    }, [currentPage]);
    useEffect(() => {

        getAllBranches();

    }, []);

    const searchExecutive = async () => {

        const config_details = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        try {

            const response = await axios.get(

                `${searchExecutiveApi}?keyword=${keyword || ""}&designation=${designation || ""}&branchId=${branchId || ""}`,

                config_details

            );

            setExecutives(
                response.data
            );

            setCurrentPage(0);

        }
        catch (err) {

            console.log(
                err?.response
            );

            alert(
                "Executive Not Found"
            );

        }

    };
    const deleteExecutive = async (id) => {

        try {

            const config = {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            };

            await axios.delete(
                `http://localhost:8080/api/executive/delete/${id}`,
                config
            );

            setExecutives(
                executives.filter(
                    executive => executive.id !== id
                )
            );

        } catch (err) {

            console.log(err?.response);

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
                            Executive Management
                        </h1>

                        <p className="page-subtitle">
                            Manage executives, assignments and branch operations
                        </p>

                    </div>

                    <div className="row g-4 mb-4">

                        <div className="col-md-3">

                            <div className="dashboard-card-blue">

                                <h5>TOTAL EXECUTIVES</h5>

                                <h2>{executives.length}</h2>

                                <p>Registered Executives</p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-card-green">

                                <h5>ACTIVE EXECUTIVES</h5>

                                <h2>{executives.length}</h2>

                                <p>Currently Working</p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-card-purple">

                                <h5>DESIGNATIONS</h5>

                                <h2>
                                    {
                                        new Set(
                                            executives.map(
                                                (e) => e.designation
                                            )
                                        ).size
                                    }
                                </h2>

                                <p>Unique Roles</p>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="dashboard-card-orange">

                                <h5>BRANCHES</h5>

                                <h2>{branches.length}</h2>

                                <p>Covered Branches</p>

                            </div>

                        </div>

                    </div>

                    {/* Search Section */}
                    <div className="card account-request-card mb-4">
                        <div className="card-body">

                            <h4>Search Executive</h4>

                            <div className="row">

                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Employee ID / Name"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                </div>

                                <div className="col-md-3">
                                    <select
                                        className="form-control"
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                    >
                                        <option value="">All Designations</option>

                                        <option value="ACCOUNT_OFFICER">
                                            ACCOUNT_OFFICER
                                        </option>

                                        <option value="LOAN_OFFICER">
                                            LOAN_OFFICER
                                        </option>

                                        <option value="CUSTOMER_SUPPORT">
                                            CUSTOMER_SUPPORT
                                        </option>
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <select
                                        className="form-control"
                                        value={branchId}
                                        onChange={(e) => setBranchId(e.target.value)}
                                    >
                                        <option value="">All Branches</option>

                                        {
                                            branches.map((branch) => (
                                                <option
                                                    key={branch.id}
                                                    value={branch.id}
                                                >
                                                    {branch.branchName}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="col-md-2">
                                    <button
                                        className="btn btn-primary w-100"
                                        onClick={searchExecutive}
                                    >
                                        Search
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* Executive List */}
                    <div className="card account-request-card">

                        <div className="card-header d-flex justify-content-between">

                            <div>

                                <h3 className="form-title">
                                    Executive Directory
                                </h3>

                                <p className="form-subtitle">
                                    View and manage executive profiles
                                </p>

                            </div>

                            <button
                                className="btn btn-success px-4"
                                onClick={() => navigate("/admin/executive/add")}
                            >
                                + Add Executive
                            </button>

                        </div>

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>
                                    <tr>
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Designation</th>
                                        <th>Branch</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        executives.map((executive) => (

                                            <tr key={executive.id}>

                                                <td>
                                                    <strong>
                                                        {executive.employeeId}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {executive.firstName} {executive.lastName}
                                                </td>

                                                <td>{executive.email}</td>

                                                <td>{executive.phoneNumber}</td>

                                                <td>
                                                    <span className="type-badge">
                                                        {executive.designation}
                                                    </span>
                                                </td>

                                                <td>{executive.branchName}</td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/executive/view/${executive.id}`
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-warning btn-sm"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/admin/executive/update/${executive.id}`
                                                                )
                                                            }
                                                        >
                                                            Update
                                                        </button>

                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() =>
                                                                deleteExecutive(executive.id)
                                                            }
                                                        >
                                                            Delete
                                                        </button>

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
                                            <li key={index} className="page-item">
                                            
                                                <button
                                                    className="page-link"
                                                    onClick={() => setCurrentPage(index)}
                                                >
                                                    {count=count + 1}
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

export default ExecutiveManagement;