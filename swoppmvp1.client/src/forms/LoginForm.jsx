import React, {useState, useEffect} from "react"
import {useAuth} from "@/hooks/AuthProvider.jsx"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import PasswordChecklist from "react-password-checklist"



const LoginForm = ({children}) => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState({});
    const [passwordValid, setPasswordValid] = useState(false);
    const auth = useAuth();
   
    console.log("passwordValid", passwordValid)
    
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
        if ( !!error[e.target.name] ) setError({
            ...error,
            [e.target.name]: null
        })

    }
    const validateEmail = (email) => {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }
    const validatePassword = (password) => {
        const regex = /(?=.{6,20}$)(?=[A-Å]{1})(?=.*[@#$%^&+=\-_!])\D*\d/;
        return regex.test(password);
    }
    
    const findFormErrors = () => {
        const {email, password} = input;
        const newErrors = {};
        // email errors
        if (!email || email === "") newErrors.email = "Email is required!";
        else if (!validateEmail(email)) newErrors.email = "Invalid email!";
        // password errors
        if (!password || password === "") newErrors.password = "Password is required!";
        else if (!validatePassword(password)) newErrors.password = "Password must contain at least 6 characters, one letter, one digit and one special character!";
        return newErrors;
    }

    console.log(auth);
    const handleSubmit = (e) => {
        e.preventDefault();
        const findErrors = findFormErrors();
        if (Object.keys(findErrors).length > 0) {
            setError(findErrors);
            return;
        }
        if (input.email !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }
        alert("pleae provide a valid input");
    }

    return (
        <Form onSubmit={handleSubmit} size={"sm"} className={"justify-center"}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleInput} />
                <Form.Control.Feedback type={"invalid"}>{error.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" onChange={handleInput} />
                <Form.Control.Feedback type={"invalid"}>{error.password}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
           
        </Form>
    )
}
export default LoginForm;