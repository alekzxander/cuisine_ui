import React from 'react'
import { Row, Col } from 'reactstrap';
import RegisterUser from '../component/registerUser';
import RegisterCooker from '../component/registerCooker';

class IndexLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="container">
                <div id="connect">
                    <h3 className="text-center">Creer un compte</h3>
                    <Row>
                        <div className="col-lg-1"></div>
                        <Col lg="4">
                            <div className="title-card">
                                <h5 className="text-center">Particulier</h5>
                            </div>
                            <RegisterUser />
                        </Col>
                        <div className="col-lg-2">
                            <div className="separator"></div>
                        </div>

                        <Col lg="4">
                            <div className="title-card">
                                <h5 className="text-center">Cuisinier</h5>
                            </div>
                            <RegisterCooker />
                        </Col>
                        <div className="col-lg-1"></div>
                    </Row>
                </div>
            </div>
        );
    }
}

export default IndexLog;