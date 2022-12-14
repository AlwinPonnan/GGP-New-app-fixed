import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { webUrl } from '../api/url';
import { getAuthToken, getFavcyAuthToken, removeAuthToken } from '../api/user';
import WebView from 'react-native-webview';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { Colors } from '../Styles/theme';
export default function Payment(props) {
    const [auth_token, setAuth_token] = useState("");
    const [loading, setLoading] = useState(true);
    const [shouldHide, setShouldHide] = useState(false);
    const [client, setClient] = useState("");
    const [order_id, setOrder_id] = useState("");
    const [success_callback, setSuccess_callback] = useState("");
    const [error_callback, setError_callback] = useState("");
    const [additionalParams, setadditionalParams] = useState("");
    const [favcyPaymentResponse, setFavcyPaymentResponse] = useState("");
    const [redirect, setRedirect] = useState("0");
    const [currency_type, setCurrency_type] = useState("INR");
    const [provider, setProvider] = useState("razorpay");
    const [amount_in_100, setAmount_in_100] = useState(0);
    const [HTML, setHTML] = useState("");
    const getDataOnInit = async () => {
        // console.log(props.route.params.data, "data")
        let token = await getAuthToken()
        let favcyAuthtoken = await getFavcyAuthToken()
        setAuth_token(token)
        // console.log(client, "1_client");
        // console.log(favcyAuthtoken, "1_favcyAuthtoken");
        // console.log(auth_token, "1_auth token");
        // console.log(order_id, "1_order_id");
        // console.log(success_callback, "1_success_callback");
        // console.log(error_callback, "1_error_callback");
        // console.log(redirect, "1_redirect");
        // console.log(provider, "1_provider");
        // console.log(currency_type, "1_currency_type");
        // console.log(amount_in_100, "1_amount_in_100");
        const tempHTML = `
            <html>
            <head>
            </head>
            <body>
            <div style="margin-top:50px">
            <div>loading ...</div>
            <form id="formPayment" style="display:none; opacity:0" action="https://www.favcy.com/payments/pay" method="POST">
                         <input type="text" style="display:none; opacity:0" name="auth_token" value="${favcyAuthtoken}" onChange={(e) => setAuth_token(e.target.value)} placeholder="Auth Token" />
                         <input type="text" style="display:none; opacity:0" name="client" value="${client}" onChange={(e) => setClient(e.target.value)} placeholder="Client" />
                         <input type="text" style="display:none; opacity:0" name="order_id" value="${order_id}" onChange={(e) => setOrder_id(e.target.value)} placeholder="Order_Id" />
                         <input type="text" style="display:none; opacity:0" name="success_callback" value="${success_callback}" onChange={(e) => setSuccess_callback(e.target.value)} placeholder="Success Callback" />
                         <input type="text" style="display:none; opacity:0" name="error_callback" value="${error_callback}" onChange={(e) => setError_callback(e.target.value)} placeholder="Error Callback" />
                         <input type="text" style="display:none; opacity:0" name="redirect" value="${redirect}" onChange={(e) => setRedirect(e.target.value)} placeholder="Error Callback" />
                         <input type="text" style="display:none; opacity:0" name="provider" value="${provider}" onChange={(e) => setProvider(e.target.value)} placeholder="Provider" />
                         <input type="text" style="display:none; opacity:0" name="currency_type" value="${currency_type}" onChange={(e) => setCurrency_type(e.target.value)} placeholder="currency_type" />
                         <input type="text" style="display:none; opacity:0" name="amount_in_100" value="${amount_in_100}" onChange={(e) => setAmount_in_100(e.target.value)} placeholder="amount_in_100" />
                         <input type="text" style="display:none; opacity:0" name="additional_params" value='{"brand_name": "Good Good Piggy","description": "You are paying for Good Good Piggy"}' />
                        </form>
                    </div>
            <script>
            if (typeof document.getElementById('formPayment').submit === "object") {
                // document.getElementById('formPayment').submit.remove();
            }
             document.getElementById('formPayment').submit();
            </script>                    
            </body>
            </html>
        `;
        setHTML(tempHTML)
    }

    const handleLogout = async () => {
        let temp = await removeAuthToken()
    }
    const handleSuccess = async (nav) => {
        console.log(props?.route?.params?.logout, "props.route.params.logout")
        if (props.route.params.logout) {
            let temp = await removeAuthToken()
        }
        props.navigation.navigate("PaymentSuccess", { data: nav.url, paymentObj: props?.route?.params?.data })
    }


    const handleTriggering = () => {
        setTimeout(() => {
            setLoading(false)
        }, 4000);
    }


    useEffect(() => {

    }, [loading])

    useEffect(() => {
        handleTriggering()
    }, [])


    useFocusEffect(() => {
        setShouldHide(false)
        return () => {
            setShouldHide(true)
        }
    });




    useEffect(() => {
        setClient("ggp");
        setRedirect("O");
        let orderId = `${new Date().getTime()}`
        setOrder_id(props.route.params.data._id)
        console.log(props.route.params.data._id, "payment page id")
        setCurrency_type("INR")
        setProvider("razorpay")
        setSuccess_callback(`${webUrl}payment-success`);
        setError_callback(`${webUrl}payment-error`);
        setAmount_in_100(props.route.params.data.price * 100)
        getDataOnInit()
    }, [client, success_callback, error_callback, amount_in_100, auth_token])

    if (shouldHide) {
        return null
    }





    return (
        <View style={{ backgroundColor: "red", flex: 1 }}>
            <WebView
                onNavigationStateChange={(navState) => {
                    // setLoading(false);
                    // Keep track of going back navigation within component
                    // console.log(navState.url, "navstate")
                    // console.log(`${navState.url}`.toLowerCase().includes("payment-success"), "navstate")
                    if (`${navState.url}`.toLowerCase().includes("payment-success")) {
                        handleSuccess(navState)
                        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsuccess")
                    }
                    else if (`${navState.url}`.toLowerCase().includes("payment-error")) {
                        // handleLogout()
                        props.navigation.navigate("PaymentFailed", { data: navState.url, paymentObj: props?.route?.params?.data })
                        console.log("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffFailure")
                    }
                    // this.canGoBack = navState.canGoBack;
                }}
                // onLoad={(syntheticEvent) => {
                //     // const { nativeEvent } = syntheticEvent;
                //     // this.url = nativeEvent.url;
                //     console.log(syntheticEvent)
                //     // document.forms[0].submit()
                // }}
                // injectedJavaScript={myScript}
                // setSupportMultipleWindows={true}
                // originWhitelist={['*']}
                source={{ html: HTML }}
                style={{ opacity: 1, }}
            />



        </View>
    )

}









