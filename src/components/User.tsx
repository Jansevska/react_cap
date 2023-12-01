import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UserType from "../types/auth";


type Props = {
    currentUser: UserType|null
}

export default function User({ currentUser }: Props) {
    return (
        <Card className='my-3 bg-light' data-bs-theme="dark" >
            {/* <Card.Img variant='top' src={post.imageUrl} /> */}
            <Card.Body >
                <h1 className='display-6 mb-4'>{ currentUser?.firstName } {currentUser?.lastName}</h1>
                <Card.Title>About Me</Card.Title>
                <Card.Text>This part need to be added to the db</Card.Text>
                <Card.Subtitle>
                    <Link to={`/users/${currentUser?.id}`}>
                        <Button variant='outline-light' className='mt-3'>Edit Profile</Button>
                    </Link>
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}