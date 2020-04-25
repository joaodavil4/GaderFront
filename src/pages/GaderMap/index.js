import React, {Component} from 'react'
import {Text, StatusBar} from 'react-native'
import MapView from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'

import {
  MapHeader,
  MapHeaderMenu,
  MapFooter,
  MapFooterItem,
  IconStyle,
  MainIconStyle,
  MapFooterMainItem,
  MapHeaderMenuSelectedStyle,
  MapStyle,
  IconStyleSelected,
} from './styles'
import {} from '../../shared/sharedStyles/sharedElements'
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Colors from '../../shared/sharedStyles/colors'

export default class GaderMap extends Component {
  state = {
    region: null,
  }
  componentDidMount () {
    Geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}}) => {
        console.log(latitude, longitude)
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
        })
      },
      () => {},
      {
        timeout: 1000, // Time to get the location
        enableHighAccuracy: true, // Get location by gps
        maximumAge: 1000, // Time to save location
      },
    )
  }

  render () {
    const {region} = this.state

    return (
      <>
        <Text
          style={{
            margin: '41%',
            width: 150,
            zIndex: 10000,
            position: 'absolute',
          }}>
          {this.state.region?.latitude + `` + this.state.region?.longitude}
        </Text>

        <StatusBar barStyle='dark-content' />
        <MapHeader>
          <MapHeaderMenu style={MapHeaderMenuSelectedStyle}>
            EVENTS
          </MapHeaderMenu>
          <MapHeaderMenu>NEARBY</MapHeaderMenu>
        </MapHeader>
        <MapView
          style={MapStyle}
          region={region}
          showsUserLocation
          loadingEnabled
          onLongPress={(a)=>{ Toast.show('pressed'+a) }}
        />
        <MapFooter>
          <MapFooterItem>
            <Icon style={{...IconStyle, fontSize: 25}} name='calendar' />
          </MapFooterItem>
          <MapFooterItem>
            <Icon style={{...IconStyle, fontSize: 32, marginBottom: 5, }} name='home' />
          </MapFooterItem>
          <MapFooterMainItem>
            <Icon color={Colors.white} style={MainIconStyle} name='plus' />
          </MapFooterMainItem>
          <MapFooterItem>
            <Icon style={IconStyle} name='user-circle' />
          </MapFooterItem>
        <MapFooterItem>
            <Icon style={IconStyle} name='bell' />
          </MapFooterItem>
        </MapFooter>
      </>
    )
  }
}
