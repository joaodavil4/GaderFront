import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { ForgotPasswordContainer } from './styles'
import {
  ImageLogo,
  GaderInput,
  InputContainer,
  IconStyle,
  GadderButton,
  GaderContentButton,
  GaderInputErrorMessage,
  ErrorInputStyle,
} from '../../../shared/sharedStyles/sharedElements'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Colors from '../../../shared/sharedStyles/colors'
import AppImage from '../../../assets/images/index'
import Toast from 'react-native-simple-toast'
import validations from '../../../shared/functions/validations'
import utils from '../../../shared/functions/utils'
import axios from '../../../services/api'

const initialState = {
  emailAddress: undefined,
  emailAddressErrorMessage: undefined,
  showLoader: false,
}

export default class ForgotPassword extends Component {
  state = { ...initialState }

  resendConfirmationCodeByEmail = async () => {
    if (utils.IsNullOrEmpty(this.state.emailAddress)) {
      this.setState({ emailAddressErrorMessage: 'Required' })
      return
    } else if (!validations.validateEmail(this.state.emailAddress)) {
      this.setState({ emailAddressErrorMessage: 'This e-mail is invalid' })
      return
    } else {
      this.setState({ emailAddressErrorMessage: undefined })
    }
    this.setState({ showLoader: true })
    await axios
      .post(`Auth/RequestRecoverPassword?Email=${this.state.emailAddress}`)
      .then(() => {
        this.setState({ showLoader: false })
        let email = this.state.emailAddress
        const state = { ...this.state }
        state.emailAddress = undefined
        this.setState(state)
        this.props.navigation.navigate('PasswordReset', {
          Email: email,
        })
      })
      .catch(error => {
        console.info(error)
        Toast.show('This e-mail has no a Gader account.')
        this.setState({ showLoader: false })
      })
  }
  render() {
    return (
      <ForgotPasswordContainer>
        <ImageLogo source={AppImage.logoMedium} />
        <View
          style={{
            height: '100%',
            width: '80%',
            alignSelf: 'center',
            marginTop: '27%',
          }}>
          <View style={{ height: '100%', width: '100%', alignSelf: 'center' }}>
            <InputContainer
              style={
                this.state.emailAddressErrorMessage !== undefined &&
                ErrorInputStyle
              }>
              <Icon style={IconStyle} name='envelope' />
              <GaderInput
                keyboardType='email-address'
                placeholder='E-mail'
                returnKeyType="send"
                placeholderTextColor={Colors.green}
                value={this.state.emailAddress}
                onSubmitEditing={() => this.resendConfirmationCodeByEmail()}
                onChangeText={emailAddress => {
                  const state = { ...this.state }
                  state.emailAddress = emailAddress
                  this.setState(state)
                }}
              />
              <GaderInputErrorMessage>
                {this.state.emailAddressErrorMessage}
              </GaderInputErrorMessage>
            </InputContainer>

            <GadderButton
              disabled={this.state.showLoader}
              color={Colors.white}
              title='Request recovery'
              onPress={() => this.resendConfirmationCodeByEmail()}>
              <GaderContentButton>Request recovery</GaderContentButton>
            </GadderButton>
            {this.state.showLoader && (
              <ActivityIndicator size='small' color={Colors.white} />
            )}

          </View>
        </View>
      </ForgotPasswordContainer>
    )
  }
}
