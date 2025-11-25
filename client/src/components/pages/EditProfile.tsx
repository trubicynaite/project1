import { useContext, useState, useEffect } from "react";
import styled from "styled-components";

import UsersContext from "../../contexts/UsersContext";
import { UserNoPass, ProfileEditForm } from "../../types";

const StyledEditProfile = styled.section`
    
`;

const EditProfile = () => {

    const { user, editUser } = useContext(UsersContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<ProfileEditForm>({
        email: "",
        firstName: "",
        lastName: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            setFormData({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: ""
            });
        }
    }, [user]);

    if (!user) {
        return (
            <StyledEditProfile>
                <h2>Please log in to view your profile.</h2>
            </StyledEditProfile>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const updates: Partial<UserNoPass> & { password?: string } = {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName
            };

            if (formData.password && formData.password.trim() !== "") {
                updates.password = formData.password
            }

            const res = await editUser(updates);

            if (res.error) {
                setMessage(`Error ${res.error}`)
            } else {
                setMessage("Your prifile was successfully updated.");
                setIsEditing(false);
                setFormData(prev => ({ ...prev, password: "" }))
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setMessage("Something went wrong. Please try again later.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <StyledEditProfile>
            <h2>My profile</h2>
            <div className="nonEditable">
                <label>Username:</label>
                <div>{user.username}</div>
            </div>
            <div className="nonEditable">
                <label>Date of Birth:</label>
                <div>{user.dob}</div>
            </div>
            <div className="nonEditable">
                <label>Account create date:</label>
                <div>{user.createDate}</div>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                />
                <label>First name:</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                />
                <label>Last name:</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                />
                <label>New password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                    autoComplete="new-password"
                />

                {isEditing ? (
                    <>
                        <button type="submit" disabled={loading}>
                            {loading ? "Saving" : "Save"}
                        </button>
                        <button type="button"
                            onClick={() => {
                                setFormData({
                                    email: user.email,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    password: ""
                                });
                                setIsEditing(false);
                                setMessage("")
                            }}
                        >Cancel</button>
                    </>
                ) : (
                    <button type="button"
                        onClick={() => setIsEditing(true)}
                    >Edit</button>
                )}
            </form>
            {message && <p>{message}</p>}
        </StyledEditProfile>
    );
}

export default EditProfile;