import { createContext,useState,useEffect } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    const login = async (username, password) => {
        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if(data.token) {
                const userData = { username, token: data.token };
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                return { success: true };
            }

        }
        catch (error) {
            console.error("Login error:", error);
            return { success: false, message: "Login failed" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
