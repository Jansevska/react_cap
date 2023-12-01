import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Navigation from './components/Navigation';
import Home from "./views/Home";
import PostsView from './views/PostsView';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import AlertMessage from './components/AlertMessage';
import EditPost from './views/EditPost';

import CategoryType from './types/category';
import UserType from './types/auth';

import { getMe } from './lib/apiWrapper';
// import Calendar from './components/Calendar';
import UserProfile from './views/UserProfile';
import EditProfile from './views/EditProfile';


export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null)
    const [message, setMessage] = useState<string|null>(null);
    const [category, setCategory] = useState<CategoryType|null>(null);

    useEffect( () => {
        async function getLoggedInUser(){
            if (isLoggedIn){
                const token = localStorage.getItem('token') as string
                const response = await getMe(token);
                if (response.data){
                    setLoggedInUser(response.data)
                } else {
                    console.error(response.error)
                }
            }
        }

        getLoggedInUser();
    }, [isLoggedIn])

    const logUserIn = (user:UserType):void => {
        setIsLoggedIn(true);
        setLoggedInUser(user);
        flashMessage(`${user.username} has been logged in`, 'success');
    }

    const logUserOut = ():void => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        flashMessage('You have logged out', 'info');
    }

    const flashMessage = (newMessage:string|null, newCategory:CategoryType|null): void => {
        setMessage(newMessage);
        setCategory(newCategory);
    }

    return (
        <BrowserRouter>
            <Container data-bs-theme="dark">
                <Navigation isLoggedIn={isLoggedIn} handleLogOut={logUserOut} currentUser={loggedInUser}/>
                {message && category && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/posts" element={<PostsView isLoggedIn={isLoggedIn} flashMessage={flashMessage} currentUser={loggedInUser} />}/>
                    <Route path="/signup" element={<SignUp logUserIn={logUserIn} flashMessage={flashMessage} />} />
                    <Route path="/login" element={<LogIn logUserIn={logUserIn} isLoggedIn={isLoggedIn} flashMessage={flashMessage} />} />
                    <Route path="/posts/:postId" element={<EditPost currentUser={loggedInUser} flashMessage={flashMessage} />} />
                    <Route path="/users" element={<UserProfile currentUser={loggedInUser} flashMessage={flashMessage}/>} />
                    <Route path="/users/:userId" element={<EditProfile currentUser={loggedInUser} flashMessage={flashMessage}/>} />
                    {/* <Route path="/calendar" element={<Calendar/>}/> */}
                </Routes>
            </Container>
        </BrowserRouter>
    );
}
