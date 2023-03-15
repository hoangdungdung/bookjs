import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as act from '../actions/index';
import { connect } from 'react-redux';


class MenuTab extends Component {
    render() {
        let { icon, text, id, web } = this.props;
        return (
            <div>
                {
                    web === undefined || id === 'log_out' ?
                        <div style={{ marginLeft: 20, marginTop: 10 }} onClick={() => this.onClickMenu(id)}>
                            <div className="row" style={{ borderRadius: 10 }}>
                                <div className="col l1 s2">
                                    <img style={{ maxHeight: 25, maxWidth: 25, verticalAlign: 'center', marginTop: 5 }} src={icon} alt={text} />
                                </div>
                                <div className="col l11 s10" style={{ marginTop: 8, color: 'black' }}>
                                    {text}
                                </div>
                            </div>
                        </div>
                        :
                        <Link to={`/${id}`}>
                            <div style={{ marginLeft: 20, marginTop: 10 }} onClick={() => this.onClickMenu(id)}>
                                <div className="row" style={{ borderRadius: 10 }}>
                                    <div className="col l1 s2">
                                        <img style={{ maxHeight: 25, maxWidth: 25, verticalAlign: 'center', marginTop: 5 }} src={icon} alt={text} />
                                    </div>
                                    <div className="col l11 s10" style={{ marginTop: 8, color: 'black' }}>
                                        {text}
                                    </div>
                                </div>
                            </div>
                        </Link>
                }
            </div>

        );
    }
    // nếu id của menu bằng log_out thì đăng xuất.
    onClickMenu = (id) => {
        switch (id) {
            case 'log_out':
                this.props.logout();
                break;
            default:
                break;
        }
    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        logout: () => {
            dispatch(act.logout());
        }
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        user_data: state.user_data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuTab);

