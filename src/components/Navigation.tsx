import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

type Props = {
    isLoggedIn: boolean,
    handleLogOut: ()=>void
}

export default function Navigation({ isLoggedIn, handleLogOut }: Props) {
    return (
        <>
            <Navbar className='mb-4' expand="lg" bg="primary" data-bs-theme="dark">
                <Container fluid >
                    <Navbar.Brand as={Link} to='/'>Hoe Hui</Navbar.Brand>
                    <Nav className="me-auto">
                    { isLoggedIn ? (
                        <>
                        <Nav.Link as={Link} to='/posts'>Posts</Nav.Link>
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
                        Signed in as: <a href="#login">{ "New User" }</a>
                    </Navbar.Text>
                </Container>
            </Navbar>
        </>
    )
}