//Importações de designe
import { Col } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button  from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

//Importações de uso
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <Container style={{ paddingTop: '50px' }}>
                <Row className="justify-contente-center">
                    <Col className="text-center">
                        <h1>Flash Card</h1>{/*Título da Página */}
                    </Col>
                </Row>
            </Container>
            <Container>
                <Stack gap={2} className="col-lg-1 mx-auto">
                    {/* Esses 2 links levam para as páginas subsequentes*/}
                    <Link to="/CreateFolder"><Button >Adicionar Pasta</Button></Link>
                    <Link to="/Folders"><Button >Verificar Pastas</Button></Link>
                    
                </Stack>
            </Container>
            
        
        </div>
    )
}

export default Home

