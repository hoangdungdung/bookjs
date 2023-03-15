import React, { Component } from 'react';
import * as act from '../actions/index';
import { connect } from 'react-redux';
var firebaseDB = require('../shared/firebaseDB');
var randomize = require('randomatic');

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      percentage: 0,
      image: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  uploadImageToFirebase = () => {
    var avatarCatButton = document.getElementById('avatarCatButton');
    avatarCatButton.addEventListener('change', e => {
      var file = e.target.files[0];
      var storageRef = firebaseDB.storage().ref('category/' + randomize('Aa0', 10) + file.name);
      var task = storageRef.put(file);
      task.on('state_changed',
        (snapshot) => {
          var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({
            percentage: percentage
          });
          if (percentage === 100) {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.setState({
                image: downloadURL
              })
            });
          }
        })
    })
  }

  componentDidMount() {
    this.uploadImageToFirebase();
  }

  render() {
    return (
      <div className="col l11" style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20, marginLeft: 30, marginTop: 20 }}>
        <div className="col s12">
          <div className="row">
            <div className="col s12">
              <label htmlFor="name">Name</label>
              <input id="name" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="row">
            <div className="col s12">
              <div className="file-field input-field">
                <div className="btn">
                  <span>Avatar</span>
                  <input type="file" id="avatarCatButton" />
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
              <a className="waves-effect waves-light btn" style={{ width: '100%' }} onClick={() => this.onSubmit()}>FINISHED</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  onSubmit = () => {
    act.insert_category(this.state);
    setTimeout(() => {
      this.setState({
        name: '',
        percentage: 0,
        image: null,
      });
      this.props.fetch_data_category();
    }, 400)
  }
}


const mapStateToProps = state => {
  return {
    users: state.users,
    user_data: state.user_data,
    authors: state.authors,
    category: state.category
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetch_data_category: () => {
      dispatch(act.fetch_data_category());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);

