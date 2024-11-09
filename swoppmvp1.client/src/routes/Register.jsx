import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {registerHooks} from "@/hooks/AccountHooks.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [inputValue, setInputValue] = useState({});
    
    const navigate = useNavigate();
    const handleChange = async (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: inputValue.email,
            password: inputValue.password
        }
        registerHooks(user)
            .then((response) => {
                console.log(response);
                if(response.status === 200){
                    console.log("Registered");
                    navigate("/login");
                }
            })

    }
    
    return (
        <div id={"register"} className={"form mb-3"}>
            <Form className={"mb-3"} onSubmit={handleSubmit}>
                <Form.Group className={"mb-3"} controlId={"formBasicEmail"}>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type={"email"} 
                        placeholder={"Enter email"} 
                        name={"email"}
                        onChange={handleChange}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"formBasicPassword"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type={"password"} 
                        placeholder={"Password"} 
                        name={"password"}
                        onChange={handleChange}/>
                </Form.Group>
                <Button variant={"primary"} type={"submit"}>Register</Button>
            </Form>
        </div>
     
    )
}