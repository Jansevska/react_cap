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
            <Card border="light" className="">
                <Card.Body>
                    { loggedInUser && <h2>Hello {loggedInUser.username}</h2> }
                    <DiplayWeather />
                </Card.Body>
            </Card>
        </Container>
        </>
    )
}