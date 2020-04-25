import styled from 'styled-components/native'
import { IconStyleShared } from '../../shared/sharedStyles/sharedElements'
import Colors from '../../shared/sharedStyles/colors'
import { Platform } from 'react-native';

export const MapHeader = styled.View` 
  flexDirection: row
  justifyContent: center  
  height:6%
  top: 12 
  marginTop: ${Platform.OS === "ios" ? '7%' : '3px'}
`

export const MapHeaderMenu = styled.Text`
  margin: 0 15%;
  font-size: 20;
  font-weight: 300;
`
export const MapHeaderMenuSelectedStyle = {
  marginLeft: '15%',
  marginRight: '15%',
  marginTop: 0,
  marginBottom: 0,
  color: Colors.secondary,
  fontSize: 20,
  fontWeight: '700',
}

export const MapFooter = styled.View`
    height: 6.5%
    width: 100% 
    flexDirection: row
    justifyContent: center  
    alignItems: center
    marginBottom: ${Platform.OS === 'ios' ? '2%' : 'auto' }
`

export const IconStyleSelected = {
  ...IconStyleShared,
  color: Colors.selected
}

export const MapFooterItem = styled.View`
  margin: 8px 25px 
`

export const MapFooterMainItem = styled.View` 
 margin: 0px 8px 25px 8px 
 padding-right: 1.5%
 padding-top: .8%
 background-color: ${Colors.secondary}
 border-radius: 35px
 width: 13.5%
 height: 110%
`

export const IconStyle = {
  ...IconStyleShared,
  fontSize: 28,
  width: '100%',
  height: '100%'
}

export const MainIconStyle = {
  ...IconStyle,
  fontSize: 35,
  paddingLeft: '30%',
  paddingTop: '15%'
}

export const MapStyle = {
  flex: 1,
  height: '100%',
}
