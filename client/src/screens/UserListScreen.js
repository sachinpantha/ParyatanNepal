// import React, { useEffect } from 'react'
// import { LinkContainer } from 'react-router-bootstrap'
// import { Table, Button } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import { listUsers } from '../actions/userActions'

// const UserListScreen = () => {
//     const dispatch = useDispatch()
//     const userList = useSelector(state => state.userList)
//     const { loading, error, users } = userList

//     useEffect(() => {
//         dispatch(listUsers())
//     }, [dispatch])

//     const deleteHandler = (id) => {
//         console.log('delete')
//     }

//     return (
//         <>
//             <h1>Users</h1>
//             {loading ? (
//                 <Loader />
//             ) : error ? (
//                 <Message variant="danger">{error}</Message>
//             ) : (
//                 <Table striped bordered hover responsive className="table-sm">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>NAME</th>
//                             <th>EMAIL</th>
//                             <th>ADMIN</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user._id}>
//                                 <td>{user._id}</td>
//                                 <td>{user.name}</td>
//                                 <td>
//                                     <a href={`mailto:${user.email}`}>{user.email}</a>
//                                 </td>
//                                 <td>
//                                     {user.isAdmin ? (
//                                         <i className="fas fa-check" style={{ color: 'green' }}></i>
//                                     ) : (
//                                         <i className="fa fa-times" style={{ color: 'red' }}></i>
//                                     )}
//                                 </td>
//                                 <td>
//                                     <LinkContainer to={`/user/${user._id}/edit`}>
//                                         <Button variant="light" className="btn-sm">
//                                             <i className="fas fa-edit"></i>
//                                         </Button>
//                                     </LinkContainer>
//                                     <Button
//                                         variant="danger"
//                                         className="btn-sm"
//                                         onClick={() => deleteHandler(user._id)}
//                                     >
//                                         <i className="fas fa-trash"></i>
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             )}
//         </>
//     )
// }

// export default UserListScreen


// import React, { useEffect, useState } from 'react'
// import { LinkContainer } from 'react-router-bootstrap'
// import { Table, Button, Form } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
// import { listUsers } from '../actions/userActions'

// const UserListScreen = () => {
//     const [sortOrder, setSortOrder] = useState('asc')
//     const [sortBy, setSortBy] = useState('name')
//     const [searchTerm, setSearchTerm] = useState('')

//     const dispatch = useDispatch()

//     const userList = useSelector((state) => state.userList)
//     const { loading, error, users } = userList

//     useEffect(() => {
//         dispatch(listUsers())
//     }, [dispatch])

//     // Sorting Function
//     const sortedUsers = users
//         ? [...users].sort((a, b) => {
//             if (sortBy === 'name') {
//                 return sortOrder === 'asc'
//                     ? a.name.localeCompare(b.name)
//                     : b.name.localeCompare(a.name)
//             } else if (sortBy === 'email') {
//                 return sortOrder === 'asc'
//                     ? a.email.localeCompare(b.email)
//                     : b.email.localeCompare(a.email)
//             }
//             return 0
//         })
//         : []

//     // Search Function
//     const filteredUsers = sortedUsers.filter((user) =>
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//     )

//     const deleteHandler = (id) => {
//         console.log('delete')
//     }

//     return (
//         <>
//             <h1>Users</h1>

//             {/* Sorting Controls */}
//             <Form.Group controlId="sortBy">
//                 <Form.Label>Sort By:</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                 >
//                     <option value="name">Name</option>
//                     <option value="email">Email</option>
//                 </Form.Control>
//             </Form.Group>

//             <Form.Group controlId="sortOrder">
//                 <Form.Label>Sort Order:</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={sortOrder}
//                     onChange={(e) => setSortOrder(e.target.value)}
//                 >
//                     <option value="asc">Ascending</option>
//                     <option value="desc">Descending</option>
//                 </Form.Control>
//             </Form.Group>

