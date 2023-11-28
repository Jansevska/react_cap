import UserType from "../types/auth"

import Weather from "../components/Weather"
import Container from 'react-bootstrap/Container'

type HomeProps = {
    loggedInUser: Partial<UserType>|null
}

export default function Home({ loggedInUser }: HomeProps) {


    return (
        <>
        <Container fluid>
        <h1>Home</h1>
        { loggedInUser && <h1>Hello {loggedInUser.username}</h1> }
        <Weather />

        </Container>
        </>
    )
}