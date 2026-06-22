import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import "../../styles/executive-common.css";
const AddCustomer = () => {
const navigate = useNavigate();
    
    const postApi = "http://localhost:8080/api/auth/customer/add";

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [username, setUsername] = useState("");

    const [successMsg, setSuccessMsg] = useState();
    const [errMsg, setErrMsg] = useState();

    const [errMsgFirstName, setErrMsgFirstName] = useState();
    const [errMsgLastName, setErrMsgLastName] = useState();
    const [errMsgEmail, setErrMsgEmail] = useState();
    const [errMsgPhoneNumber, setErrMsgPhoneNumber] = useState();
    const [errMsgGender, setErrMsgGender] = useState();
    const [errMsgDateOfBirth, setErrMsgDateOfBirth] = useState();
    const [errMsgAddress, setErrMsgAddress] = useState();
    const [errMsgPanNumber, setErrMsgPanNumber] = useState();
    const [errMsgAadharNumber, setErrMsgAadharNumber] = useState();
    const [errMsgUsername, setErrMsgUsername] = useState();

    const onboardCustomer = async (e) => {
        e.preventDefault();

        let body = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            gender: gender,
            dateOfBirth: dateOfBirth,
            address: address,
            panNumber: panNumber,
            aadharNumber: aadharNumber,
            username: username
        };

        const config_details = {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        };

        try {

           const response=await axios.post(postApi, body, config_details);

            setSuccessMsg(
    "Customer Added Successfully"
);

setTimeout(() => {
    navigate("/executive/customers");
}, 1000);
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            setGender("");
            setDateOfBirth("");
            setAddress("");
            setPanNumber("");
            setAadharNumber("");
            setUsername("");

            setErrMsg(undefined);

            setErrMsgFirstName(undefined);
            setErrMsgLastName(undefined);
            setErrMsgEmail(undefined);
            setErrMsgPhoneNumber(undefined);
            setErrMsgGender(undefined);
            setErrMsgDateOfBirth(undefined);
            setErrMsgAddress(undefined);
            setErrMsgPanNumber(undefined);
            setErrMsgAadharNumber(undefined);
            setErrMsgUsername(undefined);

        } catch (err) {

            const field = err.response?.data;

            setErrMsg("Customer Registration Failed");

            setErrMsgFirstName(field?.firstName);
            setErrMsgLastName(field?.lastName);
            setErrMsgEmail(field?.email);
            setErrMsgPhoneNumber(field?.phoneNumber);
            setErrMsgGender(field?.gender);
            setErrMsgDateOfBirth(field?.dateOfBirth);
            setErrMsgAddress(field?.address);
            setErrMsgPanNumber(field?.panNumber);
            setErrMsgAadharNumber(field?.aadharNumber);
            setErrMsgUsername(field?.username);

            setSuccessMsg(undefined);
        }
    };

    return (
         <div className="row justify-content-center">
            <div className="col-xl-9 col-lg-10">
                <div className="card account-request-card">

                    <div className="card-header bg-white border-0 pt-4 px-4">

    <h3 className="form-title">
        Customer Registration Form
    </h3>

    <p className="form-subtitle">
        Enter customer details and create a banking profile
    </p>

</div>

                    <div className="card-body">

                        <form onSubmit={(e) => onboardCustomer(e)}>

                            {
                                successMsg !== undefined ?
                                    <div className="alert alert-success mb-4">
                                        {successMsg}
                                    </div>
                                    : ""
                            }

                            {
                                errMsg !== undefined ?
                                    <div className="alert alert-danger mb-4">
                                        {errMsg}
                                    </div>
                                    : ""
                            }

                            <h5 className="section-heading mb-3">
    Personal Information
</h5>

<div className="row">

    <div className="col-md-6">

        <div className="mb-3">
            <label>First Name</label>

            {errMsgFirstName &&
                <span className="text-danger ms-2">
                    {errMsgFirstName}
                </span>
            }

            <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) =>
                    setFirstName(e.target.value)
                }
                required
            />
        </div>

    </div>

    <div className="col-md-6">

        <div className="mb-3">
            <label>Last Name</label>

            {errMsgLastName &&
                <span className="text-danger ms-2">
                    {errMsgLastName}
                </span>
            }

            <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) =>
                    setLastName(e.target.value)
                }
                required
            />
        </div>

    </div>

