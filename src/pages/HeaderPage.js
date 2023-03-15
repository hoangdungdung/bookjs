import React, { Component } from 'react';
import * as act from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const LANG_LIB = require('../shared/lang');

class HeaderPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            type: 'book'
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    _handleKeyPress = (e) => {
        //Submit kết quả sau khi người dùng nhấn Enter
        if (e.key === 'Enter') {
            this.submitSearch(this.state.text, this.state.type, this.props.users.uid);
        }
    }


    componentDidMount() {
        //Khởi tạo form select
        window.$(document).ready(function () {
            window.$('select').formSelect();
        });
    }
    render() {
        let { lang } = this.props;
        return (
            <nav style={{ backgroundColor: '#029cb8', maxHeight: 50, justifyContent: 'center' }}>
                <div className="nav-wrapper">
                    <div className="row">
                        <div className="col s2 l2">
                            <Link to="/" className="brand-logo left" style={{ fontSize: 25, marginTop: -5, textAlign: 'center', marginLeft: 70 }}>Gooldshare</Link>
                        </div>
                        <div className="col l7 s6" style={{ marginTop: -5 }}>
                            <input type="text" className="validate" style={{ backgroundColor: 'white', borderRadius: 5, maxHeight: 30 }} value={this.state.text} onChange={this.handleInputChange} name="text" placeholder="Tìm kiếm" onKeyPress={this._handleKeyPress} />
                        </div>
                        <div className="col l1 s1" style={{ position: 'relative', left: -60, top: -5 }} onClick={() => this.submitSearch(this.state.text, this.state.type, this.props.users.uid)}>
                            <a style={{ color: 'blue' }}><i className="material-icons">search</i></a>
                        </div>
                        <div className="col l2 s3" style={{ marginLeft: -60 }}>
                            <select value={this.state.type} onChange={this.handleInputChange} name="type" id="combo-box">
                                <option value="" disabled>Choose your option</option>
                                <option value="book">1-{LANG_LIB[lang].book}:</option>
                                <option value="author">2-{LANG_LIB[lang].author}:</option>
                                <option value="user">3-{LANG_LIB[lang].user}:</option>
                                <option value="category">4-{LANG_LIB[lang].category}:</option>
                            </select>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    submitSearch = (text, type, uid) => {
        //Submit form bằng cách insert vào db sau đó lấy dữ liệu từ db về.
        act.insert_searching(text, type, uid);
        this.setState({
            text: ''
        });
        setTimeout(() => {
            this.props.fetch_dashboard(this.props.users.uid);
        }, 600);
    }
}



const mapStateToProps = state => {
    return {
        users: state.users,
        lang: state.lang
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        //Lấy dữ liệu từ db về
        fetch_dashboard: (uid) => {
            dispatch(act.fetch_dashboard(uid));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(HeaderPage);

