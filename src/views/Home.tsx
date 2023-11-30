import UserType from "../types/auth"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import DiplayWeather from "../components/DiplayWeather"

type HomeProps = {
    loggedInUser: Partial<UserType>|null
}

export default function Home({ loggedInUser }: HomeProps) {


    return (
        <>
        <Container fluid>
            <h1 className="display-6 mb-4">Home</h1>
            <Card border="light" className="text-center mb-5">
            <Card.Body>
                { loggedInUser && <h2>Aloha {loggedInUser.username}</h2> }
            </Card.Body>
            </Card>
            <Card border="light" className="">
                <Card.Body>
                    <DiplayWeather />
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}