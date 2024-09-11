import React, { useEffect, useState, useMemo } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
    const [sortOrder, setSortOrder] = useState('asc')
    const [sortBy, setSortBy] = useState('name')
    const [searchTerm, setSearchTerm] = useState('')
    const [sortTime, setSortTime] = useState(null)

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    let navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        }
        else {
            navigate("/");
        }
    }, [dispatch, navigate, userInfo, successDelete])

    // Quick Sort Algorithm to sort users
    const quickSort = (arr, key, order) => {
        if (arr.length <= 1) return arr
        const pivot = arr[arr.length - 1]
        const left = []
        const right = []

        for (let i = 0; i < arr.length - 1; i++) {
            const comparison = order === 'asc'
                ? arr[i][key].localeCompare(pivot[key])
                : pivot[key].localeCompare(arr[i][key])
            if (comparison < 0) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return [...quickSort(left, key, order), pivot, ...quickSort(right, key, order)]
    }

    // Binary Search Algorithm to find users
    const binarySearch = (arr, key, searchValue) => {
        let left = 0
        let right = arr.length - 1

        while (left <= right) {
            const mid = Math.floor((left + right) / 2)
            const midValue = arr[mid][key].toLowerCase()

            if (midValue === searchValue.toLowerCase()) {
                return [arr[mid]] // Return an array with the found user
            }
            if (midValue < searchValue.toLowerCase()) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }

        return [] // If not found, return an empty array
    }

    // Sorting and Filtering with useMemo for optimization
    const filteredUsers = useMemo(() => {
        if (!users) return []
        let filtered = users

        if (searchTerm) {
            // Sort first before performing binary search
            const sorted = quickSort(users, sortBy, sortOrder)

            // Apply binary search on sorted list
            filtered = binarySearch(sorted, sortBy, searchTerm)

            if (filtered.length === 0) {
                filtered = users.filter(user =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user._id.includes(searchTerm)
                )
            }
        } else {
            // Apply normal filtering and sorting when no search term is entered
            filtered = users.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user._id.includes(searchTerm)
            )
        }

        const startTime = performance.now()
        const sortedUsers = quickSort(filtered, sortBy, sortOrder)
        const endTime = performance.now()
        setSortTime((endTime - startTime) / 1000) // Time in seconds
        return sortedUsers
    }, [users, sortOrder, sortBy, searchTerm])

    // Calculate the total number of users and admins
    const totalUsers = filteredUsers.length
    const totalAdmins = filteredUsers.filter(user => user.isAdmin).length

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {

            dispatch(deleteUser(id))
        }
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
                    placeholder="Enter name, email, or ID"
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
                <>
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
                                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
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
                    {sortTime !== null && (
                        <div className="my-3">
                            <h5>Time Taken for Sorting: {sortTime.toFixed(6)} seconds</h5>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default UserListScreen
