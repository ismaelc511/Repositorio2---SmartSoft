import React from "react";
import { useContext } from "react";
import { useState } from "react";


import { UserContext } from "../context/userContext";
import ErrorMessage from "./ErrorMessage";

const Register2 = () =>{
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(UserContext);

    const submitRegistration = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: id, name: name, email: email, password: password}),
        };

        const response = await fetch("http://localhost:8000/user/signup", requestOptions);
        console.log(response)
        const data = await response.json();
        console.log("Hola", data)

        if(!response.ok){
            console.log(setErrorMessage(data.detail));
        }else{
            //setToken(data.response.token)
            console.log(setToken(data))
        }
    };

        const handleSubmit = (e) =>{
            e.preventDefault();
            if(password === confirmationPassword && password.length > 5){
               submitRegistration();  
            }else{
                setErrorMessage("Ensure that the passwords match and greater than 5 characters");
            }
        }

        return (
            <div className="column">
                <form className="box" onSubmit={handleSubmit}>
                    <h1 className="title has-text-centered mb-3">Register</h1>
                    <div className="field">
                        <label className="label">Id</label>
                        <div className="control">
                            <input type="id" 
                            placeholder="Enter Id" 
                            value={id} 
                            onChange={(e) => setId(e.target.value)}
                            className='mb-2 form-control titleIn'
                            required                    
                        />
                        <label className="label">Name</label>
                        <div className="control">
                            <input type="name" 
                            placeholder="Enter name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            className='mb-2 form-control titleIn'
                            required                    
                        />
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
                        <label className="label">Confirm Password</label>
                        <div className="control">
                            <input 
                            type="password" 
                            placeholder="Confirm password" 
                            value={confirmationPassword} 
                            onChange={(e) => setConfirmationPassword(e.target.value)}
                            className='mb-2 form-control titleIn'
                            required                    
                        /></div>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                        <ErrorMessage message={errorMessage}/>
                    <br />
                    {/*<button className='btn btn-outline-primary mx-2 mb-2 mb-3' type="submit">Register</button>*/}
                    <button onClick={submitRegistration} className='btn btn-outline-primary mx-2 mb-2 mb-3' style={{"borderRadious":"50px",}}>Register</button>
                </form>
            </div>
        );

};

export default Register2;