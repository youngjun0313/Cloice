import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';

import MyProfile from '../MyProfile';
import MainTabScreen from '../MainTabScreen';
import Post from '../AddPostScreens/Post';
import AddPostEdit from '../AddPostScreens/AddPostEdit';

const MyProfileStack = createStackNavigator();

const  MyProfileStackScreen = ({navigation}) => {
    return (
      <MyProfileStack.Navigator screenOptions={{ //모든 화면에 색깔 적용
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
        < MyProfileStack.Screen name="MyProfile" component={MyProfile} options={{ //home 화면에만 색깔 적용
          title: 'Cloice',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'DancingScript',
            fontSize: 30
          },
          headerRight: () => (
            <Icon.Button name="menu" color='#000000' size={25} 
            backgroundColor="#ffffff" onPress={() => navigation.openDrawer()}>
            </Icon.Button>
          ),
          headerLeft: () => (
            <IIcon.Button name="search" color='#000000' size={25} 
            backgroundColor="#ffffff" onPress={() => navigation.openDrawer()}>
            </IIcon.Button>
          )
        }} />
        {/* <MyProfileStack.Screen name="Post" component = {Post} options={{ //Post는 AddPostStack보다는 MyProfile에 있어야 할듯. 왜냐? 메뉴 버튼& 드로어 해야하거든
        title: 'Cloice',
        headerTitleAlign: 'center', 
        headerTitleStyle: {
          fontFamily: 'DancingScript',
          fontSize: 30
        },
        headerRight: () => (
          <Icon.Button name="menu" color='#000000' size={25} 
          backgroundColor="#ffffff" onPress={() => navigation.openDrawer()}>
          </Icon.Button>
        ),
        headerLeft: () => (
          <IIcon.Button name="search" color='#000000' size={25} 
          backgroundColor="#ffffff" onPress={() => navigation.openDrawer()}>
          </IIcon.Button>
        )
      }}/> */}

      </MyProfileStack.Navigator>
    );
}

export default  MyProfileStackScreen;