import React, { Component } from 'react';
import * as act from '../actions/index';
import { connect } from 'react-redux';
import AddAuthor from '../components/AddAuthor';
import AddCategory from '../components/AddCategory';
const LANG_LIB = require('../shared/lang');
var firebaseDB = require('../shared/firebaseDB');
var randomize = require('randomatic');

class CreateBookPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      category: '',
      count: '',
      description: '',
      price_cover: '',
      status: '',
      name: '',
      price: '',
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
    //Lắng nghe sự kiện ở fileButton sau đó upload file lên store lấy link.
    var fileButton = document.getElementById('fileButton');
    fileButton.addEventListener('change', e => {
      var file = e.target.files[0];
      var storageRef = firebaseDB.storage().ref('books/' + randomize('Aa0', 10) + file.name);
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
    // lấy về thông tin tác giả, thể loại để ở lần truy cập đầu tiên
    this.props.fetch_data_author();
    this.props.fetch_data_category();
    this.uploadImageToFirebase();
    //Setup modal cho form thêm tác giả và thêm thể loại
    window.$(document).ready(function () {
      window.$('.modal').modal();
    });
  }

  componentWillReceiveProps() {
    //Sau khi kết quả của tác giả và thể loại được trả về thì setup lại selector
    setTimeout(() => {
      window.$(document).ready(function () {
        window.$('select').formSelect();
      });
    })
  }


  renderAuthorOption = (authors) => {
    var result = null;
    result = authors.value.map((author, index) => {
      return (<option value={authors.key[index]} key={index}>{author.name}</option>);
    })
    return result;
  }


  renderCategoryOption = (categories) => {
    var result = null;
    result = categories.value.map((category, index) => {
      return (<option value={categories.key[index]} key={index}>{category.name}</option>);
    })
    return result;
  }


  render() {
    let { lang, authors, category } = this.props;
    return (
      <div className="row" style={{ marginTop: 12 }}>
        <div className="col l9" style={{ backgroundColor: 'white', paddingTop: 20, paddingBottom: 20 }}>
          <div className="col s12">
            <div className="row">
              <div className="col s12">
                <label htmlFor="name">{LANG_LIB[lang].name}</label>
                <input id="name" type="text" className="validate" name="name" value={this.state.name} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s11">
                <label htmlFor="author">{LANG_LIB[lang].author}</label>
                <select value={this.state.author} onChange={this.handleInputChange} name="author">
                  {this.renderAuthorOption(authors)}
                </select>
              </div>
              <div data-target="modal1" className="modal-trigger">
                <div><i className="material-icons" style={{ marginTop: 30 }}>note_add</i></div>
              </div>
            </div>
            <div className="row">
              <div className="col s11">
                <label htmlFor="category">{LANG_LIB[lang].category}</label>
                <select value={this.state.category} onChange={this.handleInputChange} name="category">
                  {this.renderCategoryOption(category)}
                </select>
              </div>
              <div data-target="modal2" className="modal-trigger">
                <div><i className="material-icons" style={{ marginTop: 30 }}>note_add</i></div>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <label htmlFor="count">{LANG_LIB[lang].count}</label>
                <input id="count" type="number" name="count" value={this.state.count} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <label htmlFor="description">{LANG_LIB[lang].description}</label>
                <input id="description" type="text" className="validate" name="description" value={this.state.description} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <label htmlFor="price">{LANG_LIB[lang].price}</label>
                <input id="price" type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
              </div>
              <div className="col s6">
                <label htmlFor="price_cover">{LANG_LIB[lang].price_cover}</label>
                <input id="price_cover" type="number" className="validate" name="price_cover" value={this.state.price_cover} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <div className="file-field input-field">
                  <div className="btn">
                    <span>{LANG_LIB[lang].book_image}</span>
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
                <a className="waves-effect waves-light btn" style={{ width: '100%' }} onClick={() => this.onSubmit()}>{LANG_LIB[lang].finished}</a>
              </div>
            </div>
          </div>
        </div>
        <div id="modal1" className="modal">
          <AddAuthor />
        </div>
        <div id="modal2" className="modal">
          <AddCategory />
        </div>
      </div>
    );
  }
  onSubmit = () => {
    //Submit sau đó gọi hàm để load lại dashboard
    if (this.state.image) {
      act.add_book(this.state, this.props.users.uid);
      this.setState({
        author: '',
        category: '',
        count: '',
        description: '',
        price_cover: '',
        status: '',
        name: '',
        price: '',
        dataAuthor: { key: [], value: [] },
        dataCategory: { key: [], value: [] },
        percentage: 0,
        image: null,
        searchAuthor: '',
        searchCategory: '',
        showAddAuthor: false,
        showAddCategory: false
      })
      setTimeout(() => {
        this.props.fetch_dashboard(this.props.users.uid);
      }, 400)
    }
  }
}


const mapStateToProps = state => {
  return {
    users: state.users,
    user_data: state.user_data,
    authors: state.authors,
    category: state.category,
    lang: state.lang
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetch_data_author: () => {
      dispatch(act.fetch_data_author());
    },
    fetch_data_category: () => {
      dispatch(act.fetch_data_category());
    },
    fetch_dashboard: (uid) => {
      dispatch(act.fetch_dashboard(uid));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateBookPage);

