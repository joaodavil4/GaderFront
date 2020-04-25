import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Button,
  StatusBar,
  ActivityIndicator,
  View,
  Text,
  Platform,
} from 'react-native'
import { Header } from 'react-navigation-stack'
import AppImages from '../../assets/images/index'
import Toast from 'react-native-simple-toast'
import Colors from '../../shared/sharedStyles/colors'
import LinearGradient from 'react-native-linear-gradient'

import { SignUpContainer, ComebackToLoginContentButton } from './styles'
import {
  ImageLogo,
  IconStyle,
  InputContainer,
  GaderInput,
  GadderButton,
  GaderContentButton,
  ErrorInputStyle,
  GaderInputErrorMessage,
} from '../../shared/sharedStyles/sharedElements'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import axios from '../../services/api'
import Utils from '../../shared/functions/utils'
import validations from '../../shared/functions/validations'
import fontDimension from '../../shared/sharedStyles/fontDimension'

export default class SignUp extends Component {
  state = { registerInfo: {}, showLoader: false }

  componentDidMount() {
    this.initRegister()
  }

  initRegister() {
    const emptyRegister = {
      FullName: undefined,
      FullNameValid: undefined,
      FullNameErrorMessage: undefined,
      Email: undefined,
      EmailErrorMessage: undefined,
      EmailValid: undefined,
      Password: undefined,
      PasswordErrorMessage: undefined,
      PasswordValid: undefined,
      PasswordConfirmation: undefined,
      PasswordConfirmationValid: undefined,
      PasswordConfirmationErrorMessage: undefined,
    }

    this.setState({
      registerInfo: emptyRegister,
    })
  }

  registerAccount = async () => {
    const registerInfoValid = this.validateRegisterInputs()

    if (!registerInfoValid) return

    this.setState({ showLoader: true })
    let newUser = this.state.registerInfo

    await axios
      .post('User', newUser)
      .then(result => {
        Toast.show('Sucessfull register!')
        this.initRegister()
        this.props.navigation.navigate('AccountConfirmation', { Email: newUser.Email })
        this.setState({ showLoader: false })
      })
      .catch(error => {
        Toast.show('This is e-mail already has an account.')
        this.setState({ showLoader: false })
      })
  }

  validateRegisterInputs() {
    let { registerInfo } = this.state

    registerInfo.FullNameValid = this.validateFullName(registerInfo.FullName)
    registerInfo.EmailValid = this.validateEmail(registerInfo.Email)
    registerInfo = this.validatePassword(registerInfo)

    this.setState({ registerInfo })

    const registerInfoValid =
      registerInfo.FullNameValid &&
      registerInfo.EmailValid &&
      registerInfo.PasswordValid &&
      registerInfo.PasswordConfirmationValid

    return registerInfoValid
  }

  validateFullName(fullName) {
    const { registerInfo } = this.state
    const minCharacteresFullNameValidation = 4
    const fullNameIsNotNull = !Utils.IsNullOrEmpty(fullName)
    const fullNameHasMinimalLength =
      fullNameIsNotNull && fullName.length >= minCharacteresFullNameValidation
    if (!fullNameIsNotNull) {
      registerInfo.FullNameErrorMessage = 'Required'
    } else if (!fullNameHasMinimalLength) {
      registerInfo.FullNameErrorMessage = `The full name input must be grater than ${minCharacteresFullNameValidation -
        1} characteres.`
    } else {
      registerInfo.FullNameErrorMessage = undefined
    }
    this.setState({ registerInfo })
    return fullNameHasMinimalLength && fullNameIsNotNull
  }

  validateEmail(email) {
    const { registerInfo } = this.state
    const emailIsNotEmpty = !Utils.IsNullOrEmpty(email)
    const emailIsValid = validations.validateEmail(email)

    if (!emailIsNotEmpty) {
      registerInfo.EmailErrorMessage = `Required`
      this.setState({ registerInfo })
      return false
    } else if (!emailIsValid) {
      registerInfo.EmailErrorMessage = `The e-mail is invalid`
      this.setState({ registerInfo })
      return false
    } else {
      registerInfo.EmailErrorMessage = undefined
      this.setState({ registerInfo })
    }
    return true
  }

  validatePassword(info) {
    const { registerInfo } = this.state
    const passwordIsNotEmpty = !Utils.IsNullOrEmpty(info.Password)
    const passwordHasMinimunSize = validations.validatePasswordRequirements(info.Password)

    info.PasswordValid = true
    if (!passwordIsNotEmpty) {
      registerInfo.PasswordErrorMessage = `Required`
      info.PasswordValid = false
    } else if (!passwordHasMinimunSize) {
      ; (registerInfo.PasswordErrorMessage =
        'The password must be grater than 6 characteres.'),
        (info.PasswordValid = false)
    } else {
      registerInfo.PasswordErrorMessage = undefined
    }

    const validatePasswordConfirmation = info.PasswordValid

    if (validatePasswordConfirmation) {
      const passwordIsNotEmpty = !Utils.IsNullOrEmpty(info.PasswordConfirmation)
      const passwordMatch = info.PasswordConfirmation === info.Password

      info.PasswordConfirmationValid = true
      if (!passwordIsNotEmpty || !passwordMatch) {
        registerInfo.PasswordConfirmationErrorMessage = "The password confirmation doesn't match."
        info.PasswordConfirmationValid = false
      } else {
        registerInfo.PasswordConfirmationErrorMessage = undefined
      }
    }
    this.setState({ registerInfo })
    return info
  }

