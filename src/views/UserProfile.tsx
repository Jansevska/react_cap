import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import User from "../components/User"
import UserType from "../types/auth"
import CategoryType from '../types/category'
import { getMe } from '../lib/apiWrapper'
import EditProfile from './EditProfile'


type Props = {
    currentUser: UserType|null,
    flashMessage: (message:string, category: CategoryType) => void,
}

export default function UserProfile({ currentUser, flashMessage }: Props) {
    const { token } = useParams();
    const [user, setUser] = useState<UserType|null>(null);
    const [displayProfile, setDisplayProfile] = useState(false);

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
    }, [setDisplayProfile])

    return (
        <>
        <h2 className='display-6 mb-4 text-center'>{currentUser?.username}'s Profile</h2>
        <User key={user?.id} currentUser={currentUser} />

            {displayProfile && 
            <EditProfile flashMessage={flashMessage} currentUser={currentUser}/>}
        </>
    )
}