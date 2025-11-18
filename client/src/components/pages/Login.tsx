import { useFormik } from "formik";
import * as Yup from 'yup';
import styled from "styled-components";
import { useState } from "react";
import { useNavigate, Link } from "react-router";

const StyledLogin = styled.section`
    
`;

const Login = () => {

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            stayLoggedIn: false
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Field cannot be empty.')
                .trim(),
            password: Yup.string()
                .required('Field cannot be empty.')
                .trim()
        }),
        onSubmit: async (values) => {

        }
    })

    return (
        <StyledLogin>
            <h2>Login</h2>
            {
                loading ?
                    <p>Please wait, the page is loading.</p> :
                    <>
                        <form>
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input type="text"
                                    name="username" id="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.errors.username && formik.touched.username &&
                                    <p>{formik.errors.username}</p>
                                }
                            </div>
                            <div>
                                <label htmlFor="password">Username:</label>
                                <input type="password"
                                    name="password" id="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {
                                    formik.errors.password && formik.touched.password &&
                                    <p>{formik.errors.password}</p>
                                }
                            </div>
                            <div className="checkbox">
                                <input type="checkbox"
                                    name="stayLoggedIn" id="stayLoggedIn"
                                    checked={formik.values.stayLoggedIn}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor="stayLoggedIn" className="loggedIn">Keep me logged in</label>
                            </div>
                            <input type="submit" value="Log In" />
                        </form>
                        {
                            error && <p>{error}</p>
                        }
                        <Link to="/login">Already have an account? Go login.</Link>
                    </>
            }
        </StyledLogin>
    );
}

export default Login;