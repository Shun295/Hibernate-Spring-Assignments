import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useEffect, useState } from "react";

import axios from "axios";
import "../styles/executive-common.css";
import { useParams } from "react-router-dom";

const ExecutiveCustomerDetails = () => {

    const { customerId } = useParams();

    const [customer, setCustomer] = useState(null);

    useEffect(() => {

        getCustomer();

    }, []);

    const getCustomer =
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

                        `http://localhost:8080/api/customer/Admin/getById/${customerId}`,

                        config

                    );

                setCustomer(
                    response.data
                );

            }
            catch (err) {

                console.log(
                    err?.response
                );

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
                            Customer Profile
                        </h1>

                        <p className="page-subtitle">
                            View customer information and personal details
                        </p>

                    </div>

                    <div className="card account-request-card">
                        <div className="card-body">

                            <div
                                className="text-center mb-4"
                            >

                                <div
                                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        fontSize: "38px",
                                        fontWeight: "700"
                                    }}
                                >

                                    {
                                        customer?.firstName
                                            ?.charAt(0)
                                            ?.toUpperCase()
                                    }

                                </div>

                            </div>

                            <div className="row">

                                <div className="col-md-6">

                                    <h5 className="section-heading mb-3">
                                        Personal Information
                                    </h5>

                                    <div className="profile-item">
                                        <span className="profile-label">Customer ID</span>
                                        <span className="profile-value">
                                            {customer?.id}
                                        </span>
                                    </div>

                                    <div className="profile-item">
                                        <span className="profile-label">First Name</span>
                                        <span className="profile-value">
                                            {customer?.firstName}
                                        </span>
                                    </div>

                                    <div className="profile-item">
                                        <span className="profile-label">Last Name</span>
                                        <span className="profile-value">
                                            {customer?.lastName}
                                        </span>
                                    </div>

                                    <div className="profile-item">
                                        <span className="profile-label">Username</span>
                                        <span className="profile-value">
                                            {customer?.username}
                                        </span>
                                    </div>

                                    <div className="profile-item">
                                        <span className="profile-label">Gender</span>
                                        <span className="profile-value">
                                            {customer?.gender}
                                        </span>
                                    </div>

                                    <div className="profile-item">
                                        <span className="profile-label">Date Of Birth</span>
                                        <span className="profile-value">
                                            {customer?.dateOfBirth}
                                        </span>
                                    </div>

                                </div>

                                <div className="col-md-6">

                                    <h5 className="section-heading mb-3">
                                        Contact & Identity Information
                                    </h5>

                                    <div className="profile-item">
                                        <span className="profile-label">Email</span>
                                        <span className="profile-value">
                                            {customer?.email}
                                        </span>
                                    </div>

                                    <div className="profile-item">
                                        <span className="profile-label">Phone Number</span>
                                        <span className="profile-value">
                                            {customer?.phoneNumber}
                                        </span>
                                    </div>

                                    <div className="profile-item">
                                        <span className="profile-label">PAN Number</span>
                                        <span className="profile-value">
                                            {customer?.panNumber}
                                        </span>
                                    </div>

                                    <div className="profile-item">
                                        <span className="profile-label">Aadhaar Number</span>
                                        <span className="profile-value">
                                            {customer?.aadharNumber}
                                        </span>
                                    </div>

                                    <div className="profile-item">
                                        <span className="profile-label">Address</span>
                                        <span className="profile-value">
                                            {customer?.address}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>





                </div>

            </div>

        </div>

    );

};

export default ExecutiveCustomerDetails;