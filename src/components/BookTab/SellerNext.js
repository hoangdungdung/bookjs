import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import * as act from '../../actions/index';
var firebase = require('../../shared/firebaseDB');

class SellerNext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seller: { key: [], value: [] },
            author: {},
            dist: 0,
            selected: false
        }
    }

    componentDidMount() {
        let { data, uid, book_key, seller_id } = this.props;
        //xem thêm về các biến này ở BookTab dòng 169
        firebase.database().ref(`/distances/${data}/${uid}`).once('value').then(dist => {
            if (dist.val()) {
                this.setState({
                    dist: dist.val().Distance
                })
            }
        });
        //${data.book_id}${data.owner_id}${data.renter_id}
        firebase.database().ref(`/trans_rent/${book_key}${seller_id}${this.props.users.uid}`).once('value').then(select => {
            if (select.val()) {
                this.setState({
                    selected: true
                })
            } else {
                this.setState({
                    selected: false
                })
            }
        });

    }

    selectBook = () => {
        let { book, seller_id, book_key, value } = this.props;
        let select = {
            book_id: book_key,
            book_name: book.book_info.name,
            owner_id: seller_id,
            owner_name: value.user_name,
            rent_date: moment().unix(),
            renter_id: this.props.users.uid,
            renter_name: this.props.user_data.user_name,
            status: book.book_info.status
        }
        if (this.state.selected === false) {
            act.insert_select_book(select);
            setTimeout(() => {
                this.componentDidMount();
            }, 400);
        } else {
            act.remove_select_book(select);
            setTimeout(() => {
                this.componentDidMount();
            }, 400);
        }
    }

    render() {
        let { value, book, seller_id } = this.props;
        //xem thêm về các biến này ở BookTab dòng 169
        return (
            <div className="col l4 s3" style={{ borderRight: '2px solid #BDB9BD', paddingTop: 20 }}>
                <Link to={seller_id === this.props.uid ? '/profile' : `/profile/${seller_id}`}>
                    <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={value.avatar} style={{ height: 100, width: 100, borderRadius: 100 }} alt={seller_id}/>
                    </div>
                </Link>
                <div className="row" style={{ marginLeft: 0, color: '#5D073F', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                    {value.user_name}
                </div>
                <div className="row" style={{ textAlign: 'center', marginTop: -10 }}>
                    <label style={{ fontSize: 13, color: 'black' }}>Hình thức: Bán</label>
                </div>
                <div className="row" style={{ textAlign: 'center', marginTop: -10 }}>
                    <label>Giá: </label><label style={{ fontSize: 13, color: 'black' }}>{book.book_info.price} VNĐ</label>
                </div>
                <div className="row" style={{ textAlign: 'center', marginTop: -10 }}>
                    <label>Khoảng cách: </label><label style={{ fontSize: 13, color: 'black' }}>{parseFloat(this.state.dist).toFixed(3)}</label>
                </div>
                {
                    seller_id !== this.props.uid ?
                        <div className="row" style={{ textAlign: 'center', marginTop: -10 }} onClick={() => this.selectBook()}>
                            <a className="btn waves-effect waves-light">{this.state.selected === true ? 'Bỏ chọn' : 'Chọn sách'}</a>
                        </div>
                        :
                        <div className="row" style={{ textAlign: 'center', marginTop: -10 }}>
                            <div style={{ height: 38 }}></div>
                        </div>
                }
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

export default connect(mapStateToProps, null)(SellerNext);