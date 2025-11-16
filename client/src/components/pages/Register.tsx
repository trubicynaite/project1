import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import styled from "styled-components";

const StyledReg = styled.section`
    
`;

const Register = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);

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

        }
    })
    return (
        <StyledReg>

        </StyledReg>
    );
}

export default Register;