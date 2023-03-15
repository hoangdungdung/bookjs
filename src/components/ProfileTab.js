import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ProfileTab extends Component {
    render() {
        let { user_data } = this.props;
        return (
            <Link to='/profile'>
                <div className="row collection-item">
                    <div className="col l4" style={{ marginLeft: 20, marginTop: 20 }}>
                        <img style={{ width: 60, height: 60, borderRadius: 150 }} src={user_data.avatar} alt={user_data.user_name}/>
                    </div>
                    <div className="col l7">
                        <div className="row">
                            <div className="col l12" style={{ marginTop: 20, color: 'black' }}>
                                {user_data.user_name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l12" style={{ marginTop: -10, color: 'black' }}>
                                {user_data.mail_address}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default ProfileTab;
