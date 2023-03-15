import * as Type from '../constants/ActionTypes';
var firebase = require('../shared/firebaseDB');


export const get_users = () => {
    //lấy thông tin đã dăng nhập của user từ firebase
    return dispatch => {
        firebase.auth().onAuthStateChanged(user => {
            dispatch(dispatch_users(user));
        });
    }
}

export const dispatch_users = (data) => {
    return {
        type: Type.GET_LOGIN_STATE,
        users: data
    }
    //Kết thúc get_users();
}

export const logout = () => {
    //đăng xuât khỏi firebase
    return dispatch => {
        firebase.auth().signOut().then(data => {
            //Không làm gì hết để vậy chơi thôi
        })
    }
}

export const fetch_user_data = (uid) => {
    //Lấy thông tin profile người dùng đã đăng nhập ở csdl /users/+uid
    return dispatch => {
        firebase.database().ref('/users/' + uid).once('value').then(user => {
            dispatch(dispatch_user_data(user.val()));
        })
    }
}

export const dispatch_user_data = (data) => {
    return {
        type: Type.FETCH_USERS_DATA,
        user_data: data
    }
    //Xong fetch_user_data(); trả về kết quả
}

export const update_user_data = ({ phone_number, name, address }, uid, email, avatar) => {
    //truyền vào hàm này các thông số ({ phone_number, name, address }, uid, email, avatar)
    //để cập nhật profile user
    firebase.database().ref('users/' + uid).set({
        address: address,
        mail_address: email,
        phone_number: phone_number,
        user_name: name,
        user_type: 'firebase',
        avatar: avatar
    }, function (error) {
        if (error) {
            window.M.toast({ html: 'Fail to update' })
        } else {
            window.M.toast({ html: 'Update successfully!' });
            return true;
        }
    });
}

export const add_book = ({ author, category, count, description, price_cover, status, name, price, image }, uid) => {
    //Truyền vào mớ tham số trên để tạo sách mới
    firebase.database().ref('/books_items_noa').push({
        //cái này để tạo sách mới
        author_id: author,
        category_id: category,
        count: parseInt(count),
        create_time: new Date(),
        creator_id: uid,
        description: description,
        image: image,
        name: name,
        price: parseInt(price),
        price_cover: parseInt(price_cover),
        status: 0,
        views_count: 0
    }, function (error) {
        if (error) {
            window.M.toast({ html: 'Fail to update' })
            // The write failed...
        } else {
            window.M.toast({ html: 'Update successfully!' })
            // Data saved successfully!
        }
    });
}

export const insert_searching = (text, type, uid) => {
    //tìm kiếm 
    firebase.database().ref(`/searching_${type}`).push({
        text: text,
        type: type,
        user_id: uid,
    });
}


export const fetch_dashboard = (uid) => {
    //lấy tất cả dashboard với uid, sắp xếp theo thứ tự về.
    return dispatch => {
        firebase.database().ref('/dashboard/' + uid).orderByChild('create_time').once('value', function (snapshot) {
            let tmp = { key: [], value: [] };
            snapshot.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                tmp.value.push(childData);
                tmp.key.push(childKey);
            });
            tmp.value = tmp.value.reverse();
            tmp.key = tmp.key.reverse();
            dispatch(dispatch_dashboard(tmp));
        });
    }
}



//của hàm fetch_dashboard()
export const dispatch_dashboard = (data) => {
    return {
        type: Type.FETCH_DASHBOARD_DATA,
        dashboard: data
    }
}



export const fetch_data_author = () => {
    //lấy tất cả thông tin của tác giả để trả về trang tạo sách
    return dispatch => {
        firebase.database().ref('/authors').once('value').then(author => {
            if (author.val()) {
                dispatch(dispatch_data_author(author.val()));
            }
        });
    }
}

export const dispatch_data_author = (authors) => {
    return {
        type: Type.DATA_AUTHOR,
        authors: authors
    }
    //trả về kết quả
}

export const fetch_data_category = () => {
    //lấy tất cả chủ đề để xuất ra trang tạo sách.
    return dispatch => {
        firebase.database().ref('/categories').once('value').then(category => {
            if (category.val()) {
                dispatch(dispatch_data_category(category.val()));
            }
        });
    }
}

export const dispatch_data_category = (category) => {
    return {
        type: Type.DATA_CATEGORY,
        category: category
    }
    //trả về kết quả
}


export const insert_author = (author) => {
    //hàm này thêm tác giả mới vào.
    let { name, nickname, image, country } = author;
    firebase.database().ref(`/authors`).push({
        name: name,
        nick_name: nickname,
        country: country,
        avatar: image
    });
}

export const insert_category = (category) => {
    // hàm này thêm vào thể loại
    let { name, image } = category;
    firebase.database().ref(`/categories`).push({
        name: name,
        image: image
    });
}

export const insert_select_book = (data) => {
    // hàm này thêm vào khi người dùng chọn sách
    firebase.database().ref(`/trans_rent/${data.book_id}${data.owner_id}${data.renter_id}`).set(data,
        function (error) {
            if (error) {
                window.M.toast({ html: 'Chọn sách thất bại!' })
                // The write failed...
            } else {
                window.M.toast({ html: 'Đã chọn sách!' })
                // Data saved successfully!
            }
        });
}


export const remove_select_book = (data) => {
    // hàm này thêm vào khi người dùng chọn sách
    firebase.database().ref(`/trans_rent/${data.book_id}${data.owner_id}${data.renter_id}`).remove()
}