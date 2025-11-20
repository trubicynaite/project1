import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link } from "react-router";
import * as Yup from 'yup';
import styled from "styled-components";

import UsersContext from "../../contexts/UsersContext";

const StyledReg = styled.section`
    
`;

const Register = () => {

    const [error, setError] = useState<string | null>(null);

    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("UsersContext must be used inside a UsersProvider.")
    }
    const { register } = context;

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            dob: '',
            password: '',
            passwordRepeat: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(5, 'Username must must contain at least 5 symbols.')
                .max(20, 'Username must be shorter than 20 symbols.')
                .required('Field cannot be empty.')
                .trim(),
            email: Yup.string()
                .email('Must be a valid email.')
                .required('Field cannot be empty.')
                .trim(),
            firstName: Yup.string()
                .min(5, 'First name must must contain at least 2 symbols.')
                .required('Field cannot be empty.')
                .trim(),
            lastName: Yup.string()
                .min(5, 'Last name must must contain at least 2 symbols.')
                .required('Field cannot be empty.')
                .trim(),
            dob: Yup.date()
                .min(new Date(1900), 'Date must be later than 1900.')
                .max(new Date(new Date().setFullYear(new Date().getFullYear() - 14)), 'You must be at least 14 years old.')
                .required('Field cannot be empty.'),
            password: Yup.string()
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,20}$/, 'Password must contain at least one: lower case character, upper case character, number, special symbol & must be between 7 and 20 symbols length.')
                .required('Field cannot be empty.')
                .trim(),
            passwordRepeat: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords do not match.')
                .required('Field cannot be empty.')
                .trim(),
        }),
        onSubmit: async (values) => {
            setError("");

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { passwordRepeat, ...formData } = values;

            try {
                const res = await register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    dob: formData.dob
                });

                if (res.error) {
                    setError(res.error);
                    return;
                }
                formik.resetForm();
            } catch {
                setError("Something went wrong. Please try again later.")
            }
        }
    })
    return (
        <StyledReg>
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text"
                        name="username" id="username"
                        placeholder="Create username."
                        value={formik.values.username}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.username && formik.errors.username &&
                        <p>{formik.errors.username}</p>
                    }
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        name="email" id="email"
                        placeholder="Enter your email."
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.email && formik.errors.email &&
                        <p>{formik.errors.email}</p>
                    }
                </div>
                <div>
                    <label htmlFor="firstName">First name:</label>
                    <input type="text"
                        name="firstName" id="firstName"
                        placeholder="Enter your first name."
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.firstName && formik.errors.firstName &&
                        <p>{formik.errors.firstName}</p>
                    }
                </div>
                <div>
                    <label htmlFor="lastName">Last name:</label>
                    <input type="text"
                        name="lastName" id="lastName"
                        placeholder="Enter your last name."
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.lastName && formik.errors.lastName &&
                        <p>{formik.errors.lastName}</p>
                    }
                </div>
                <div>
                    <label htmlFor="dob">Date of birth:</label>
                    <input type="date"
                        name="dob" id="dob"
                        placeholder="Enter your last date of birth."
                        value={formik.values.dob}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.dob && formik.errors.dob &&
                        <p>{formik.errors.dob}</p>
                    }
                </div>
                <div>
                    <label htmlFor="password">Create password:</label>
                    <input type="password"
                        name="password" id="password"
                        placeholder="Create password."
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.password && formik.errors.password &&
                        <p>{formik.errors.password}</p>
                    }
                </div>
                <div>
                    <label htmlFor="passwordRepeat">Repeat password:</label>
                    <input type="password"
                        name="passwordRepeat" id="passwordRepeat"
                        placeholder="Repeat your created password."
                        value={formik.values.passwordRepeat}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.passwordRepeat && formik.errors.passwordRepeat &&
                        <p>{formik.errors.passwordRepeat}</p>
                    }
                </div>
                <input type="submit" value="Register" />
                {
                    error && <p>{error}</p>
                }
            </form>
            <Link to="/login">Already have an account? Go login.</Link>
        </StyledReg>
    );
}

export default Register;