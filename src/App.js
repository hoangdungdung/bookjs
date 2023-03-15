import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderPage from './pages/HeaderPage';
import MenuPage from './pages/MenuPage';
import MenuPageMobile from './pages/MenuPageMobile';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import ViewProfileUID from './pages/ViewProfileUID';
import CreateBookPage from './pages/CreateBookPage';
import LocationPage from './pages/LocationPage';
import './App.css';
import * as act from './actions/index';
import { connect } from 'react-redux';


class App extends Component {
  componentDidMount() {
    this.props.get_users();
    window.$(document).ready(function () {
      window.$('.sidenav').sidenav();
    });
  }
  componentDidUpdate() {
    window.$('.sidenav').sidenav();
    this.props.fetch_user_data(this.props.users.uid);
  }

  render() {
    //Nếu chưa có user đăng nhập vào thì hiện lên Login Page, nếu đã đăng nhập rồi thì render từ về Router trở đi.
    return (
      <div>
        {this.props.users.uid === null ?
          < div >
            <LoginPage />
          </div >
          :
          <Router>
            <div className="row" style={{ backgroundColor: '#e9ebee', minHeight: 768 }}>
              <div className="row" style={{ position: 'fixed', width: '100%', zIndex: 10 }}>
                <HeaderPage />
              </div>
              <div className="row">
                {/*Ẩn đi Menu page nếu màn hình có kích trước trung bình trở xuống*/}
                <div className="col l3 hide-on-med-and-down offset-l1" style={{ marginTop: 60, position: 'fixed' }}>
                  <MenuPage />
                </div>
                {/*Hiện đi MenuPageMobile nếu màn hình có kích trước trung bình trở lên*/}
                <div className="col s8 sidenav hide-on-med-and-up">
                  <MenuPageMobile />
                </div>
                <div className="col l6 s12 offset-l4" style={{ marginTop: 64 }}>
                  <Switch>
                    <Route path='/' exact component={HomePage} />
                    <Route path='/profile' exact component={ProfilePage} />
                    <Route path='/create_book' component={CreateBookPage} />
                    <Route path='/profile/:id' component={ViewProfileUID} />
                    <Route path='/save_location' component={LocationPage} />
                  </Switch>
                </div>
                {/*Phần này dành cho quảng cáo có thế tách ra thành file riêng*/}
                <div className="col l2 left-align hide-on-med-and-down" style={{ marginTop: 70, position: 'fixed', right: 130 }}>
                  <div className="row left-align">
                    <div className="col l12 left-align">
                      <img src="https://adtimin.vn/wp-content/uploads/2018/01/1.png" style={{ maxHeight: 200 }} alt={'ads'} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col l12">
                      <img src="https://adtimin.vn/wp-content/uploads/2018/01/1.png" style={{ maxHeight: 200 }} alt={'ads'} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col l12">
                      <img src="https://adtimin.vn/wp-content/uploads/2018/01/1.png" style={{ maxHeight: 200 }} alt={'ads'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Router>
        }
      </div>
    );
  }
}




const mapStateToProps = state => {
  return {
    users: state.users
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
