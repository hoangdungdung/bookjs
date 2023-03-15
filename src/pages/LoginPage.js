import React, { Component } from 'react';
import { connect } from 'react-redux';
import PhoneNumberLoginForm from '../components/PhoneNumberLoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgetForm from '../components/ForgetForm';
var firebase = require('../shared/firebaseDB');
const LANG_LIB = require('../shared/lang');

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  onLoginGG = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      // Fuck do anything
    }).catch(function (error) {
      //Fuck do anything
    });
  }

  onLoginFB = () => {
    var fbprovider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(fbprovider).then(function (result) {
      window.M.toast({ html: `Đăng nhập thành công!` });
      //Cập nhật lại user sau khi đăng nhập bằng fb
      firebase.database().ref('/users/' + result.user.uid).set({
        address: '',
        mail_address: result.user.email,
        phone_number: result.user.phoneNumber === null ? '' : result.user.phoneNumber,
        user_name: result.user.displayName,
        user_type: 'facebook',
        avatar: result.user.photoURL 
      }).then(user => {
        //Không làm gì cả
      })

    }).catch(function (error) {
      if (error.code === 'auth/account-exists-with-different-credential') {
        window.M.toast({ html: `Email ${error.email} Đã tồn tại trên hệ thống!` });
      }
    });
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
      <div className="row" style={{ backgroundColor: '#0A4B68', height: 2000 }}>
        <div id="modal3" className="modal">
          <PhoneNumberLoginForm />
        </div>
        <div id="modal4" className="modal">
          <RegisterForm />
        </div>
        <div id="modal5" className="modal">
          <ForgetForm />
        </div>
        <div className="col l4 s12 offset-l4" style={{ marginTop: 30 }}>
          <div className="card" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
            <div className="row">
              <div className="input-field col l8 offset-l2 s8 offset-s2">
                <input id="email" type="email" className="validate" value={this.state.username} onChange={this.handleInputChange} name="username" style={{ color: 'white' }} />
                <label htmlFor="email" style={{ color: 'white', fontWeight: 'bold' }}>{LANG_LIB[lang].email}</label>
              </div>
            </div>
            <div className="row" style={{ marginTop: -15 }}>
              <div className="input-field col l8 offset-l2 s8 offset-s2">
                <input id="password" type="password" className="validate" value={this.state.password} onChange={this.handleInputChange} name="password" style={{ color: 'white' }} />
                <label htmlFor="password" style={{ color: 'white', fontWeight: 'bold' }}>{LANG_LIB[lang].password}</label>
              </div>
            </div>
            <div className="row">
              <div className="col l8 offset-l2 s8 offset-s2" onClick={() => this.sendLogin()}>
                <a className="waves-effect waves-light btn-large" style={{ width: '100%', backgroundColor: '#08830C' }}>{LANG_LIB[lang].login}</a>
              </div>
            </div>
            <div className="row">
              <div className="col l8 offset-l2 s8 offset-s2" onClick={() => this.onLoginFB()}>
                <a className="waves-effect waves-light btn-large" style={{ width: '100%', backgroundColor: '#086783' }}>{LANG_LIB[lang].facebook}</a>
              </div>
            </div>
            <div className="row">
              <div className="col l8 offset-l2 s8 offset-s2" onClick={() => this.onLoginGG()}>
                <a className="waves-effect waves-light btn-large" style={{ width: '100%', backgroundColor: '#93280C' }}>{LANG_LIB[lang].google}</a>
              </div>
            </div>
            <div className="row">
              <div className="col l8 offset-l2 s8 offset-s2">
                <a className="waves-effect waves-light btn-large modal-trigger" data-target="modal3" style={{ width: '100%', backgroundColor: '#5F0556' }}>{LANG_LIB[lang].phone_number}</a>
              </div>
            </div>
            <div>
              <div className="col l12 offset-l1 s8 offset-s2" style={{ marginLeft: 50, marginTop: 20, marginBottom: 20 }}>
                <div className="cap" id="cap" style={{ width: '100%' }}>
                </div>
              </div>
            </div>
            <div className="row" style={{ paddingBottom: 20 }}>
              <div className="col l8 offset-l2 s8 offset-s2">
                <div className="left modal-trigger" style={{ color: 'white', fontWeight: 'bold' }} data-target="modal4">
                  {LANG_LIB[lang].register}
                </div>
                <div className="right modal-trigger" style={{ color: 'white', fontWeight: 'bold' }} data-target="modal5">
                  {LANG_LIB[lang].forgot}
                </div>
              </div>
            </div>
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

  sendLogin = () => {
    let { username, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
      var errorCode = error.code;
      if (!errorCode) {
        window.M.toast({ html: 'Đăng nhập thành công!' });
      } else {
        window.M.toast({ html: 'Đăng nhập thất bại!' });
      }
    });
  }

}


const mapStateToProps = state => {
  return {
    lang: state.lang,
    users: state.users
  }
}

export default connect(mapStateToProps, null)(LoginPage);
