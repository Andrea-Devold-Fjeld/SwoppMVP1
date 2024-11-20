import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {registerHooks} from "@/hooks/AccountHooks.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import PasswordChecklist from "react-password-checklist"


export default function Register() {
    const [inputEmail, setEmail] = useState("");
    const [error, setError] = useState({});
    const [inputPassword, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    
    console.log("Email", inputEmail);
    console.log("Password", inputPassword);
    //regex for password validation
    //(?=.{6,20}$)(?=[A-Å]{1})(?=.*[@#$%^&+=\-_!])\D*\d
    //(?=.{6,20}$) - password length between 6-20 characters
    //(?=[A-Å]{1}) - password must contain at least one letter
    //(?=.*[@#$%^&+=\-_!]) - password must contain at least one special character
    //\D*\d - password must contain at least one digit
    
    //regex for email validation
    //^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
    //^[\w-\.]+ - email must start with a word character, a dot or a hyphen
    //@ - email must contain an @ symbol
    //([\w-]+\.)+ - email must contain a word character or a hyphen followed by a dot
    //[\w-]{2,4}$ - email must end with a word character or a hyphen between 2-4 characters
    
    const validateEmail = (email) => {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    }
    const validatePassword = (password) => {
        const regex = /(?=.{6,20}$)(?=[A-Å]{1})(?=.*[@#$%^&+=\-_!])\D*\d/;
        return regex.test(password);
    }
    const navigate = useNavigate();
    const handleChange = async (e) => {
        setEmail(e.target.value);
        if ( !!error[e.target.name] ) setError({
            ...error,
            [e.target.name]: null
        })
    }
    
    const findFormErrors = () => {
        const {email, password} = {"email": inputEmail, "password": inputPassword};
        const newErrors = {};
        // email errors
        if (!email || email === "") newErrors.email = "Email is required!";
        else if (!validateEmail(email)) newErrors.email = "Invalid email!";
        // password errors
        if (!password || password === "") newErrors.password = "Password is required!";
        else if (!validatePassword(password)) newErrors.password = "Password must contain at least 6 characters, one letter, one digit and one special character!";
        return newErrors;
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        //inputValue.password = password;
        //console.log("Handle submit", inputValue);
        const findErrors = findFormErrors();
        if (Object.keys(findErrors).length > 0) {
            setError(findErrors);
            return;
        }
        const user = {
            email: inputEmail,
            password: inputPassword
        }
        console.log("User", user);
        registerHooks(user)
            .then((response) => {
                console.log(response);
                if(response.status === 200){
                    console.log("Registered");
                    navigate("/login");
                }
                else if(response.status === 400) {
                    console.log("Error");
                    setError("Username is already registered");
                }
            })

    }
    
    return (
        <div id={"register"} className={"form mb-3 dashboard"}>
            <Form className={"mb-3"} onSubmit={handleSubmit}>
                <Form.Group className={"mb-3"} controlId={"formBasicEmail"}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type={"email"} 
                        placeholder={"Enter email"} 
                        name={"email"}
                        onChange={e =>setEmail(e.target.value)}/>
                    <Form.Control.Feedback type={"invalid"}>{error.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicPassword"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type={"password"} 
                        placeholder={"Password"} 
                        name={"password"}
                        onChange={e => setPassword(e.target.value)}/>
                    <Form.Control.Feedback type={"invalid"}>{error.password}</Form.Control.Feedback>
                    
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="passwordAgain" onChange={e => setPasswordAgain(e.target.value)} />
                    <Form.Control.Feedback type={"invalid"}>{error.password}</Form.Control.Feedback>
                    <PasswordChecklist
                        rules={["minLength","specialChar","number","capital","match"]}
                        minLength={6}
                        value={inputPassword}
                        valueAgain={passwordAgain}
                        onChange={(isValid) => {console.log(isValid); if(isValid){setPasswordValid(true)}}} />
                </Form.Group>
                <div className={"text-center"}>
                    {passwordValid ? <Button variant="primary" type="submit">Register</Button> :
                        <Button disabled variant="secondary" type="submit">Register</Button>}
                </div>
            </Form>
        </div>

    )
}