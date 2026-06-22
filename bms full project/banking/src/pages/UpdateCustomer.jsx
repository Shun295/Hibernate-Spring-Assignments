import NavbarExecutive from "../components/Navbar-Executive";
import Sidebar from "../components/executive/Sidebar";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

const UpdateCustomer = () => {

    const { customerId } = useParams();

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [customer, setCustomer] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        address: ""
    });

    useEffect(() => {
        getCustomer();
    }, []);

    const getCustomer = async () => {

        try {

            const config = {
                headers: {
                    Authorization:
                        "Bearer " +
                        localStorage.getItem("token")
                }
            };

            const response =
                await axios.get(
                    `http://localhost:8080/api/customer/Admin/getById/${customerId}`,
                    config
                );

            setCustomer(response.data);

        }
        catch (err) {

            console.log(err?.response);

        }

    };
const updateCustomer = async (e) => {

    e.preventDefault();

    try {

        const config = {
            headers: {
                Authorization:
                    "Bearer " +
                    localStorage.getItem("token")
            }
        };

        await axios.put(
            `http://localhost:8080/api/customer/update/${customerId}`,
            customer,
            config
        );

        setMessage(
            "Customer Updated Successfully"
        );

        setShowModal(true);

    }
    catch (err) {

        setMessage(
            err?.response?.data ||
            "Update Failed"
        );

        setShowModal(true);

    }



    };

    return (

        <div>

            <NavbarExecutive />

            <div className="d-flex">

                <Sidebar />

                <div className="container-fluid p-4">

                    <div className="card shadow-sm">

                        <div className="card-header bg-white">

                            <h2 className="mb-0">
                                Update Customer
                            </h2>

                        </div>

                        <div className="card-body">

                            <form onSubmit={updateCustomer}>

                                <div className="mb-3">

                                    <label className="form-label">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={customer.firstName}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                firstName: e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={customer.lastName}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                lastName: e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className="form-control"
                                        value={customer.email}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                email: e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        value={customer.phoneNumber}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                phoneNumber: e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <div className="mb-3">

                                    <label className="form-label">
                                        Address
                                    </label>

                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={customer.address}
                                        onChange={(e) =>
                                            setCustomer({
                                                ...customer,
                                                address: e.target.value
                                            })
                                        }
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Update Customer
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={() =>
                                        navigate("/executive/customers")
                                    }
                                >
                                    Cancel
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>
            {
    showModal && (

        <div
            className="modal fade show d-block"
            tabIndex="-1"
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Customer Update
                        </h5>

                    </div>

                    <div className="modal-body">

                        <p>
                            {message}
                        </p>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-primary"
                            onClick={() => {

                                setShowModal(false);

                                if (
                                    message ===
                                    "Customer Updated Successfully"
                                ) {

                                    navigate(
                                        "/executive/customers"
                                    );

                                }

                            }}
                        >
                            OK
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )
}

        </div>

    );

};

export default UpdateCustomer;