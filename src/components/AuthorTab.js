import React, { Component } from 'react';

class AuthorTab extends Component {
    render() {
        let { data } = this.props;
        return (
            <div className="col l12 s12">
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={data.author_info.avatar} alt={data.author_info.name}/>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <div>Tên: {data.author_info.name}</div>
                            <div>Bí Danh: {data.author_info.nick_name}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default AuthorTab;

