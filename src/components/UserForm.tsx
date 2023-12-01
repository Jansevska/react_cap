import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import UserType from '../types/auth';
import CategoryType from '../types/category';
import { editUser } from '../lib/apiWrapper';

type Props = {
    currentUser: UserType|null
    setDisplay: (display:boolean) => void,
    setForm: (form:boolean) => void,
    toggle: boolean
    flashMessage: (message:string, category: CategoryType) => void,
}

export default function UserForm({ currentUser, setDisplay, setForm, toggle, flashMessage }: Props) {

    const [userFormData, setUserFormData] = useState<Partial<UserType>>({firstName:'', lastName:'', email:'', username:''})

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value})
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editUser(token, userFormData);
        if (response.error){
            flashMessage(response.error, 'danger');
        } else {
            flashMessage(`${response.data?.username}'s profile has been updated`, 'info');
            setDisplay(false);
            setForm(!toggle);
        }
    }

    return (
        <>
        <h1 className="text-center">Edit {currentUser?.username}'s' Profile</h1>
        <Card className='mt-3' border="light" data-bs-theme="light" >
            <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label htmlFor='firstName'>First Name</Form.Label>
                    <Form.Control value={userFormData.firstName} name='firstName' onChange={handleInputChange} />

                    <Form.Label htmlFor='lastName'>Last Name</Form.Label>
                    <Form.Control value={userFormData.lastName} name='lastName' onChange={handleInputChange} />

                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control value={userFormData.email} name='email' type='email' onChange={handleInputChange} />

                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control value={userFormData.username} name='username' onChange={handleInputChange} />

                    <Button type='submit' variant='outline-primary' className='w-100 mt-3'>Update</Button>
                </Form>
            </Card.Body>
        </Card>
    </>
    )
}