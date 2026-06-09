import axios from "axios"
import { useState } from "react"

const Login=()=>
{

    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const [errMsg,setErrMsg]=useState()

    const loginApi = "http://localhost:8080/api/auth/login";
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

        }
        catch(err)
        {
            setErrMsg("Invalid Credentials")
        }
    }
    return(
        <div className="container">
            <div className="row mt-4">
                <div className="col-sm-3"></div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            LOGIN TO CMS
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e)=>onLogin(e)}>
                               {
                                errMsg!==undefined?
                                <div className="alert alert-primary" >
                                             {errMsg}
                                        </div> :
                                        ""
                               } 
                               <div className="mb-4">
                                <label>Username</label>
                                <input type="text" className="form-control"
                                onChange={(e)=>setUsername(e.target.value)}/>
                               </div>
                               <div className="mb-4">
                                <label>Password</label>
                                <input type="text" className="form-control"
                                onChange={(e)=>setPassword(e.target.value)}/>
                               </div>
                                <div className="mb-4">
                                    <input type="submit" value="login" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3"></div>
            </div>
            
        </div>
    )
}
export default Login