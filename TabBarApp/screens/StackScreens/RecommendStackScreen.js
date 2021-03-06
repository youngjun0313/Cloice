import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Feather from 'react-native-vector-icons/Feather';

import RecommendScreen1 from '../RecommendScreen1'
import RecommendScreen2 from '../RecommendScreen2'

const RecommendStack = createStackNavigator();

const RecommendStackScreen = ({navigation}) => {
    return (
      <RecommendStack.Navigator screenOptions={{ //모든 화면에 색깔 적용
        headerStyle: {
          backgroundColor: '#ffffff',//바탕 색깔
          borderBottomWidth: 3,
          borderBottomColor: '#99D1E9'
        },
        headerTintColor: '#000000',//글자색깔
        headerTitleStyle: {
          //fontWeight: 'bold'
        }
      }}>
        <RecommendStack.Screen name="RecommendScreen1" component={RecommendScreen1} options={{ //home 화면에만 색깔 적용
          title: '코디추천',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'NanumSquareR',
            fontSize: 20
          },
          headerRight: () => (
            null
          ),
          headerLeft: () => (
            <Feather.Button
              name="chevron-left"
              color="#99d1e9"
              size={32}
              backgroundColor="#ffffff"
              onPress={() => navigation.navigate("Closet")}
            />
          )
        }} />
        <RecommendStack.Screen name="RecommendScreen2" component={RecommendScreen2} options={{ //home 화면에만 색깔 적용
          title: '코디추천',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'NanumSquareR',
            fontSize: 20
          },
          headerRight: () => (
            null
          ),
          headerLeft: () => (
            <Feather.Button
              name="chevron-left"
              color="#99d1e9"
              size={32}
              backgroundColor="#ffffff"
              onPress={() => navigation.navigate("RecommendScreen1")}
            />
          )
        }} />
      </RecommendStack.Navigator>
    );
  }

export default RecommendStackScreen;