  focusNextField(nextField) {
    this.refs[nextField].focus()
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? 'padding' : ''}
        style={{ flex: 1, height: '100%' }}>
        <StatusBar barStyle='dark-content' />
        <ScrollView style={{ height: '100%' }}>
          <View style={{ height: '100%', flex: 1 }}>
            <SignUpContainer>
              <ImageLogo source={AppImages.logoMedium} />
              <View style={{ height: '100%' }}>

                <InputContainer
                  style={
                    this.state.registerInfo.FullNameValid === false &&
                    ErrorInputStyle
                  }>
                  <Icon style={IconStyle} name='user' />
                  <GaderInput
                    ref='1'
                    returnKeyType='next'
                    placeholder='Full name'
                    value={this.state.registerInfo.FullName}
                    placeholderTextColor={Colors.gray}
                    onSubmitEditing={() => this.focusNextField('2')}
                    onChangeText={fullName =>
                      this.setState({
                        registerInfo: {
                          ...this.state.registerInfo,
                          FullName: fullName,
                        },
                      })
                    }
                  />
                  <GaderInputErrorMessage>
                    {this.state.registerInfo.FullNameErrorMessage}
                  </GaderInputErrorMessage>
                </InputContainer>

                <InputContainer
                  style={
                    this.state.registerInfo.EmailValid === false &&
                    ErrorInputStyle
                  }>
                  <Icon style={IconStyle} name='envelope' />
                  <GaderInput
                    ref='2'
                    returnKeyType='next'
                    placeholder='E-mail'
                    value={this.state.registerInfo.Email}
                    placeholderTextColor={Colors.gray}
                    onSubmitEditing={() => this.focusNextField('3')}
                    keyboardType='email-address'
                    onChangeText={email =>
                      this.setState({
                        registerInfo: {
                          ...this.state.registerInfo,
                          Email: email,
                        },
                      })
                    }
                  />
                  <GaderInputErrorMessage>
                    {this.state.registerInfo.EmailErrorMessage}
                  </GaderInputErrorMessage>
                </InputContainer>

                <InputContainer
                  style={
                    this.state.registerInfo.PasswordValid === false &&
                    ErrorInputStyle
                  }>
                  <Icon style={IconStyle} name='lock' />
                  <GaderInput
                    ref='3'
                    returnKeyType='next'
                    placeholder='Password'
                    secureTextEntry={true}
                    value={this.state.registerInfo.Password}
                    placeholderTextColor={Colors.gray}
                    onSubmitEditing={() => this.focusNextField('4')}
                    onChangeText={password =>
                      this.setState({
                        registerInfo: {
                          ...this.state.registerInfo,
                          Password: password,
                        },
                      })
                    }
                  />
                  <GaderInputErrorMessage>
                    {this.state.registerInfo.PasswordErrorMessage}
                  </GaderInputErrorMessage>
                </InputContainer>

                <InputContainer
                  style={
                    this.state.registerInfo.PasswordConfirmationValid ===
                    false && {
                      ErrorInputStyle
                    }
                  }>
                  <Icon style={IconStyle} name='lock' />
                  <GaderInput
                    ref='4'
                    placeholderTextColor={Colors.gray}
                    returnKeyType='join'
                    secureTextEntry={true}
                    placeholder='Password Confirmation'
                    value={this.state.registerInfo.PasswordConfirmation}
                    placeholderTextColor={Colors.gray}
                    onSubmitEditing={() => this.registerAccount()}
                    onChangeText={password =>
                      this.setState({
                        registerInfo: {
                          ...this.state.registerInfo,
                          PasswordConfirmation: password,
                        },
                      })
                    }
                  />
                  <GaderInputErrorMessage>
                    {this.state.registerInfo.PasswordConfirmationErrorMessage}
                  </GaderInputErrorMessage>
                </InputContainer>
                <GadderButton
                  title='Create account'
                  color={Colors.white}
                  disabled={this.state.showLoader}
                  backgroundColor={Colors.primary}
                  onPress={() => {
                    this.registerAccount()
                  }}>
                  <GaderContentButton>Create account</GaderContentButton>
                </GadderButton>
                {this.state.showLoader && (
                  <ActivityIndicator size='small' color={Colors.white} />
                )}

                <ComebackToLoginContentButton>
                  <Button
                    title='Are you already Gader?'
                    color={Colors.gray}
                    onPress={() => {
                      this.props.navigation.goBack()
                    }}
                  />
                </ComebackToLoginContentButton>

              </View>
            </SignUpContainer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}
