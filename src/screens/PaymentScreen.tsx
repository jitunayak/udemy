import React from 'react'
import { View, Text } from 'react-native'
import WebView from 'react-native-webview'

export default function PaymentScreen() {
    return (
        <WebView
            source={{ uri: 'https://rzp.io/l/3dwU2on' }}
        />
    )
}
