
import Container from 'react-bootstrap/Container'
import DiplayWeather from "../components/DiplayWeather"


export default function Home() {


    return (
        <>
        <Container fluid>
            <h1 className="display-6 mb-4 text-center">Home</h1>
            <Container>
                
                    <DiplayWeather />
                
            </Container>
        </Container>
        </>
    )
}