import React, {useState, useEffect} from "react"
import {useAuth} from "@/hooks/AuthProvider.jsx"



const LoginForm = ({children}) => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
        console.log(input.Username +":" + input.Password);
    }
    const auth = useAuth();

    console.log(auth);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
        if (input.email !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }
        alert("pleae provide a valid input");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form_control">
                <label htmlFor="user-email">Email:</label>
                <input
                    type="email"
                    id="user-email"
                    name="email"
                    placeholder="example@yahoo.com"
                    aria-describedby="user-email"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-email" className="sr-only">
                    Please enter a valid username. It must contain at least 6 characters.
                </div>
            </div>
            <div className="form_control">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    aria-describedby="user-password"
                    aria-invalid="false"
                    onChange={handleInput}
                />
                <div id="user-password" className="sr-only">
                    your password should be more than 6 character
                </div>
            </div>
            <button className="btn-submit">Submit</button>

        </form>
    )
}
export default LoginForm;