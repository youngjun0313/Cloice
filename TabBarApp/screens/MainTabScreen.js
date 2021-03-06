import React from 'react';
import {
  Image
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons, COLORS } from '../components';

import HomeStackScreen from './StackScreens/HomeStackScreen';
import ClosetStackScreen from './StackScreens/ClosetStackScreen';
import AddPostStackScreen from './StackScreens/AddPostStackScreen';
import RecommendStackScreen from './StackScreens/RecommendStackScreen';
import { AuthContext } from '../components/context';

const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
    const { loginCheck } = React.useContext(AuthContext);

    const tabOptions = {
        showLabel: false,
        style: {
            height: "10%",
            backgroundColor: '#99d1e9'
        }
    }

    //로그인 되어 있는지 확인
    React.useEffect(() => {
        loginCheck();
    })

    return (
        <Tab.Navigator
        tabBarOptions = { tabOptions }
        screenOptions = {({ route }) => ({
            tabBarIcon: ({ focused }) => {
                switch (route.name) {
                    case "Home":
                        return (
                            focused ? 
                            <Image 
                                source = {icons.homeButtonTrue}
                                resizeMode = "contain"
                                style = {{
                                    tintColor: COLORS.white,
                                    width: "68%",
                                    height: "68%"
                                }}
                            /> :
                            <Image 
                                source = {icons.homeButtonFalse}
                                resizeMode = "contain"
                                style = {{
                                    tintColor: COLORS.white,
                                    width: "68%",
                                    height: "68%"
                                }}
                            />
                        )
                    case "AddPost":
                        return (
                            <Image 
                                source = {icons.addButton}
                                resizeMode = "contain"
                                style = {{
                                    tintColor: COLORS.white,
                                    width: 50,
                                    height: 50
                                }}
                            />
                        )
                    case "Closet":
                        return (
                            focused ? 
                            <Image 
                                source = {icons.closetButtonTrue}
                                resizeMode = "contain"
                                style = {{
                                    tintColor: COLORS.white,
                                    width: "68%",
                                    height: "68%"
                                }}
                            /> :
                            <Image 
                                source = {icons.closetButtonFalse}
                                resizeMode = "contain"
                                style = {{
                                    tintColor: COLORS.white,
                                    width: "68%",
                                    height: "68%"
                                }}
                            />
                        )
                    case "Recommend":
                        return (
                            <Image 
                                source = {icons.recommendButton}
                                resizeMode = "contain"
                                style = {{
                                    tintColor: COLORS.white,
                                    width: "68%",
                                    height: "68%"
                                }}
                            />
                        )
                }
            }
        })}>
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
        />
        <Tab.Screen
            name="AddPost"
            component={AddPostStackScreen}
        />
        <Tab.Screen
            name="Closet"
            component={ClosetStackScreen}
        />
        <Tab.Screen
            name="Recommend"
            component={RecommendStackScreen}
        />
        </Tab.Navigator>
    );
};


export default MainTabScreen;