import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import RegisterUser from '../component/registerUser';
import RegisterCooker from '../component/registerCooker';
import Login from '../component/login';

class IndexLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col lg="4">
                        <h5 className="text-center">Connexion</h5>
                        <Login />
                    </Col>
                    <Col lg="4">
                        <h5 className="text-center">S'enregistrer</h5>
                        <RegisterUser />
                    </Col>
                    <Col lg="4">
                        <h5 className="text-center">S'enregistrer en tant que cuisinier</h5>
                        <RegisterCooker />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default IndexLog;