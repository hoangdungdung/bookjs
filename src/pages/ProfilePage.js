import React, { Component } from 'react';
import * as act from '../actions/index';
import { connect } from 'react-redux';
var LANG_LIB = require('../shared/lang');
var firebase = require('../shared/firebaseDB');
var randomize = require('randomatic');

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phone_number: '',
      name: '',
      address: '',
      avatar: null,
      percentage: 0
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //Xử lý sự kiện nhập vào
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  //Cập set state lại mỗi khi có props mới nhận từ store redux
  componentWillReceiveProps() {
    setTimeout(() => {
      var { user_name, phone_number, address, avatar } = this.props.user_data;
      this.setState({
        phone_number: phone_number,
        name: user_name,
        address: address,
        avatar: avatar
      })
    })
  }

  componentDidMount() {
    //Hàm lắng nghe sự kiện upload file với button fileButton và lưu vào firebase store, get link lưu vào db
    var fileButton = document.getElementById('fileButton');
    fileButton.addEventListener('change', e => {
      var file = e.target.files[0];
      var storageRef = firebase.storage().ref('avatars/' + randomize('Aa0', 10) + file.name);
      var task = storageRef.put(file);
      task.on('state_changed',
        (snapshot) => {
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
            percentage: percentage
          });
          snapshot.ref.getDownloadURL().then((downloadURL) => {
            if (percentage === 100) {
              this.setState({
                avatar: downloadURL
              })
            }
          });
        });
    });
    //gọi componentWillReceiveProps để set state users ở lằn đăng nhập đầu tiên
    this.componentWillReceiveProps();
  }
  render() {
    let { lang } = this.props;
    return (
      <div className="row" style={{ marginTop: 12 }}>
        <div className="col l8" style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
          <div className="col s12">
            <div className="row">
              <div className="col s6">
                <label htmlFor="phone">{LANG_LIB[lang].phone_number}</label>
                <input id="phone" type="tel" className="validate" name="phone_number" value={this.state.phone_number} onChange={this.handleInputChange} />
              </div>
              <div className="col s6">
                <label htmlFor="name">{LANG_LIB[lang].fullname}</label>
                <input id="name" type="text" className="validate" name="name" value={this.state.name} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <label htmlFor="address">{LANG_LIB[lang].address}</label>
                <input id="address" type="text" className="validate" name="address" value={this.state.address} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="file-field input-field">
                  <div className="btn">
                    <span>{LANG_LIB[lang].avatar}</span>
                    <input type="file" id="fileButton" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
              </div>
              <div className="col s12">
                <div className="progress">
                  <div className="determinate" style={{ width: `${this.state.percentage}%` }}></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <a className="waves-effect waves-light btn" style={{ width: '100%' }} onClick={() => this.onSubmit()}>{LANG_LIB[lang].update}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onSubmit = () => {
    //gửi dispatch cho redux sau đó chờ 200ms cập nhật lại dữ liệu user.
    if (this.state.avatar !== "") {
      act.update_user_data(this.state, this.props.users.uid, this.props.users.email, this.state.avatar);
      setTimeout(() => {
        this.props.fetch_user_data(this.props.users.uid);
      }, 200);
    }
  }
}



const mapStateToProps = state => {
  return {
    users: state.users,
    user_data: state.user_data,
    lang: state.lang
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetch_user_data: (uid) => {
      dispatch(act.fetch_user_data(uid));
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
