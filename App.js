import {NavigationContainer} from '@react-navigation/native';
import axios from 'axios';
import React, {createContext, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import LoadingComponent from './src/Component/LoadingComponent';
import ModalComponent from './src/Component/ModalComponent';
import {RootProvider} from './src/Context/RootContext';
import RootStack from './src/Navigation/stacks/RootStack';
import {createClient, AnalyticsProvider} from '@segment/analytics-react-native';

export const axiosApiInstance = axios.create();
export const toggleModalContext = createContext();
export const LoaderContext = createContext();
export const modalValueContext = createContext();
export const modalFunctionContext = createContext();
// export const authContext = createContext();
// export const kidContext = createContext();
export const refContext = createContext();

export default function App() {
  const [loading, setLoading] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [message, setMessage] = useState('');
  // const [isAuthorised, setIsAuthorised] = useState(false);
  // const [currentKid, setCurrentKid] = useState({});
  const [ref, setRef] = useState();

  const segmentClient = createClient({
    writeKey: 'oVuhxARWXO3yiTRA5Dp1hGweHQqZhcsw',
    trackAppLifecycleEvents: false,
    trackDeepLinks: true,
    flushAt: 1,
    debug: true,
    flushInterval: 1,
    //additional config options
  });

  return (
    <refContext.Provider value={[ref, setRef]}>
      <AnalyticsProvider client={segmentClient}>
        <LoaderContext.Provider value={[loading, setLoading]}>
          <toggleModalContext.Provider
            value={{
              toggleObj: [toggleModal, setToggleModal],
              messageObj: [message, setMessage],
            }}>
            <RootProvider>
              <SafeAreaView style={{flex: 1}}>
                <NavigationContainer>
                  <RootStack />
                </NavigationContainer>
              </SafeAreaView>
            </RootProvider>
            {toggleModal && <ModalComponent />}
          </toggleModalContext.Provider>
          {loading && <LoadingComponent />}
        </LoaderContext.Provider>
      </AnalyticsProvider>
    </refContext.Provider>
  );
}
