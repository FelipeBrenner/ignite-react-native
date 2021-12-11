import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {Home} from './src/pages/Home';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
      />
      <Home />
    </>
  );
}
