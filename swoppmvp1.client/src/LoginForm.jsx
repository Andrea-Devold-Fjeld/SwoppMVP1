import React, {useState, useEffect} from "react"

function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [fetchedData, setFetchedData] = useState({})

    async function fetchData() {
        let url = new URLSearchParams();
        console.log(email)
        url.append("Email", email);
        url.append("Password", password);
        url.append("Expire", getExpire())

        try {
            const response = fetch('api/account/login', {
                method: 'POST',
                body: url
            });
            setFetchedData(response);
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData();
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
        return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + ":" + milli;
    }


    function handleSubmit(e) {
        e.preventDefault();
        fetchData();
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
/*
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    getExpire(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours() +1;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        let milli = date.getMilliseconds();
        return  year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + ":" + milli;
    }

    handleChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;
        console.log(name, value);
        
        this.setState(
            {
                [name]: value
            }
            );
    }

    const 
    handleSubmit(event) {
        
        //const { resp, setResp } = useState(0);
        alert('A name was submitted: ' + this.state.email.valueOf() + " " + this.state.password.valueOf());
        const data = new URLSearchParams();
        data.append("Email", this.state.email.valueOf());
        data.append("Password", this.state.password.valueOf());
       // data.append("Expire", this.getExpire());
        /*
        useEffect(() => {
            fetch("/api/account/login", {
                method: "POST",
                body: data
            })
                .then(res => res.json())
                .then(data => console.log(data))
            return () =>
                data
        })
        
         */
       // event.preventDefault();
    //}
    //const [username, setUsername] = useState('')
    //const [password, setPassword] = useState('')
    /*
                <Form onSubmit={onSubmit}>
                <Form.Group classname="mb-3" controlId="formGroupLogin">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Groupd classname="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"></Form.Control>
                </Form.Groupd>
                <Button variant="primary"  type="submit">
                    Login
                </Button>
            </Form>
     */
    /*
    render() {
        return (
            <div >
                <div>
                    <h2>Login Form</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Email
                            <input type={"text"} value={this.state.value} onChange={this.handleChange} name={"email"} />
                        </label>
                        <label>
                            Password
                            <input type={"text"} value={this.state.value} onChange={this.handleChange} name={"password"} />
                        </label>
                        <input type={"submit"} name={"submit"} />
                    </form>

                </div></div>
        )
    }

}

export default LoginForm;

     */
