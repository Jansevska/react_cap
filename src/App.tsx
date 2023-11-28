import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Navigation from './components/Navigation';
import Home from "./views/Home";
import PostsView from './views/PostsView';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import AlertMessage from './components/AlertMessage';

import CategoryType from './types/category';
import UserType from './types/auth';

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>|null>(null)
    const [message, setMessage] = useState<string|null>(null);
    const [category, setCategory] = useState<CategoryType|null>(null);

    const logUserIn = (user:Partial<UserType>):void => {
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
                <Navigation isLoggedIn={isLoggedIn} handleLogOut={logUserOut}/>
                {message && category && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                <Routes>
                    <Route path="/" element={<Home loggedInUser={loggedInUser} />} />
                    <Route path="/posts" element={<PostsView />} />
                    <Route path="/signup" element={<SignUp logUserIn={logUserIn} flashMessage={flashMessage}/>} />
                    <Route path="/login" element={<LogIn logUserIn={logUserIn} isLoggedIn={isLoggedIn} flashMessage={flashMessage} />} />
                </Routes>
            </Container>
        </BrowserRouter>
    );
}
