import React, { Component } from 'react';
import * as act from '../actions/index';
import AuthorTab from '../components/AuthorTab';
import BookTab from '../components/BookTab';
import NotFound from '../components/NotFound';
import CreatedTab from '../components/CreatedTab';
import { connect } from 'react-redux';


class HomePage extends Component {
  componentDidMount() {
    this.props.fetch_data_author();
    this.props.fetch_dashboard(this.props.users.uid);
  }


  renderDashboard = (dashboard) => {
    var result = null;
    result = dashboard.value.map((item, index) => {
      if (item.type === 'message.book.interesting') {
        //value từ component của dashboard ví dụ 
        /*{
        book_info: {
          author_id: '-LEi7P11Xtrk4jHXViv-',
          category_id: '-LEgq1SeifoMjRDpApC_',
          count: 1,
          create_time: 0,
          creator_id: 'hFq6dQ64G7VTYcE4axoZsI40eos1',
          description: 'TU THẦN TÀ TÔN',
          image: 'https://firebasestorage.googleapis.com/v0/b/demofirebase-97584.appspot.com/o/books%2F6apbsDm0Bftruyentuthantaton.jpeg?alt=media&token=91dbfd88-2730-4404-b050-ceff22c0c87e',
          name: 'TU THẦN TÀ TÔN',
          price: 1,
          price_cover: 7,
          status: 0
        },
        create_time: 1528708652889,
        text: 'TU THẦN TÀ TÔN',
        type: 'message.book.interesting'
      }*/
        //data key của cái node phía trên
        //uid uid của user đang đăng nhập
        return (<BookTab value={item} data={dashboard.key[index]} uid={this.props.users.uid} key={index} />)
      } else if (item.type === 'message.created.book.status') {
        return (<CreatedTab data={item} key={index} />)
      } else if (item.type === 'message.author') {
        return (<AuthorTab data={item} key={index} />)
      } else {
        return (<NotFound text={item.text} key={index} />)
      }
    });
    return result;
  }

  render() {
    let { dashboard } = this.props;
    return (
      <div className="row">
        <div className="col l10 s12">
          {this.renderDashboard(dashboard)}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    users: state.users,
    user_data: state.user_data,
    dashboard: state.dashboard,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    //Lấy danh sách tất cả các tác giả
    fetch_data_author: () => {
      dispatch(act.fetch_data_author());
    },
    //Lấy danh sách dashboard của người dùng với uid trên db
    fetch_dashboard: (uid) => {
      dispatch(act.fetch_dashboard(uid));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

