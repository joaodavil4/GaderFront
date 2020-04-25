import React, { Component } from 'react'
import {
  View,
  Button,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import {
  ConfirmationContainer,
  ResendEmailButtonContainer,
} from './styles'
import {
  ImageLogo,
  InputContainer,
  GaderContentButton,
  GadderButton,
  GaderInput,
  IconStyle,
  GaderInputErrorMessage,
  ErrorInputStyle,
  ConfirmationCodeWarning,
} from '../../../shared/sharedStyles/sharedElements'
import AppImage from '../../../assets/images/index'
import Colors from '../../../shared/sharedStyles/colors'
import CodeInput from 'react-native-confirmation-code-field'
import axios from '../../../services/api'

import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import validations from '../../../shared/functions/validations'
import utils from '../../../shared/functions/utils'

const initalState = {
  showLoader: false,
  RequestEmail: false,
  ConfirmationCode: undefined,
  Email: undefined,
  EmailErrorMessage: undefined,
}

export default class AccountConfirmation extends Component {
  state = { ...initalState }

  UNSAFE_componentWillReceiveProps(newProps, _ignorePlease) {
    this.setState({
      Email: newProps.navigation.state?.params?.Email,
      RequestEmail: newProps.navigation.state?.params?.Email === undefined,
    })
  }

  componentDidMount() {
    this.setState({
      Email: this.props.navigation.state?.params?.Email,
      RequestEmail: this.props.navigation.state?.params?.Email === undefined,
    })
  }

  validateFields(authInfo) {
    if (utils.IsNullOrEmpty(authInfo.Email)) {
      this.setState({ EmailErrorMessage: 'Required.' })
      return false
    } else if (!validations.validateEmail(authInfo.Email)) {
      this.setState({ EmailErrorMessage: 'The e-mail is invalid.' })
      return false
    } else {
      this.setState({ EmailErrorMessage: undefined })
    }

    if (authInfo.AccountValidationCode == undefined) {
      Toast.show('The confirmation code must be informed.')
      return false
    }

    return true
  }

  focusNextField(nextField) {
    this.refs[nextField].focus()
  }

  confirmAccount = async pValidationCode => {
    const validationCode = this.state.RequestEmail
      ? this.state.ConfirmationCode
      : pValidationCode

    const authInfo = {
      Email: this.state.Email,
      AccountValidationCode: parseInt(validationCode),
    }

    const validFields = this.validateFields(authInfo)

    if (!validFields) return

    this.setState({ showLoader: true })
    await axios
      .post('Auth/PerformAuthentication', authInfo)
      .then(authObject => {
        this.props.navigation.navigate('GaderMap', { authObject: authObject })
        this.setState({ showLoader: false })
      })
      .catch(error => {
        if (this.state.RequestEmail) Toast.show('Invalid e-mail or code.')
        else Toast.show('Invalid code.')
        this.setState({ showLoader: false })
      })
  }

  render() {
    return (
      <ConfirmationContainer>
        <ImageLogo source={AppImage.logoMedium} />
        <View style={{ marginTop: '8%' }}>
          {this.state.RequestEmail && (
            <InputContainer
              style={
                this.state.EmailErrorMessage !== undefined && ErrorInputStyle
              }>
              <Icon style={IconStyle} name='envelope' />
              <GaderInput
                ref='1'
                placeholder='E-mail'
                returnKeyType="next"
                onSubmitEditing={() => this.focusNextField('codeInputRef')}
                onChangeText={email => this.setState({ Email: email })}
              />
              <GaderInputErrorMessage>
                {this.state.EmailErrorMessage}
              </GaderInputErrorMessage>
            </InputContainer>
          )}

          <View style={{ height: '100%', marginTop: '10%' }}>

            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}>
              <View style={{ marginBottom: '3%' }}>
                <CodeInput
                  ref='codeInputRef'
                  activeColor={Colors.dark}
                  codeLength={6}
                  keyboardType='numeric'
                  className='border-circle'
                  inactiveColor={Colors.secondary}
                  blurOnSubmit={true}
                  onFulfill={code => {
                    this.setState({ ConfirmationCode: code })
                    if (!this.state.RequestEmail) this.confirmAccount(code)
                  }}
                />
              </View>
            </TouchableWithoutFeedback>

            <ConfirmationCodeWarning>
              Type the code you received by e-mail.
            </ConfirmationCodeWarning>

            {this.state.RequestEmail && (
              <> 
                <GadderButton
                  title='Confirm account' 
                  backgroundColor={Colors.primary}
                  onPress={() => {
                    this.confirmAccount()
                  }}
                > 
                <GaderContentButton>Confirm account</GaderContentButton>
                </GadderButton>
                {this.state.showLoader && (
                  <ActivityIndicator size='small' color={Colors.white} />
                )} 
              </>
            )}

            {this.state.showLoader && !this.state.RequestEmail && (
              <ActivityIndicator
                style={{
                  marginTop: '35%',
                  marginLeft: '35%',
                  position: 'absolute',
                }}
                size='small'
                color={Colors.dark}
              />
            )}

            <ResendEmailButtonContainer>
              <Button
                color={Colors.darkGray}
                title='Resend code'
                onPress={() => {
                  const state = { ...initalState }
                  this.setState({ state })
                  this.props.navigation.navigate('ResendCode')
                  this.refs.codeInputRef.clear()
                }}
              />
            </ResendEmailButtonContainer>

          </View>
        </View>
      </ConfirmationContainer>
    )
  }
}
