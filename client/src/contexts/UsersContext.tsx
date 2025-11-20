import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { User, UserNoPass, UsersContextTypes, ChildrenElementProp, LoginCredentials, RegisterBody } from "../types";

const UsersContext = createContext<UsersContextTypes | undefined>(undefined);

const UsersProvider = ({ children }: ChildrenElementProp) => {

    const [user, setUser] = useState<UserNoPass | null>(null);
    const navigate = useNavigate();

    // LOGOUT

    const logout = () => {
        setUser(null);
        localStorage.removeItem("accessJWT");
        sessionStorage.removeItem("accessJWT");
        navigate("/login");
    };

    // LOGIN

    const login = async (
        credentials: LoginCredentials,
        keepLoggedIn: boolean
    ): Promise<{ error?: string, success?: string }> => {
        try {
            const res = await fetch("http://localhost:5500/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            const token = res.headers.get("Authorization");
            if (token) {
                if (keepLoggedIn) {
                    localStorage.setItem("accessJWT", token);
                } else {
                    sessionStorage.setItem("accessJWT", token);
                }
            }

            const data = await res.json();
            if (data.error) {
                return { error: data.error };
            }

            setUser(data.userData);
            navigate("/");

            return { success: data.success };
        } catch {
            return { error: "Could not log you in. Please try again later." }
        }
    }

    // REGISTER 

    const register = async (formData: RegisterBody) => {
        try {
            const res = await fetch("http://localhost:5500/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.error) {
                return { error: data.error }
            };

            setUser(data.userData);
            navigate("/");

            return { success: data.success }
        } catch {
            return { error: "Could not register. Please try again later." }
        }
    };

    // EDIT USER INFO

    const editUser = async (
        updates: Partial<Omit<User, "_id" | "username" | "dob" | "createDate" | "password" | "passwordText">>
    ) => {
        if (!user) {
            return { error: "User is not logged in." }
        }

        const token = localStorage.getItem("accessJWT") || sessionStorage.getItem("accessJWT");

        try {
            const res = await fetch("http://localhost:5500/users/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authotization: `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });

            const data = await res.json();

            if (data.error) {
                return { error: data.error }
            };

            setUser(prev => (prev ? { ...prev, ...updates } : prev));

            return { success: "Profile was successfully updated." }
        } catch {
            return { error: "Your profile could not be updated. Please try again later." }
        }
    };

    // AUTO LOGIN

    useEffect(() => {
        const token = localStorage.getItem("accessJWT") || sessionStorage.getItem("accessJWT");

        if (!token) {
            return;
        };

        if (token) {
            fetch("http://localhost:5500/users/loginAuto", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        logout();
                    } else {
                        setUser(data.userData)
                    }
                })
        }
    }, []);

    return (
        <UsersContext.Provider
            value={{
                user,
                login,
                register,
                editUser,
                logout
            }}
        >
            {children}
        </UsersContext.Provider>
    )
}

export { UsersProvider };
export default UsersContext;