//             {/* Search Control */}
//             <Form.Group controlId="searchTerm">
//                 <Form.Label>Search Users:</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter name or email"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//             </Form.Group>

//             {loading ? (
//                 <Loader />
//             ) : error ? (
//                 <Message variant="danger">{error}</Message>
//             ) : (
//                 <Table striped bordered hover responsive className="table-sm">
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>NAME</th>
//                             <th>EMAIL</th>
//                             <th>ADMIN</th>
//                             <th></th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredUsers.map((user) => (
//                             <tr key={user._id}>
//                                 <td>{user._id}</td>
//                                 <td>{user.name}</td>
//                                 <td>
//                                     <a href={`mailto:${user.email}`}>
//                                         {user.email}
//                                     </a>
//                                 </td>
//                                 <td>
//                                     {user.isAdmin ? (
//                                         <i
//                                             className="fas fa-check"
//                                             style={{ color: 'green' }}
//                                         ></i>
//                                     ) : (
//                                         <i
//                                             className="fa fa-times"
//                                             style={{ color: 'red' }}
//                                         ></i>
//                                     )}
//                                 </td>
//                                 <td>
//                                     <LinkContainer
//                                         to={`/user/${user._id}/edit`}
//                                     >
//                                         <Button
//                                             variant="light"
//                                             className="btn-sm"
//                                         >
//                                             <i className="fas fa-edit"></i>
//                                         </Button>
//                                     </LinkContainer>
//                                     <Button
//                                         variant="danger"
//                                         className="btn-sm"
//                                         onClick={() => {
//                                             deleteHandler(user._id)
//                                         }}
//                                     >
//                                         <i className="fas fa-trash"></i>
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             )}
//         </>
//     )
// }

// export default UserListScreen


import React, { useEffect, useState, useMemo } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'

const UserListScreen = () => {
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortBy, setSortBy] = useState('name')
    const [searchTerm, setSearchTerm] = useState('')

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])

    // Sorting and Filtering with useMemo for optimization
    const filteredUsers = useMemo(() => {
        if (!users) return []
        return users
            .filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (sortBy === 'name') {
                    return sortOrder === 'asc'
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name)
                } else if (sortBy === 'email') {
                    return sortOrder === 'asc'
                        ? a.email.localeCompare(b.email)
                        : b.email.localeCompare(a.email)
                }
                return 0
            })
    }, [users, sortOrder, sortBy, searchTerm])

    // Calculate the total number of users and admins
    const totalUsers = filteredUsers.length
    const totalAdmins = filteredUsers.filter(user => user.isAdmin).length

    const deleteHandler = (id) => {
        console.log('delete')
    }

    return (
        <>
            <h1 className="my-4">Users</h1>

            {/* Display total number of users and admins */}
            <div className="mb-4">
                <h5>Total Users: {totalUsers}</h5>
                <h5>Total Admins: {totalAdmins}</h5>
            </div>

            {/* Sorting Controls */}
            <Form.Group controlId="sortBy" className="mb-3">
                <Form.Label><strong>Sort By:</strong></Form.Label>
                <Form.Control
                    as="select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select bg-white border-dark"
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="sortOrder" className="mb-3">
                <Form.Label><strong>Sort Order:</strong></Form.Label>
                <Form.Control
                    as="select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="form-select bg-white border-dark"
                >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </Form.Control>
            </Form.Group>

            {/* Search Control */}
            <Form.Group controlId="searchTerm" className="mb-4">
                <Form.Label><strong>Search Users:</strong></Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control bg-white border-dark"
                />
            </Form.Group>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i
                                            className="fas fa-check"
                                            style={{ color: 'green' }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="fa fa-times"
                                            style={{ color: 'red' }}
                                        ></i>
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <LinkContainer to={`/user/${user._id}/edit`}>
                                            <Button
                                                variant="light"
                                                className="btn-sm"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() => {
                                                deleteHandler(user._id)
                                            }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen
