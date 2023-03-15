import React, { Component } from 'react';


class NotFound extends Component {
    render() {
        let { text } = this.props;
        return (
            <div className="col l12 s12">
                <div className="card">
                    <div className="card-content">
                        <div className="row" style={{ marginLeft: 10 }}>
                            {text}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default NotFound;

