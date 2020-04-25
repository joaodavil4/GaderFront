import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { ResendCodeContainer } from './styles'
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

export default class ResendCode extends Component {
  state = {
    emailAddress: undefined,
    emailAddressErrorMessage: undefined,
    showLoader: false,
  }

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
      .post(
        `Auth/ResendAccountValidationCode?Email=${this.state.emailAddress}`,
        {},
      )
      .then(() => {
        this.setState({ showLoader: false })
        this.props.navigation.navigate('AccountConfirmation', {
          Email: this.state.emailAddress,
        })
      })
      .catch(error => {
        console.info(error)
        Toast.show(error.toString())
        this.setState({ showLoader: false })
      })
  }
  render() {
    return (
      <ResendCodeContainer>
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
                placeholderTextColor={Colors.green}
                value={this.state.emailAddress}
                onChangeText={emailAddress =>
                  this.setState({ emailAddress: emailAddress })
                }
              />
              <GaderInputErrorMessage>
                {this.state.emailAddressErrorMessage}
              </GaderInputErrorMessage>
            </InputContainer>

            <GadderButton
              color={Colors.white}
              title='Resend confirmation code'
              onPress={() => this.resendConfirmationCodeByEmail()}>
              <GaderContentButton>Resend code</GaderContentButton>
            </GadderButton>
            {this.state.showLoader && (
              <ActivityIndicator size='small' color={Colors.white} />
            )}

          </View>
        </View>
      </ResendCodeContainer>
    )
  }
}
