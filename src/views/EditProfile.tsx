import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMe, editUser, deleteUser} from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import UserType from '../types/auth';
import CategoryType from '../types/category';


type Props = {
    currentUser: UserType|null,
    flashMessage: (message:string, category:CategoryType) => void
}

export default function EditProfile({ currentUser, flashMessage }: Props) {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [userToEdit, setUserToEdit] = useState<UserType|null>(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function getUserToEdit(){
            const token = localStorage.getItem('token') || ''
            let response = await getMe(token!);
            if (response.error){
                console.warn(response.error);
            } else {
                setUserToEdit(response.data!);
            }
        }

        getUserToEdit();
    }, []);

    useEffect(() => {
        if (userToEdit && currentUser){
            console.log(userToEdit, currentUser);
            if (userToEdit.id !== currentUser.id){
                flashMessage('You do not have permission to edit this profile.', 'warning');
                navigate('/home');
            }
        }
    }, [userToEdit, currentUser])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUserToEdit({...userToEdit!, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        console.log(token, userId, userToEdit)
        const response = await editUser(token, userId!, userToEdit!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.username}'s profile has been edited`, 'success');
            navigate('/profile')
        }
    }

    const handleDeleteUser = async () => {
        const token = localStorage.getItem('token') || ''
        const response = await deleteUser(token, userId!);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(response.data?.success!, 'primary');
            navigate('/home');
        }
    }

    return (
        <>
            <h1 className="text-center display-6">Edit User's Profile Information</h1>
            {userToEdit && (
                <Card className='mt-3' data-bs-theme="light" >
                    <Card.Body>
                        <Form onSubmit={handleFormSubmit}>
                            <Form.Label>Edit First Name</Form.Label>
                            <Form.Control name='firstName' value={userToEdit.firstName} onChange={handleInputChange} />

                            <Form.Label>Edit Last Name</Form.Label>
                            <Form.Control name='lastName' value={userToEdit.lastName} onChange={handleInputChange} />

                            <Form.Label>Edit Email</Form.Label>
                            <Form.Control name='email' value={userToEdit.email} onChange={handleInputChange} />

                            <Form.Label>Edit Username</Form.Label>
                            <Form.Control name='username' value={userToEdit.username} onChange={handleInputChange} />
                            
                            <Button variant='outline-success' className='mt-3 w-25' type='submit'>Edit Profile</Button>
                            <Button variant='outline-danger' className='mt-3 ms-4 w-25' onClick={handleShow}>Delete Profile</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {userToEdit?.username} profile?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {userToEdit?.username}'s profile? This action cannot be undone!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Delete Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}