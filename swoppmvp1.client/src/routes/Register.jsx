

export default function Register() {
    return (
        <div className={"content"}>
            <form method="POST" action="/account/register">
                <label htmlFor="inputEmail">Email</label>
                <input type="email"  name="Email" id="inputEmail" />
                <label htmlFor="inputPassword">Password</label>
                <input type="password"  name="Password" id="inputPassword" />
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}