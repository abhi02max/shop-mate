import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("mor_2314");
    const [password, setPassword] = useState("83r5^_");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(username, password);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.message || "Login failed");
        }   
    };
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />  
                </div>
                <div>
                    <label>Password:</label>    
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}       
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;