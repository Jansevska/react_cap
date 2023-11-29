import UserType from "../types/auth"

import Weather from "../components/Weather"
import Container from 'react-bootstrap/Container'
import Calendar from "../components/Calendar"

type HomeProps = {
    loggedInUser: Partial<UserType>|null
}

export default function Home({ loggedInUser }: HomeProps) {


    return (
        <>
        <Container fluid>
        <h1 className="display-6">Home</h1>
        { loggedInUser && <h2>Hello {loggedInUser.username}</h2> }
        <Weather />
        <Calendar/>
        </Container>
        </>
    )
}