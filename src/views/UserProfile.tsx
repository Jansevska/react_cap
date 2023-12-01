import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import User from "../components/User"
import UserType from "../types/auth"
import { Button } from "react-bootstrap"
import CategoryType from '../types/category'
import { getMe } from '../lib/apiWrapper'
import EditProfile from './EditProfile'


type Props = {
    isLoggedIn:boolean,
    currentUser: UserType|null,
    flashMessage: (message:string, category: CategoryType) => void,
}

export default function UserProfile({ isLoggedIn, currentUser, flashMessage }: Props) {
    const { token } = useParams();
    const [user, setUser] = useState<UserType|null>(null);
    const [displayForm, setDisplayForm] = useState(false);

    useEffect( () => {
        async function fetchData(){
            const response = await getMe(token!)
            if (response.data){
                setUser(response.data)
                console.log(response.data)
                console.log(user)
            }
        };
        fetchData()
    }, [])

    return (
        <>
        <h2 className='display-6 mb-4'>{currentUser?.username}'s Profile</h2>
        <User key={user?.id} currentUser={currentUser} />
        
        { isLoggedIn && <Button variant='outline-primary mb-3' onClick={() => setDisplayForm(!displayForm)}>
                {displayForm ? 'Hide Form' : 'Update Profile'}
            </Button>}

            {displayForm && 
            <EditProfile flashMessage={flashMessage} currentUser={currentUser} />}
        </>
    )
}