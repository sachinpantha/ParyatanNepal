// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";
// import { getUserDetails } from "../actions/userActions";
// import toast, { Toaster } from 'react-hot-toast';
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// const UserEditScreen = ({ match }) => {

//     const userId = match.params.id;

//     const navigate = useNavigate();
//     const location = useLocation();
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [type, setType] = useState("password");

//     const dispatch = useDispatch();

//     const userDetails = useSelector((state) => state.userDetails);
//     const { loading, error, user } = userDetails;



//     useEffect(() => {

//     }, []);

//     const handleToggle = () => {
//         setType(type == "password" ? "text" : "password");
//     };
//     const submitHandler = (e) => {
//         e.preventDefault();
//     };

//     return (
//         <>
//             <Link to='/admin/userlist' className="btn btn-light my-3"> Go Back</Link>
//             <FormContainer custom>
//                 <h5 style={{ color: "#DC3535" }}>Edit User</h5>
//                 {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
//                     <Form onSubmit={submitHandler}>
//                         <Form.Group controlId="name">
//                             <Form.Label>Name</Form.Label>
//                             <Form.Control
//                                 type="name"
//                                 required
//                                 autoComplete="off"
//                                 placeholder="Enter name"
//                                 className="form"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                             ></Form.Control>
//                         </Form.Group>

//                         <Form.Group controlId="email">
//                             <Form.Label>Email Address</Form.Label>
//                             <Form.Control
//                                 type="email"
//                                 autoComplete="off"
//                                 required
//                                 placeholder="Enter email"
//                                 value={email}
//                                 className="form"
//                                 onChange={(e) => setEmail(e.target.value)}
//                             ></Form.Control>
//                         </Form.Group>

//                         <Form.Group controlId="isadmin">

//                             <div className="fc-password">
//                                 <Form.Check
//                                     type={"checkbox"}
//                                     autoComplete="off"
//                                     required
//                                     label="Is Admin"
//                                     className="form password"
//                                     checked={isAdmin}
//                                     onChange={(e) => setIsAdmin(e.target.checked)}
//                                 ></Form.Check>
//                                 <span className="icon-holder" onClick={handleToggle}>
//                                     {type == "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
//                                 </span>
//                             </div>
//                         </Form.Group>

//                         <Button style={{ borderRadius: '5px', backgroundColor: '#CF0A0A' }} type="submit" variant="primary">
//                             Update
//                         </Button>
//                     </Form>
//                 )}
//                 {/* {loading && <Loader />} */}

//             </FormContainer>
//         </>
//     );
// };

// export default UserEditScreen;


import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";
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

    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, userId, user]);

    // Toggle isAdmin state on button click
    const toggleAdmin = () => {
        setIsAdmin((prevIsAdmin) => !prevIsAdmin);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        // Handle form submission and user update logic
        toast.success('User updated successfully');
    };

    return (
        <>
            <Link to='/admin/userlist' className="btn btn-light my-3">Go Back</Link>
            <FormContainer custom>
                <h5 style={{ color: "#DC3535" }}>Edit User</h5>
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