</div>
<h5 className="section-heading mt-4 mb-3">
    Contact Information
</h5>

<div className="row">

    <div className="col-md-6">

        <div className="mb-3">
            <label>Email</label>

            {errMsgEmail &&
                <span className="text-danger ms-2">
                    {errMsgEmail}
                </span>
            }

            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
                required
            />
        </div>

    </div>

    <div className="col-md-6">

        <div className="mb-3">
            <label>Phone Number</label>

            {errMsgPhoneNumber &&
                <span className="text-danger ms-2">
                    {errMsgPhoneNumber}
                </span>
            }

            <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) =>
                    setPhoneNumber(e.target.value)
                }
                required
            />
        </div>

    </div>

</div>
<div className="row">

    <div className="col-md-6">

        <div className="mb-3">
            <label>Gender</label>

            {errMsgGender &&
                <span className="text-danger ms-2">
                    {errMsgGender}
                </span>
            }

            <select
                className="form-control"
                value={gender}
                onChange={(e) =>
                    setGender(e.target.value)
                }
                required
            >
                <option value="">
                    Select Gender
                </option>
                <option value="MALE">
                    Male
                </option>
                <option value="FEMALE">
                    Female
                </option>
                <option value="OTHER">
                    Other
                </option>
            </select>

        </div>

    </div>

    <div className="col-md-6">

        <div className="mb-3">
            <label>Date Of Birth</label>

            {errMsgDateOfBirth &&
                <span className="text-danger ms-2">
                    {errMsgDateOfBirth}
                </span>
            }

            <input
                type="date"
                className="form-control"
                value={dateOfBirth}
                onChange={(e) =>
                    setDateOfBirth(e.target.value)
                }
                required
            />
        </div>

    </div>

</div>
<div className="mb-3">
    <label>Address</label>

    {errMsgAddress &&
        <span className="text-danger ms-2">
            {errMsgAddress}
        </span>
    }

    <textarea
        className="form-control"
        rows="3"
        value={address}
        onChange={(e) =>
            setAddress(e.target.value)
        }
        required
    />
</div>
<h5 className="section-heading mt-4 mb-3">
    KYC Information
</h5>

<div className="row">

    <div className="col-md-6">

        <div className="mb-3">
            <label>PAN Number</label>

            {errMsgPanNumber &&
                <span className="text-danger ms-2">
                    {errMsgPanNumber}
                </span>
            }

            <input
                type="text"
                className="form-control"
                value={panNumber}
                onChange={(e) =>
                    setPanNumber(e.target.value)
                }
                required
            />
        </div>

    </div>

    <div className="col-md-6">

        <div className="mb-3">
            <label>Aadhaar Number</label>

            {errMsgAadharNumber &&
                <span className="text-danger ms-2">
                    {errMsgAadharNumber}
                </span>
            }

            <input
                type="text"
                className="form-control"
                value={aadharNumber}
                onChange={(e) =>
                    setAadharNumber(e.target.value)
                }
                required
            />
        </div>

    </div>

</div>
<h5 className="section-heading mt-4 mb-3">
    Login Credentials
</h5>

<div className="mb-3">
    <label>Username</label>

    {errMsgUsername &&
        <span className="text-danger ms-2">
            {errMsgUsername}
        </span>
    }

    <input
        type="text"
        className="form-control"
        value={username}
        onChange={(e) =>
            setUsername(e.target.value)
        }
        required
    />
</div>

                            <div className="mb-3">
                                <button
    type="submit"
    className="btn btn-success w-100 py-3"
>
    Register Customer
</button>
                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddCustomer;
