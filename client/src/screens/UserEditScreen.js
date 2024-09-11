import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import toast, { Toaster } from 'react-hot-toast';

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        }
        else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }

    }, [dispatch, userId, user, navigate, successUpdate]);

    // Toggle isAdmin state on button click
    const toggleAdmin = () => {
        setIsAdmin((prevIsAdmin) => !prevIsAdmin);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
        // Handle form submission and user update logic
        toast.success('User updated successfully');
    };

    return (
        <>
            <Link to='/admin/userlist' className="btn btn-light my-3">Go Back</Link>
            <FormContainer custom>
                <h5 style={{ color: "#DC3535" }}>Edit User</h5>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                autoComplete="off"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                autoComplete="off"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        {/* Styled Button to toggle isAdmin */}
                        <Form.Group controlId="isadmin">
                            <Button
                                type="button"
                                onClick={toggleAdmin}
                                style={{
                                    backgroundColor: isAdmin ? "#28a745" : "#DC3535",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginBottom: "10px"
                                }}
                            >
                                {isAdmin ? "Admin User" : "Make Admin"}
                            </Button>
                        </Form.Group>

                        <Button style={{ borderRadius: '5px', backgroundColor: '#CF0A0A' }} type="submit">
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
            <Toaster />
        </>
    );
};

export default UserEditScreen;
