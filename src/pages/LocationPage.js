import React, { Component } from 'react';
//import * as act from '../actions/index';
import * as func from '../shared/functions';
import { connect } from 'react-redux';
import geolocation from 'geolocation';
import GoogleMapReact from 'google-map-react';
import MyPlace from '../components/Location/MyPlace';
import * as constants from '../shared/constants';

var firebaseDB = require('../shared/firebaseDB');
var database = firebaseDB.database();

function createMapOptions(maps) {
  // next props are exposed at maps
  // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
  // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
  // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
  // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
  // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT
    },
    mapTypeControl: true
  };
}

class LocationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 16
    }
  }

  componentDidMount() {
    geolocation.getCurrentPosition((err, position) => {
      if (position) {
        let center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.setState({
          center: center
        })
      }
    });
  }

  saveLocation = () => {
    var tmp = func.convertDMS(this.state.center.lat, this.state.center.lng);
    database.ref(`/Current_location/${this.props.users.uid}/Last_Location`).set({
      isTableTrip: false,
      lat_degree: tmp.lat,
      latitude: this.state.center.lat,
      lng_degree: tmp.long,
      longitude: this.state.center.lng
    }, function (error) {
      if (error) {
        window.M.toast({ html: 'Cập nhật thất bại!' })
        // The write failed...
      } else {
        window.M.toast({ html: 'Cập nhật thành công!' })
        // Data saved successfully!
      }
    });
  }

  getLocation = () => {
    let center = {
      lat: this.state.center.lat + 0.00001,
      lng: this.state.center.lng + 0.00001
    }
    this.setState({
      center: center
    })
    geolocation.getCurrentPosition((err, position) => {
      if (position) {
        let center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        this.setState({
          center: center,
        })
      }
    });
  }

  render() {
    return (
      [<div className="row" key={'1'}>
        <div className="col l9 s9" style={{ marginTop: 7, backgroundColor: 'white', paddingTop: 10, paddingBottom: 10 }}>
          <div style={{ height: '80vh', width: '100%', position: 'relative' }}>
            <div className="card" style={{ zIndex: 9, width: 25, height: 25, position: 'absolute', left: 10, cursor: 'default' }} onClick={() => this.getLocation()}><i className="material-icons">location_on</i></div>
            <GoogleMapReact options={createMapOptions} bootstrapURLKeys={{ key: constants.MAP_KEY }} center={this.state.center} defaultZoom={this.state.zoom}>
              <MyPlace lat={this.state.center.lat} lng={this.state.center.lng} text={''} />
            </GoogleMapReact>
          </div>
        </div>
      </div>,
      <div className="row" key={'2'} style={{ marginTop: -5 }}>
        <div className="col l9 s9" style={{ marginTop: 7, backgroundColor: 'white', paddingTop: 10, paddingBottom: 10 }}>
          {/*
          <div className="left">
            Tự động lấy tọa độ
            <div className="switch">
              <label>
                Off
              <input type="checkbox" />
                <span className="lever"></span>
                On
              </label>
            </div>
          </div>*/}
          <div className="right" style={{ marginTop: 3 }}>
            <a className="waves-effect waves-light btn-small" onClick={() => this.saveLocation()}>Lấy tọa độ</a>
          </div>
        </div>
      </div>]
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationPage);

