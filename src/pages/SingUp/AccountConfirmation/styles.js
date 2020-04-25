import styled from 'styled-components/native'
import Colors from '../../../shared/sharedStyles/colors'
import FontDimensions from '../../../shared/sharedStyles/fontDimension'

export const ConfirmationContainer = styled.View`
  background-color: ${Colors.white};
  height: 100%;
  align-self: center;
  width: 80%; 
` 


export const ConfirmAccountButton = styled.Button`
  background: ${Colors.primary};
`

export const ConfirmAccountContainerButton = styled.View`
    background-color: ${Colors.secondary}
    font-size: ${FontDimensions.bigger}; 
    align-self: center;
    border-radius: 8px;
    border-color: ${Colors.secondary};
    border-width: .5px;
    opacity: .9;
    box-shadow: .5px .5px 2px;
    width: 70%;
    margin-top: 20px;
`

export const ResendEmailButtonContainer = styled.View`
  margin-top: 35%;
  height: 100%; 
`
