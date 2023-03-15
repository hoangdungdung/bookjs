import React, { Component } from 'react';
import MenuTab from '../components/MenuTab';
import ProfileTab from '../components/ProfileTab';
import * as act from '../actions/index';
import { connect } from 'react-redux';
var firebaseDB = require('../shared/firebaseDB');
var database = firebaseDB.database();

class MenuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    }
  }


  componentDidMount() {
    //Lấy list menu
    database.ref('/system_settings/menu_config/normal').once('value').then(data => {
      this.setState({
        menu: data.val()
      })
    });
  }

  render() {
    let { menu } = this.state;
    return (
      <div style={{ marginLeft: 20, marginTop: 10, backgroundColor: 'white', maxHeight: window.$(window).height() - 66, overflowY: 'auto' }} className="collection">
        <ProfileTab user_data={this.props.user_data} />
        <hr />
        <div style={{}}>
          {this.renderMenu(menu)}
        </div>
      </div>
    );
  }
  renderMenu = (menus) => {
    var result = null;
    result = menus.map((menu, index) => {
      return <MenuTab icon={menu.icon} text={menu.text} key={index} id={menu.id} web={menu.web}/>
    });
    return result;
  }
}


const mapStateToProps = state => {
  return {
    users: state.users,
    user_data: state.user_data
  }
}


const mapDispatchToProps = (dispatch, props) => {
  return {
    //hàm get_users lấy dữ liệu xác thực từ firebase authenticate
    get_users: () => {
      dispatch(act.get_users());
    },
    //fetch_user_data lấy dữ liệu của user từ db
    fetch_user_data: (uid) => {
      dispatch(act.fetch_user_data(uid));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuPage);
