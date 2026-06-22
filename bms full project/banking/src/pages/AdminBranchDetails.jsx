import NavbarAdmin from "../components/Navbar-Admin";
import Sidebar from "../components/admin/Sidebar";

import { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

const AdminBranchDetails = () => {

    const { branchId } =useParams();
    const [branch, setBranch] =useState([]);
    const [executives, setExecutives] =useState([]);
    const [customers, setCustomers] =useState([]);

    const [currentPage, setCurrentPage] =useState(0);
    const[totalPages,setTotalPages]=useState(0);
    const pageSize = 5;

    let count=0;
    useEffect(() => {
        const loadData = async () => {
            try {
                const config = {
                    headers: {
                        Authorization:
                            "Bearer " +localStorage.getItem("token")
                    }
                };

                const branchResponse =
                    await axios.get(
                        `http://localhost:8080/api/branch/${branchId}`,
                        config
                    );

                setBranch( branchResponse.data);
                const executiveResponse =
                    await axios.get(
                        `http://localhost:8080/api/executive/branch/${branchId}`,
                        config
                    );

                setExecutives(executiveResponse.data);
                const customerResponse =
                    await axios.get(
                        `http://localhost:8080/api/customer/branch/${branchId}`,
                        config
                    );

                setCustomers(customerResponse.data);

            }
            catch (err) {

                console.error(err)
            }

        };

        loadData();

    }, [branchId]);

 
    return (

        <div>

            <NavbarAdmin />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="page-header mb-4">

                        <h1 className="page-title">
                            Branch Profile
                        </h1>

                        <p className="page-subtitle">
                            Complete information about branch operations and staff
                        </p>

                    </div>

                    <div className="card mt-4">

                        <div className="card-body">

                            <div className="card account-request-card">

                                <div className="card-header bg-white border-0">

                                    <h3 className="form-title">
                                        {branch?.branchName}
                                    </h3>

                                    <p className="form-subtitle">
                                        Branch Information
                                    </p>

                                </div>

                                <div className="card-body">

                                    <div className="row g-4">

                                        <div className="col-md-4">
                                            <div className="info-box">
                                                <label>Branch ID</label>
                                                <h6>BR-{branch.id}</h6>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="info-box">
                                                <label>IFSC Code</label>
                                                <h6>{branch.ifscCode}</h6>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="info-box">
                                                <label>Phone</label>
                                                <h6>{branch.phoneNumber}</h6>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="info-box">
                                                <label>Email</label>
                                                <h6>{branch.email}</h6>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="info-box">
                                                <label>Address</label>
                                                <h6>{branch.address}</h6>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="card mt-4">

                        <div className="card-header">

                            <h3 className="form-title">
                                Executive Directory
                            </h3>

                            <p className="form-subtitle">
                                Staff members assigned to this branch
                            </p>

                        </div>

                        <div className="card-body">

                            <table className="table accounts-table">
                                <thead>

                                    <tr>

                                        <th>
                                            Employee ID
                                        </th>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Designation
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
                                        executives.length > 0 ?

                                            executives.map(

                                                (executive) => (

                                                    <tr
                                                        key={
                                                            executive.id
                                                        }
                                                    >

                                                        <td>
                                                            {
                                                                executive.employeeId
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                executive.firstName
                                                            }
                                                            {" "}
                                                            {
                                                                executive.lastName
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                executive.designation
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                executive.email
                                                            }
                                                        </td>

                                                        <td>
                                                            {
                                                                executive.phoneNumber
                                                            }
                                                        </td>

                                                    </tr>

                                                )

                                            )

                                            :

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="text-center"
                                                >

                                                    No Executives Assigned

                                                </td>

                                            </tr>

                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                    <div className="card mt-4">

                        <div className="card-header">

                            <h3 className="form-title">
                                Customer Directory
                            </h3>

                            <p className="form-subtitle">
                                Customers associated with this branch
                            </p>
                        </div>

                        <div className="card-body">

                            <table className="table accounts-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>First Name</th>

                                        <th>Last Name</th>

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

                                                    </tr>

                                                )

                                            )

                                            :

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    className="text-center"
                                                >

                                                    No Customers Found

                                                </td>

                                            </tr>

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
                                                        {count=count+1}
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

export default AdminBranchDetails;