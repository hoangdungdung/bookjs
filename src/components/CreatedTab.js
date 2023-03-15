import React, { Component } from 'react';

class CreatedTab extends Component {
    render() {
        let { data } = this.props;
        return (
            <div className="col l12 s12">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={data.book_info.image} alt={data.book_info.name}/>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <div>Sách {data.book_info.name} của bạn đã được duyệt thành công</div>
                            <div>Giá {data.book_info.price}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CreatedTab;

