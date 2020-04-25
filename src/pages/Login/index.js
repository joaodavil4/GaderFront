import React, { Component } from 'react'
import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native'

import {
  LoginContainer,
  SocialMediaLoginContainer,
  LoginTypeSeparator,
} from './styles'
import {
  ImageLogo,
  GaderInput,
  IconStyle,
  InputContainer,
  GadderButton,
  GaderContentButton,
  ErrorInputStyle,
  LinkButton,
  LinkTextButton
} from '../../shared/sharedStyles/sharedElements'
import AppImage from '../../assets/images/index'
import Colors from '../../shared/sharedStyles/colors'
import Validator from '../../shared/functions/validations'
import Utils from '../../shared/functions/utils'
import Toast from 'react-native-simple-toast'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import axios from '../../services/api'

const initialLoginState = {
  emailAddress: undefined,
  emailValid: undefined,
  password: undefined,
  passwordValid: undefined,
  showLoader: false,
}

export default class Login extends Component {
  state = Object.assign(initialLoginState)

  login = async () => {
    if (this.validateLogin() === false) return

    this.setState({ showLoader: true })
    const authInfo = {
      Email: this.state.emailAddress,
      Password: this.state.password,
    }
    await axios
      .post('Auth/PerformAuthentication', authInfo)
      .then(authObject => {
        this.setState(Object.assign(initialLoginState))
        this.props.navigation.navigate('GaderMap')
        this.setState({ showLoader: false })
      })
      .catch(error => {
        console.log(error)
        Toast.show('Invalid e-mail or password.')
        this.setState({ showLoader: false })
      })
  }

  validateLogin() {
    if (Utils.IsNullOrEmpty(this.state.emailAddress)) {
      Toast.show('The e-mail is empty.')
      this.setState({ emailValid: false })
      return false
    } else if (!Validator.validateEmail(this.state.emailAddress)) {
      Toast.show('The e-mail is invalid.')
      this.setState({ emailValid: false })
      return false
    } else {
      this.setState({ emailValid: true })
    }

    if (this.state.password == undefined || this.state.password == '') {
      Toast.show('The password field is empty.')
      this.setState({ passwordValid: false })
      return false
    } else {
      this.setState({ passwordValid: true })
    }
    return true
  }

  focusNextField(nextField) {
    this.refs[nextField].focus()
  }

  render() {
    return (
      <LoginContainer>
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? 'padding' : ''}>
          <ScrollView>
            <View style={{ height: '100%' }}> 
              <ImageLogo source={AppImage.logoMedium} />
              <SocialMediaLoginContainer></SocialMediaLoginContainer>
              <LoginTypeSeparator>──────── OR ────────</LoginTypeSeparator>
              <View
                style={{ flex: 1, width: '90%', alignSelf: 'center' }}>
                <InputContainer
                  style={this.state.emailValid === false && ErrorInputStyle}>
                  <Icon style={IconStyle} name='envelope' />
                  <GaderInput
                    ref='1'
                    returnKeyType='next'
                    onSubmitEditing={() => this.focusNextField('2')}

                    placeholder='E-mail'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    placeholderTextColor={Colors.green}
                    onChangeText={emailAddress =>
                      this.setState({ emailAddress: emailAddress })
                    }
                  />
                </InputContainer>
                <InputContainer
                  style={
                    this.state.passwordValid === false && ErrorInputStyle
                  }>
                  <Icon style={IconStyle} name='lock' />
                  <GaderInput
                    ref='2'
                    returnKeyType='join'
                    onSubmitEditing={() => this.login()}
                    secureTextEntry={true}
                    placeholder='Password'
                    placeholderTextColor={Colors.green}
                    onChangeText={password =>
                      this.setState({ password: password })
                    }
                  />
                </InputContainer>

                <GadderButton
                  activeOpacity={0.8}
                  color={Colors.white}
                  backgroundColor={Colors.primary}
                  onPress={() => {
                    this.login()
                  }}>
                  <GaderContentButton>Login</GaderContentButton>
                  {this.state.showLoader && (
                    <ActivityIndicator size='small' color={Colors.white} />
                  )}
                </GadderButton>
                <View style={{ marginTop: '5%', height: '100%', marginTop: '30%' }}>
                  <LinkButton
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.navigation.navigate('SignUp')
                    }}>
                    <LinkTextButton>Not a member?</LinkTextButton>
                  </LinkButton>
                  <LinkButton
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.navigation.navigate('AccountConfirmation')
                    }}>
                    <LinkTextButton>Account confirmation</LinkTextButton>
                  </LinkButton>
                  <LinkButton
                    activeOpacity={0.8}
                    onPress={() => {
                      this.props.navigation.navigate('ForgotPassword')
                    }}>
                    <LinkTextButton>Forgot password?</LinkTextButton>
                  </LinkButton>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LoginContainer>
    )
  }
}
