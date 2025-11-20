import { useFormik } from "formik";
import * as Yup from 'yup';
import styled from "styled-components";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";

import UsersContext from "../../contexts/UsersContext";

const StyledLogin = styled.section`
    
`;

const Login = () => {

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("UsersContext must be used inside a UsersProvider.")
    }
    const { login } = context;

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
            setError(null);
            setLoading(true);

            try {
                const res = await login({
                    username: values.username,
                    password: values.password
                }, values.stayLoggedIn
                );

                if (res.error) {
                    setError(res.error)
                } else {
                    navigate('/')
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("Something went wrong. Please try again later.")
            } finally {
                setLoading(false)
            }
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