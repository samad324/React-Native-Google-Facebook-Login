import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isSigninInProgress: false
        }
    }

    componentDidMount() {
        GoogleSignin.configure()
    }


    _signIn = async () => {
        this.setState({ isSigninInProgress: true })
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            alert(`Welcome ${userInfo.user.name}`)
            this.setState({ userInfo, isSigninInProgress: false });
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };


    render() {
        const { isSigninInProgress } = this.state
        return (
            <View>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this._signIn}
                    disabled={isSigninInProgress} />
            </View>
        )
    }
}
