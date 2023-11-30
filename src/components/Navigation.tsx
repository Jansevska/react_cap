import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

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
                    <Navbar.Text>
                        Signed in as: <a href="#login">{"Emili"}</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    )
}