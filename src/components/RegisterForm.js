import React, { Component } from 'react';
import { connect } from 'react-redux';
var firebase = require('../shared/firebaseDB');
const LANG_LIB = require('../shared/lang');

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }


    componentDidMount() {
        window.$(document).ready(function () {
            window.$('.modal').modal();
        });
    }


    render() {
        //Form đăng nhập
        var { lang } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="input-field col l8 offset-l2 s8 offset-s2">
                        <input id="res_email" type="email" className="validate" value={this.state.username} onChange={this.handleInputChange} name="username" style={{ color: 'black' }} />
                        <label htmlFor="res_email" style={{ color: 'black', fontWeight: 'bold' }}>{LANG_LIB[lang].email}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col l8 offset-l2 s8 offset-s2">
                        <input id="res_password" type="password" className="validate" value={this.state.password} onChange={this.handleInputChange} name="password" style={{ color: 'black' }} />
                        <label htmlFor="res_password" style={{ color: 'black', fontWeight: 'bold' }}>{LANG_LIB[lang].password}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col l8 offset-l2 s8 offset-s2" onClick={() => this.sendRegister()}>
                        <a className="waves-effect waves-light btn-large" style={{ width: '100%', backgroundColor: '#08830C' }}>{LANG_LIB[lang].register}</a>
                    </div>
                </div>
            </div>
        );
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    sendRegister = () => {
        let { username, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(() => {
                window.M.toast({ html: 'Đăng ký thành công!' });
            })
            .catch(function (error) {
                window.M.toast({ html: 'Đăng ký thất bại, kiểm tra lại thông tin!' });
            });
    }

}


const mapStateToProps = state => {
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps, null)(RegisterForm);
