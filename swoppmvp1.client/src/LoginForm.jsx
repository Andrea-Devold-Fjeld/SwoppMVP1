import React, {useState, useEffect} from "react"

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

        try {
            const response = fetch('account/login', {
                method: 'POST',
                body: url
            })
            setFetchedData(data);
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
        return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second + ":" + milli +"Z";
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