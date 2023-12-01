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
                <p className="mb-5">{ currentUser?.email }</p>
                <Card.Title>About Me</Card.Title>
                <Card.Text>I'm not sure what to write about me right now... I'll leave this for later.</Card.Text>
                <Card.Subtitle>
                    <Link to={`/users/:userId${currentUser?.id}`}>
                        <Button variant='outline-primary' className='mt-3'>Edit Profile</Button>
                        <Button variant='outline-danger' className='mt-3 ms-4'>Delete Profile</Button>
                    </Link>
                </Card.Subtitle>
            </Card.Body>
        </Card>
    )
}