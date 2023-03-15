import React, { Component } from 'react';
import { connect } from 'react-redux';
var firebase = require('../shared/firebaseDB');
const LANG_LIB = require('../shared/lang');


class ForgetForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
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
                        <input id="forget_email" type="email" className="validate" value={this.state.email} onChange={this.handleInputChange} name="email" style={{ color: 'black' }} />
                        <label htmlFor="forget_email" style={{ color: 'black', fontWeight: 'bold' }}>{LANG_LIB[lang].email}</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col l8 offset-l2 s8 offset-s2" onClick={() => this.sendConfirm()}>
                        <a className="waves-effect waves-light btn-large" style={{ width: '100%', backgroundColor: '#08830C' }}>{LANG_LIB[lang].confirm}</a>
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

    sendConfirm = () => {
        let { email } = this.state;
        console.log(email);
        firebase.auth().sendPasswordResetEmail(email)
            .then(function () {
                // The link was successfully sent. Inform the user.
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                window.localStorage.setItem('emailForSignIn', email);
            })
            .catch(function (error) {
                console.log(error);
                // Some error occurred, you can inspect the code: error.code
            });
    }

}


const mapStateToProps = state => {
    return {
        lang: state.lang
    }
}

export default connect(mapStateToProps, null)(ForgetForm);
