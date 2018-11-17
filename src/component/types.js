import React from 'react'
import axios from 'axios';

class Types extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [],
            check: false,
        }
    }
    componentWillMount = async () => {
        const getTypes = await axios('http://localhost:3001/types');
        this.setState({
            types: getTypes.data.types,
        });
    }

    displayType = () => {
        const { types } = this.state;
        if (types) {
            return this.state.types.map((type) => {
                return (
                    <div key={type.id} className="col-md-4">
                        <label className="container-check">{type.name}
                            <input type="checkbox" onChange={() => this.props.handleChangeBox()} defaultChecked={this.props.selected.includes(type.id)} id={type.id} name={type.name} />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                )
            })
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    {this.displayType()}
                </div>
            </div>
        );
    }
}

export default Types;