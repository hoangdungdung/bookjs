import React, { Component } from 'react';
import { connect } from 'react-redux';
var firebase = require('../shared/firebaseDB');
const LANG_LIB = require('../shared/lang');

class PhoneNumberLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      token: '',
      confirmationResult: null,
      showCaptcha: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.users.uid) {
      firebase.auth().useDeviceLanguage();
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('captcha');
      window.recaptchaVerifier.render().then(function (widgetId) {
        window.recaptchaWidgetId = widgetId;
        //Sau khi xác nhập xong captcha thì tiếp tục gửi token về số điện thoại.
      });
    }
  }

  render() {
    //Form đăng nhập
    var { lang } = this.props;
    return (
      <div className="row" style={{ backgroundColor: 'white', marginTop: 40 }}>
        <div className="col l12 s12">
          <div className="row">
            <div className="input-field col l5 s6 offset-l1">
              <input id="tel" type="tel" className="validate" value={this.state.phone} onChange={this.handleInputChange} name="phone" style={{ color: 'black' }} />
              <label htmlFor="tel" style={{ color: 'black', fontWeight: 'bold' }}>{LANG_LIB[lang].phone_number}</label>
            </div>
            <div className="input-field col l5 s6">
              <input id="token" type="text" className="validate" value={this.state.token} onChange={this.handleInputChange} name="token" style={{ color: 'black' }} />
              <label htmlFor="token" style={{ color: 'black', fontWeight: 'bold' }}>{LANG_LIB[lang].token}</label>
            </div>
          </div>
          <div className="row">
            <div className="col l8 offset-l3 s8 offset-s3" style={{ justifyContent: 'center', alignContent: 'center' }}>
              <div id="captcha"></div>
            </div>
          </div>
          <div className="row" style={{ paddingBottom: 30 }}>
            <div className="col l4 offset-l2 s8 offset-s2" onClick={() => this.get_token()}>
              <a className="waves-effect waves-light btn" style={{ width: '100%', backgroundColor: '#9ea5af' }}>{LANG_LIB[lang].get_token}</a>
            </div>
            <div className="col l4 s8 offset-s2" onClick={() => this.login()}>
              <a className="waves-effect waves-light btn" style={{ width: '100%', backgroundColor: '#9ea5af' }}>{LANG_LIB[lang].login}</a>
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

  get_token = () => {
    var phoneNumber = `+84${this.state.phone}`;
    var appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmationResult => {
        window.M.toast({ html: `Đã gửi mã đến số điện thoại ${this.state.phone}` });
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      }).catch(function (error) {
        if (error) {
          window.M.toast({ html: `Có lỗi, mã chưa được gửi!` })
        }
      });
  }

  login = () => {
    window.confirmationResult.confirm(this.state.token).then(function (result) {
      //Đăng nhập thành công.
      window.M.toast({ html: 'Đăng nhập thành công, chờ chuyển trang!' })
    }).catch(function (error) {
      window.M.toast({ html: 'Đăng nhập thất bại, sai code!' })
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

}


const mapStateToProps = state => {
  return {
    lang: state.lang,
    users: state.users
  }
}

export default connect(mapStateToProps, null)(PhoneNumberLoginForm);
