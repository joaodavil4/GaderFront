import React, { Component } from 'react'
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native'

export default class Event extends Component {

    render(){
        return (
            <EventContainer>
                <ScrollView>
                    <View style= {{ height: '100%'}}>
                        <ImageEvent></ImageEvent>
                        <View style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
                                <InputContainer>
                                    <GaderInput
                                        ref='1'
                                        placeholder= 'Room Name'
                                        onSubmitEditing={() => this.focusNextField('2')}
                                        returnKeyType='next'
                                    />
                                </InputContainer>

                                
                                <InputContainer>
                                    <GaderInput
                                        ref='2'
                                        placeholder= 'Start'
                                        onSubmitEditing={() => this.focusNextField('3')}
                                        returnKeyType='next'
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <GaderInput
                                        ref='4'
                                        placeholder= 'Interestings'
                                    />
                                </InputContainer>
                        </View>
                    </View>
                </ScrollView>
            </EventContainer>
        )
    }
}