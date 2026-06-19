import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company, setCompany] = useState("");

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const onAdd = async (e) => {
        e.preventDefault();

        try {
            const responseBody = {
                name,
                email,
                phone,
                company: {
                    name: company
                }
            };

            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/users",
                responseBody
            );

            console.log(response.data);

            setSuccess("User Added Successfully!");
            setError("");

            setName("");
            setEmail("");
            setPhone("");
            setCompany("");

            navigate("/users");
        } catch (err) {
            console.error(err);
            setError("Failed To Add User");
            setSuccess("");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-7">

                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white text-center">
                            <h2 className="mb-0">Add User</h2>
                        </div>

                        <div className="card-body">

                            {success && (
                                <div className="alert alert-success">
                                    {success}
                                </div>
                            )}

                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={onAdd}>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Name"
                                        value={name}
                                        required
                                        onChange={(e) =>
                                            setName(e.target.value)
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
                                        placeholder="Enter Email"
                                        value={email}
                                        required
                                        onChange={(e) =>
                                            setEmail(e.target.value)
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
                                        placeholder="Enter Phone Number"
                                        value={phone}
                                        required
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Company Name"
                                        value={company}
                                        required
                                        onChange={(e) =>
                                            setCompany(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                    >
                                        Add User
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AddUser;