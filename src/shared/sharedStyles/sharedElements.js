import styled from 'styled-components/native'
import Colors from '../../shared/sharedStyles/colors'
import FontDimensions from '../../shared/sharedStyles/fontDimension'
import fontDimension from '../../shared/sharedStyles/fontDimension'
import { Platform } from 'react-native'

export const ImageLogo = styled.Image`
  align-items: center;
  align-self: center;
  margin-top: 0%;
  margin-bottom: 0%;
`

export const InputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  align-self: center;
  height: 10%;
  border-radius: 10;
  margin: 7px;
  padding: 0;
  border-bottom-color: ${Colors.gray};
  border-bottom-width: 0.5px;
`
export const ConfirmationCodeWarning = styled.Text`
    font-size: ${FontDimensions.small};
    align-self: center;
`;

export const IconStyle = {
  padding: 0,
  marginBottom: -12,
  marginTop: 2,
  marginLeft: 20,
  marginRight: 10,
  height: 20,
  fontSize: FontDimensions.big,
  color: Colors.darkGray,
  width: 20,
}

export const GaderInput = styled.TextInput`
  flex: 1;
  font-size: ${FontDimensions.big};
  color: ${Colors.secondary};
  margin-bottom: -5%;
`

export const GadderButton = styled.TouchableOpacity`
background-color: ${Colors.secondary} 
border-radius: 8px;
border-color: ${Colors.secondary};
border-width: .5px;
opacity: .9;
box-shadow: .5px .5px 2px;
width: 100%;
height: 8%;
margin-top: 20px;
flex-direction: row
justify-content: center 
`

export const GaderContentButton = styled.Text`
   color: ${Colors.white}; 
   align-self: center;
   font-size: ${FontDimensions.big}; 
   padding: 25%; 
   ${Platform.OS === 'ios' ? 'padding-top: 20%' : ''} 
`

export const ErrorInputStyle = {
  borderBottomColor: `${Colors.error}`,
  borderBottomWidth: 1.2,
}

export const GaderInputErrorMessage = styled.Text`
  top: 110%
  right: 2%
  position: absolute
  fontSize: ${fontDimension.smaller}
  color: ${Colors.error}
`

export const LinkTextButton = styled.Text`
  color: ${Colors.dark};
  font-size: ${FontDimensions.big};
`

export const LinkButton = styled.TouchableOpacity`
align-self: center;

background-color: ${Colors.white};
margin: 2%;
`