import React, {useState, useEffect} from "react"
import {useAuth} from "@/AuthProvider.jsx"



const LoginForm = ({children}) => {
    const [input, setInput] = useState({
        Username: "",
        Password: "",
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
        if (input.username !== "" && input.password !== "") {
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
                    name="Username"
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
                    name="Password"
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
/*

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [fetchedData, setFetchedData] = useState({})

    async function fetchData() {
        let url = new URLSearchParams();
        console.log(email)
        url.append("Username", email);
        url.append("Password", password);
        url.append("Expire", getExpire())
        let object = {
            Username: email,
            Password: password
        }

        try {
            const auth = useAuth();
            await auth.loginAction(object);
            /*
            const response = await fetch(`account/login/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(object)
            }).then((response) => response.json({
                Username: email,
                Password: password,
                Expire: getExpire(),
            }))
                .then((json) => console.log(json))
                
             */
/*
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(async () => async function fetchData() {
        let objet = {
            Username: email,
            Password: password
        }
        const auth = useAuth();
        await auth.loginAction(objet);
    }, [])

    function getExpire() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours() + 1;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let milli = date.getMilliseconds();
        return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + ":" + milli +"Z";
    }


    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div>
            <div>
                <h2>Login Form</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email
                        <input type={"text"} value={email} onChange={e => setEmail(e.target.value)} name={"email"}/>
                    </label>
                    <label>
                        Password
                        <input type={"text"} value={password} onChange={e => setPassword(e.target.value)}
                               name={"password"}/>
                    </label>
                    <input type={"submit"} name={"submit"}/>
                </form>

            </div>
        </div>
    )
}
export default LoginForm;
*/