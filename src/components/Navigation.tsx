import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
// import { FaUser } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";

type Props = {
    isLoggedIn: boolean,
    handleLogOut: ()=>void
}

export default function Navigation({ isLoggedIn, handleLogOut}: Props) {
    return (
        <>
        {/* <style type="text/css">
            {`.navbar {background-color: blue; color: black}`}
        </style> */}
            <Navbar sticky="top" className='mb-4 fs-5' expand="lg" data-bs-theme="dark">
                <Container fluid >
                    <Navbar.Brand as={Link} to='/' className='display-1 fs-2'>Hoe Hui</Navbar.Brand>
                    <Nav className="me-auto">
                    { isLoggedIn ? (
                        <>
                        <Nav.Link as={Link} to='/users'>Profile</Nav.Link>
                        <Nav.Link as={Link} to='/posts'>Posts</Nav.Link>
                        <Nav.Link as={Link} to='/calendar'>Calendar</Nav.Link>
                        <Nav.Link as={Link} to='/' onClick={handleLogOut}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                        <Nav.Link as={Link} to="login">Sign In</Nav.Link>
                        <Nav.Link as={Link} to="signup">Sign Up</Nav.Link>
                        </>
                    )}
                    </Nav>
                    {/* Add logic -> isLoggedIn */}
                    <Navbar.Text className='me-2'>
                        <FaUserEdit className="userIcon me-3 mb-2"/><a className='userId' href="#login">{"Username"}</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    )
}