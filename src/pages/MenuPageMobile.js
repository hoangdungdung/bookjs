import React, { Component } from 'react';
import MenuTab from '../components/MenuTab';
var firebaseDB = require('../shared/firebaseDB');
require('firebase/auth');
var database = firebaseDB.database();
//Giống MenuPage
class MenuPageMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: []
    }
  }
  componentDidMount() {
    database.ref('/system_settings/menu_config/normal').once('value').then(data => {
      this.setState({
        menu: data.val()
      })
    });
  }
  render() {
    let { menu } = this.state;
    return (
      <div style={{ marginTop: 10 }} className="collection">
        {this.renderMenu(menu)}
      </div>
    );
  }
  renderMenu = (menus) => {
    var result = null;
    result = menus.map((menu, index) => {
      return <MenuTab icon={menu.icon} text={menu.text} key={index} id={menu.id}/>
    });
    return result;
  }
}

export default MenuPageMobile;
