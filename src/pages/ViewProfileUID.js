import React, { Component } from 'react';
var firebase = require('../shared/firebaseDB');

class ViewProfileUID extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail_address: '',
      phone_number: '',
      user_name: '',
      address: '',
      avatar: '',
    }
  }


  componentDidMount() {
    //Lấy id của người dùng sau đó lấy dữ liệu trên db setstate.
    let id = this.props.match.params.id;
    firebase.database().ref('/users/' + id).once('value').then(snapshot => {
      this.setState({
        mail_address: snapshot.val().mail_address,
        phone_number: snapshot.val().phone_number,
        user_name: snapshot.val().user_name,
        avatar: snapshot.val().avatar,
        address: snapshot.val().address
      })
    });
  }

  render() {
    let { avatar, user_name, phone_number, address } = this.state;
    return (
      <div className="row" style={{ marginTop: 12 }}>
        <div className="col l6" style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
          <div className="col s12">
            <div className="row">
              <div className="col l6 offset-l3">
                <img src={avatar} style={{ maxWidth: 180, borderRadius: 180 }} alt={user_name}/>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div style={{ fontSize: 20, color: 'black', textAlign: 'center' }}>{user_name}</div>
              </div>
              <div className="col s12">
                <div style={{ textAlign: 'center' }}>{'Số điện thoại'}:{phone_number}</div>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div style={{ textAlign: 'center' }}>{'Địa chỉ'}:{address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}





export default ViewProfileUID;
