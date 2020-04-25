import styled from 'styled-components/native'
import Colors from '../../shared/sharedStyles/colors' 
import fontDimension from '../../shared/sharedStyles/fontDimension'

export const Container = styled.View`
  background-color: ${Colors.white};
`

export const LoginContainer = styled.View`
  background-color: ${Colors.white};
  height: 100%;
  flex: 1;
`

export const SocialMediaLoginContainer = styled.View`
  width: 70%;
  align-self: center;
  flex-direction: row;
` 

export const LoginTypeSeparator = styled.Text`
  align-self: center;
  margin: 3% auto;
  color: white;
`
export const SocialIconContainer = styled.View`
  width: 50%;
  background: ${Colors.gray};
`
 