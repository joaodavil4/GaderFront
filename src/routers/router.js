import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import Login from '../pages/Login'
import SignUp from '../pages/SingUp'
import AccountConfirmation from '../pages/SingUp/AccountConfirmation'
import ResendCode from '../pages/SingUp/ResendCode'
import GaderMap from '../pages/GaderMap'

import Colors from '../shared/sharedStyles/colors'
import FontsDimension from '../shared/sharedStyles/fontDimension'
import ForgotPassword from '../pages/Login/ForgotPassword'
import PasswordReset from '../pages/Login/ForgotPassword/PasswordReset'

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerStyle: {
          borderBottomColor: Colors.white,
          borderTopColor: Colors.white,
          elevation: 0
        },
        headerTitleStyle: {
          color: Colors.primary,
          fontSize: 23,
        },
      },
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        headerStyle: {
          borderBottomColor: Colors.white,
        },
        headerTitleStyle: {
          color: Colors.primary,
          fontSize: 23,
        },
        headerTransparent: false,
        headerTintColor: Colors.primary,
      },
    },
    AccountConfirmation: {
      screen: AccountConfirmation,
      navigationOptions: {
        headerStyle: {
          borderBottomColor: Colors.white,
        },
        headerTitleStyle: {
          color: Colors.primary,
          fontSize: 19,
        },
        headerTintColor: Colors.primary,
      },
    },
    ResendCode: {
      screen: ResendCode,
      navigationOptions: {
        headerStyle: {
          borderBottomColor: Colors.white,
        },
        headerTitleStyle: {
          color: Colors.primary,
          fontSize: 15,
        },
        headerTintColor: Colors.primary,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        headerStyle: {
          borderBottomColor: Colors.white,
        },
        headerTitleStyle: {
          color: Colors.primary,
          fontSize: 15,
        },
        headerTintColor: Colors.primary,
      },
    },
    PasswordReset: {
      screen: PasswordReset,
      navigationOptions: {
        headerStyle: {
          borderBottomColor: Colors.white,
        },
        headerTitleStyle: {
          color: Colors.primary,
          fontSize: 15,
        },
        headerTintColor: Colors.primary,
      },
    },
    GaderMap: {
      screen: GaderMap,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Login',
    unmountInactiveRoutes: true,
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'transparent',
      },
    }),
    defaultNavigationOptions: {
      headerTitleStyle: {
        color: Colors.primary,
        fontSize: FontsDimension.bigger,
      },
    },
  },
)

export default Router = createAppContainer(AppNavigator)
