import React, {  Component } from 'react';
//import shouldPureComponentUpdate from 'react-pure-render/function';

import { greatPlaceStyle } from './greatPlaceStyle.js';

export default class MyGreatPlace extends Component {
    render() {
        return (
            <div style={greatPlaceStyle}>
                {this.props.text}
            </div>
        );
    }
}