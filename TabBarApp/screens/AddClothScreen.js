import React from 'react';
import {
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import Axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import { icons } from '../components';
import {BASE_URL} from '../components';

const AddClothScreen = ({ navigation }) => {
    const [images, setImages] = React.useState([]);

    const handleUploadLibrary = () => {
        launchImageLibrary({ maxWidth: 500, maxHeight: 500 }, (response) => {
            if(response.didCancel) {
                return;
            }

            const base64Image = response.base64;

            Axios.post(BASE_URL+"/uploadImage", {
                base64Image: base64Image
            }).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log("에러:", error);
                throw error;
            });
        });
    }

    const options = { //home 화면에만 색깔 적용
        title: 'Cloice', // 이거 안쓰면 원래 이름인 Home으로 적용된다.
        headerTitleAlign: 'center', 
        headerTitleStyle: {
          fontFamily: 'DancingScript',
          fontSize: 30
        },
        headerRight: () => (
          <Icon.Button name="menu" color='#000000' size={25} 
          backgroundColor="#ffffff" onPress={handleUploadLibrary}>
          </Icon.Button>
        ),
        headerLeft: () => (
          <IIcon.Button name="search" color='#000000' size={25} 
          backgroundColor="#ffffff" onPress={() => {}}>
          </IIcon.Button>
        )
      }


    React.useLayoutEffect(() => {
        navigation.setOptions(options);
    }, [navigation])

    return (
        <View>
            <Text>
                AddClothScreen
            </Text>
            <FlatList
                data = {images}
                renderItem = {({ item }) => {
                    <Image source={{uri: item.uri}} />
                }}
            />
        </View>
    );
}

export default AddClothScreen;