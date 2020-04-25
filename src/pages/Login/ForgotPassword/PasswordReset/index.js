import React, { Component } from 'react'
import { Text, View, ActivityIndicator, ScrollView } from 'react-native'

import { PasswordResetContainer } from './styles'
import {
  ImageLogo,
  GaderContentButton,
  GadderButton,
  GaderInputErrorMessage,
  ErrorInputStyle,
  IconStyle,
  InputContainer,
  GaderInput,
  ConfirmationCodeWarning
} from '../../../../shared/sharedStyles/sharedElements'
import AppImage from '../../../../assets/images/index'

import axios from '../../../../services/api'
import Colors from '../../../../shared/sharedStyles/colors'

import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import CodeInput from 'react-native-confirmation-code-field'
import Utils from '../../../../shared/functions/utils'
import Validations from '../../../../shared/functions/validations'
import validations from '../../../../shared/functions/validations'

export default class PasswordReset extends Component {
  state = {
    Email: undefined,
    NewPassword: undefined,
    PasswordErrorMessage: undefined,
    AccountRecoverCode: undefined,
    showLoader: false,
  }

  componentDidMount() {
    const state = { ...this.state }
    state.Email = this.props.navigation.state.params.Email
    this.setState(state)
  }

  resetAccount = async () => {
    const payloadValid = this.validate()

    if (payloadValid === false) return

    const payload = { ...this.state }
    payload.AccountRecoverCode = parseInt(payload.AccountRecoverCode)
    console.info(payload)

    this.setState({ showLoader: true })
    await axios
      .post('Auth/PerformResetAccountPassword', payload)
      .then(() => {
        this.props.navigation.navigate('Login')
        this.setState({ showLoader: false })
        Toast.show('Password was chaged successfully', Toast.LONG)
      })
      .catch(error => {
        console.log(error)
        Toast.show('Invalid code.')
        this.setState({ showLoader: false })
      })
  }

  validate() {
    if (Utils.IsNullOrEmpty(this.state.NewPassword)) {
      this.setState({ PasswordErrorMessage: 'Required' })
      return false
    } else if (
      !validations.validatePasswordRequirements(this.state.NewPassword)
    ) {
      this.setState({
        PasswordErrorMessage: 'The password must be grater than 6 characteres',
      })
      return false
    } else {
      this.setState({ PasswordErrorMessage: undefined })
    }

    if (this.state.AccountRecoverCode == undefined) {
      Toast.show('The confirmation code is required')
      return false
    }

    return true
  }

  focusNextField(nextField) {
    this.refs[nextField].focus()
  }

  render() {
    return (
      <PasswordResetContainer>
        <ImageLogo source={AppImage.logoMedium} />
        <View>
          <View
            style={{
              height: '100%',
              width: '80%',
              alignSelf: 'center',
              marginTop: '10%',
            }}>
            <InputContainer
              style={
                this.state.PasswordErrorMessage !== undefined && ErrorInputStyle
              }>
              <Icon style={IconStyle} name='unlock-alt' />
              <GaderInput
                ref='1'
                returnKeyType='next'
                secureTextEntry={true}
                placeholder='New Password'
                onSubmitEditing={() => this.focusNextField('codeInputRef')}
                onChangeText={newPassword =>
                  this.setState({ NewPassword: newPassword })
                }
              />
              <GaderInputErrorMessage>
                {this.state.PasswordErrorMessage}
              </GaderInputErrorMessage>
            </InputContainer>

            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps='handled'>
              <View style={{ height: '100%', marginTop: '7%' }}>
                <View style={{ marginBottom: '3%' }}>
                  <CodeInput
                    ref='codeInputRef'
                    activeColor={Colors.dark}
                    codeLength={6}
                    keyboardType='numeric'
                    className='border-circle'
                    inactiveColor={Colors.secondary}
                    onFulfill={code => {
                      const state = { ...this.state }
                      state.AccountRecoverCode = code
                      this.setState(state)
                    }}
                  />
                </View>
                <ConfirmationCodeWarning>
                  Type the code you received by e-mail.
                </ConfirmationCodeWarning>

                <GadderButton
                  title='Reset password'
                  color={Colors.white}
                  backgroundColor={Colors.primary}
                  onPress={() => {
                    this.resetAccount()
                  }}>
                  <GaderContentButton>Reset password</GaderContentButton>
                </GadderButton>
                {this.state.showLoader && (
                  <ActivityIndicator size='small' color={Colors.white} />
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </PasswordResetContainer>
    )
  }
}
