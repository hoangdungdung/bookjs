import React, { Component } from 'react';
import SellerNext from './BookTab/SellerNext';
var firebase = require('../shared/firebaseDB');

class BookTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seller: { key: [], value: [] },
            author: {},
            category: '',
            showMore: false,
            bookNext: { key: [], value: [] },
            indexNext: 0
        }
    }

    componentDidMount() {
        let { data, value } = this.props;
        //data value là coi thêm ở dòng 21 HomePage
        var { indexNext } = this.state;
        var bookNext = { key: [], value: [] };
        //Clone lại 3 phần từ của seller [0] [1] [2] nếu seller có quá 3 phần tử để render 3 phần tử đầu tiên này.

        // lấy dữ liệu từ db và chuyển về đúng định dạng { key: [], value: [] } coi console.log sẽ hiểu
        firebase.database().ref(`/books_users/${data}`).once('value').then(users => {
            if (users.val()) {
                let tmp = { key: Object.keys(users.val()), value: Object.values(users.val()) }
                if (tmp.key.length > 3) {
                    for (var i = indexNext; i < indexNext + 3; i++) {
                        bookNext.key[i] = tmp.key[i];
                        bookNext.value[i] = tmp.value[i];
                    }
                }
                this.setState({
                    seller: tmp,
                    bookNext: bookNext
                });
            }
        });


        firebase.database().ref(`/authors/${value.book_info.author_id}`).once('value').then(author => {
            if (author.val()) {
                this.setState({
                    author: author.val()
                })
            }
        });

        firebase.database().ref(`/categories/${value.book_info.category_id}`).once('value').then(cat => {
            if (cat.val()) {
                this.setState({
                    category: cat.val().name
                })
            }
        });

    }

    //Nếu nhấn vào nút next thì sẽ tăng index lên gọi lại hàm componentDidMount để render ra lại.
    scrollSeller = () => {
        if (this.state.indexNext + 3 < this.state.seller.value.length) {
            this.setState({
                indexNext: this.state.indexNext + 1
            });
            setTimeout(() => {
                this.componentDidMount();
            })
        }
    }
    //Nếu nhấn vào nút prev thì sẽ giảm index lên gọi lại hàm componentDidMount để render ra lại.
    scrollPrevSeller = () => {
        if (this.state.indexNext > 0) {
            this.setState({
                indexNext: this.state.indexNext - 1
            });
            setTimeout(() => {
                this.componentDidMount();
            })
        }
    }

    render() {
        let { value, uid } = this.props;
        var book_key = this.props.data;
        let { author, seller, category, bookNext } = this.state;
        return (
            <div className="col l12 s12">
                <div className="card">
                    <div className="row">
                        <div className="col l5 s4">
                            <div className="card-image">
                                <img src={value.book_info.image} style={{ marginLeft: 20, marginTop: 20 }} alt={value.book_info.name}/>
                            </div>
                        </div>
                        <div className="col l7 s8">
                            <div className="card-stacked">
                                <div className="card-content">
                                    <div className="row"><label>Tên sách: </label><label style={{ fontSize: 13, color: 'black', fontWeight: 'bold' }}>{value.book_info.name.toUpperCase()}</label></div>
                                    <div className="row" style={{ marginTop: -15 }}><label>Tác giả: </label><label style={{ fontSize: 13, color: 'blue' }}>{author.name}</label></div>
                                    <div className="row" style={{ marginTop: -15 }}><label>Thể loại: </label><label style={{ fontSize: 13, color: 'blue' }}>{category}</label></div>
                                    <div className="row" style={{ marginTop: -15 }}><label style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>ISBN: </label><label style={{ fontSize: 13, color: 'black' }}>{'Chưa có'}</label></div>
                                    <div className="row" style={{ marginTop: -15 }}><label style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Xuất bản: </label><label style={{ fontSize: 13, color: 'black' }}>{category}</label></div>
                                    <div className="row" style={{ marginTop: -15 }}><label style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Trọng lượng: </label><label style={{ fontSize: 13, color: 'black' }}>{'Chưa có'}</label></div>
                                    <div className="row" style={{ marginTop: -15 }}><label style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>NXB: </label><label style={{ fontSize: 13, color: 'black' }}>{'Chưa có'}</label></div>
                                    <div className="row" style={{ marginTop: -15 }}><label style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Số trang: </label><label style={{ fontSize: 13, color: 'black' }}>{'Chưa có'}</label></div>
                                    <div className="row" style={{ marginTop: -15 }}><label style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Giá bìa: </label><label style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>{value.book_info.price_cover} VNĐ</label></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l11 s12" style={{ marginLeft: 20, fontStyle: 'italic', textAlign: 'justify', marginTop: -20 }}>
                            {value.book_info.description.length < 230 ? value.book_info.description : null}
                            {value.book_info.description.length > 230 && this.state.showMore === false ? value.book_info.description.substr(0, 230) + '...' : null}
                            {value.book_info.description.length > 230 && this.state.showMore === true ? value.book_info.description : null}
                            {value.book_info.description.length > 230 ? <label style={{ color: 'blue' }} onClick={() => this.setState({ showMore: true })}>Xem thêm</label> : null}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l12 s12" style={{ marginLeft: 20, fontStyle: 'italic', fontWeight: 'bold' }}>
                            Người có sách
                        </div>
                    </div>
                    <div className="row" style={{ height: 8, backgroundColor: '#e9ebee' }}>
                    </div>
                    <div className="row" style={{ display: 'flex', justifyContent: 'center', marginTop: -20 }}>
                        {/*Nếu người dùng chưa bấm vào next thì chưa hiện nut prev*/}
                        {
                            this.state.indexNext > 0 ?
                                <div style={{ position: 'relative', left: 0, borderRight: '2px solid black' }} className="valign-wrapper" onClick={() => this.scrollPrevSeller()}>
                                    <a><i className="material-icons" style={{ fontSize: 50 }}>navigate_before</i></a>
                                </div>
                                :
                                null
                        }
                        {/*Nếu ít hơn 3 phần tử là người bán thì chỉ cần lấy dữ liệu từ db rồi render.*/}
                        <div className="col l12 s12">
                            {seller.value.length <= 3 ? this.renderSeller(seller, uid, value, book_key) : this.renderSellerNext(bookNext, uid, value, book_key)}
                        </div>
                        {/*nếu có quá 3 phần tử thì render bằng biến đã chuẩn bị ở phần componentDidmount()*/}
                        {
                            seller.value.length > 3 ?
                                <div style={{ position: 'relative', left: -10 }} className="valign-wrapper" onClick={() => this.scrollSeller()}>
                                    <a><i className="material-icons" style={{ fontSize: 50 }}>navigate_next</i></a>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        );
    }

    renderSeller = (data, uid, book, book_key) => {
        var result = null;
        result = data.value.map((s, index) => {
            return (
                <SellerNext data={data.key[index]} value={s} key={index} uid={uid} book={book} seller_id={data.key[index]} book_key={book_key} />
            );
        })
        return result;
    }

    renderSellerNext = (data, uid, book, book_key) => {
        var result = null;
        result = data.value.map((s, index) => {
            //data key của từng nguoi bán dùng trên db
            //value Object người bán 
            //uid :id dữ liệu người dùng đang đăng nhập
            //book: Object chứa thông tin về cuốn sách
            //seller_id : id của người bán sách
            return (
                <SellerNext data={data.key[index]} value={s} uid={uid} book={book} seller_id={data.key[index]} key={index} book_key={book_key} />
            );
        })
        return result;
    }
}


export default BookTab;

