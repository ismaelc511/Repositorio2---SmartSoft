import React, { useState, useContext} from "react";

import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../context/userContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useContext(UserContext);

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify('')
        }
    }

    return (
        <div className="column">
                <form className="box" >
                    <h1 className="title has-text-centered mb-3">Login</h1>
                    <div className="field">
                        <label className="label">Email Address</label>
                        <div className="control">
                            <input type="email" 
                            placeholder="Enter email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            className='mb-2 form-control titleIn'
                            required                    
                        />
                        <label className="label">Password</label>
                        <div className="control">
                            <input 
                            type="password" 
                            placeholder="Enter password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className='mb-2 form-control titleIn'
                            required                    
                        />
                        </div>
                      
                    </div>
                    </div>
                        <ErrorMessage message={errorMessage}/>
                    <br />
                    <button onClick={submitLogin} className='btn btn-outline-primary mx-2 mb-2 mb-3' style={{"borderRadious":"50px",}}>Login</button>
                </form>
            </div>
    )
}

export default Login;