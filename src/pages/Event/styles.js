import styled from 'styled-components/native'
import Colors from '../../shared/sharedStyles/colors' 

export const Container = styled.View`
  background-color: ${Colors.white};
`

export const EventContainer = styled.View`
  background-color: ${Colors.white};
  height: 100%;
  flex: 1;
`

export const ImageEvent = styled.Image`
  width: 70%;
  align-self: center;
  flex-direction: row;
`