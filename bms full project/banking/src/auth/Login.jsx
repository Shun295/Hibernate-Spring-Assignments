import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
const Login=()=>
{

    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const [errMsg,setErrMsg]=useState()

    const loginApi = "http://localhost:8080/api/auth/login";
    const userDetailsApi="http://localhost:8080/api/auth/user-details"
   
    //navigator
    const navigate=useNavigate()
    const onLogin=async (e)=>
    {
        e.preventDefault();
        const config={
            headers:{
                'Authorization':"Basic "+window.btoa(username+":"+password)
            }
        }
        try{
            const response=await axios.get(loginApi,config)
            console.log(response.data)

            //saving the token
            let token=response.data.token
            //save in localstoarge
            localStorage.setItem("token",token)
            localStorage.setItem("username", username)

            //prepare the header
            const config_details={
                headers:{
                    'Authorization' : "Bearer "+token
                }
            }

            //Fetch user details
            const resp=await axios.get(userDetailsApi,config_details)
            console.log(resp.data)

            let role=resp.data.role
            localStorage.setItem("role", role);
            switch(role)
            {
                case 'ADMIN':
                    navigate('/admin')//link that we mentioned in app.jsx
                    break;

                case 'EXECUTIVE':
                    navigate('/executive')
                    break;

                case 'CUSTOMER':
                    navigate('/customer')
                    break;
                default:
                    setErrMsg("Invalid credentails")
                    break;
            }

        }
        catch(err)
        {
            setErrMsg("Invalid Credentials")
        }
    }
return (

    <div className="login-page">

        <div className="container-fluid">

            <div className="row min-vh-100">

                {/* Left Side */}

                <div className="col-lg-6 login-banner">

                    <div className="login-banner-content">

                        <h1 className="bank-title">
                            Maverick Bank
                        </h1>

                        <p className="bank-description">
                            Secure Banking, Smart Investments and Trusted Financial Solutions for every customer.
                        </p>

                        <div className="feature-list">

                            <div className="feature-item">
                                ✓ Secure Banking Services
                            </div>

                            <div className="feature-item">
                                ✓ Instant Fund Transfers
                            </div>

                            <div className="feature-item">
                                ✓ Loan & Credit Management
                            </div>

                            <div className="feature-item">
                                ✓ Digital Banking Experience
                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Side */}

                <div className="col-lg-6 login-right">

                    <div className="login-card">

                        <h2 className="login-title">
                            Welcome Back
                        </h2>

                        <p className="login-subtitle">
                            Sign in to access your banking dashboard
                        </p>

                        {
                            errMsg ?

                            <div className="alert alert-danger">

                                {errMsg}

                            </div>

                            :

                            ""
                        }

                        <form
                            onSubmit={(e) =>
                                onLogin(e)
                            }
                        >

                            <div className="mb-4">

                                <label className="form-label fw-semibold">

                                    Username

                                </label>

                                <input
                                    type="text"
                                    className="form-control login-input"
                                    placeholder="Enter Username"
                                    onChange={(e) =>
                                        setUsername(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="mb-4">

                                <label className="form-label fw-semibold">

                                    Password

                                </label>

                                <input
                                    type="password"
                                    className="form-control login-input"
                                    placeholder="Enter Password"
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <button
                                type="submit"
                                className="btn login-btn w-100"
                            >

                                Login

                            </button>

                            <div className="text-center mt-3">

    <span
        className="text-primary"
        style={{
            cursor: "pointer"
        }}
        onClick={() =>
            navigate("/forgot-password")
        }
    >
        Forgot Password?
    </span>

</div>

                        </form>

                        <div className="login-footer">

                            © 2026 Maverick Bank

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

);
}
export default Login