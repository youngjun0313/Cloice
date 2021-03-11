import React from 'react';
import { Text, FlatList, Image, View, Dimensions, TouchableOpacity, Pressable,TouchableHighlight} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ScrollView, TapGestureHandler } from 'react-native-gesture-handler';
import SangeuiPost from './AddPostScreens/SangeuiPost';
import HaeuiPost from './AddPostScreens/HaeuiPost';

const initialLayout = { width: Dimensions.get('window').width };
var { height, width } = Dimensions.get('screen');

const tabs = [
  { tabLabel: '상의',tabNo:1,},
  { tabLabel: '하의',tabNo:2,},
  { tabLabel: '아우터',tabNo:3,},
  { tabLabel: '신발',tabNo:4,},
  { tabLabel: '모자',tabNo:5,},
  { tabLabel: '액세서리',tabNo:6,},
];



export default function AddPostScreen() {
const [pageNo, setPageNo] = React.useState(1);
const renderSwitch=(pageNo)=> {
  switch(pageNo) {
    case 1:
      return <SangeuiPost/>;
    case 2:
      return <HaeuiPost/>;
    case 3:
      return <SangeuiPost/>;
    case 4:
      return <HaeuiPost/>;
    case 5:
      return <HaeuiPost/>;
    case 6:
      return <HaeuiPost/>;
    default:
      return <SangeuiPost/>;
  }
};


  return (
    <View style={{paddingHorizontal:16, backgroundColor: '#Fcfcfc'}}>
      <View style={{alignItems: "center",borderColor:'#dfdfdf', borderBottomWidth:1,paddingVertical:10}}>
          <Text style={{fontSize:14, color:'#707070'}}>룩북 만들기</Text>
      </View>
      <View style={{ width:'100%', height: width-55,}}>

      </View>
      <ScrollView horizontal style={{borderColor:'#dfdfdf', borderTopWidth:1,borderBottomWidth:1}}>
      {tabs.map((tabs, index) => {
        return(
          <TouchableHighlight
            activeOpacity={1}
            underlayColor="#DDDDDD"
            selectedBackgroundColor="pink"
            style={{paddingHorizontal:20,paddingVertical:5,marginHorizontal:8,marginVertical:12,borderRadius: 5,
              backgroundColor: '#ffffff',elevation: 5,shadowOffset: {width: 2, height: 4},}}
            onPress={()=>{setPageNo(tabs.tabNo)}
            }>
            <Text style={{fontSize:14}} key={index}>{tabs.tabLabel}</Text>

          </TouchableHighlight>
        )
      })}
      </ScrollView>
      <View >
      {renderSwitch(pageNo)}
      </View>
    </View>
  );    
}


// hoho{
//   switch({tabs.pageNo}) {
//   case 1:
//     <FlatList style={{flexDirection : "column"}}
//     data={SangeuiFeedData} 
//     renderItem={renderItem} 
//     keyExtractor={item => item.id} 
//     numColumns={3}           
//   />
//     break;
//   case 2:
//     break;
//   case 3:
//     break;
//   default:
//   }}; 

// const renderItem = ({ item,index }) => (
//   <View>
//     <TouchableOpacity>
//     <View style={{ justifyContent: "center", alignItems: "center" }}>
//       <Image source={item.src} style={[{ width: (width-32) / 3 }, { height: (width-32) / 3 }, { marginBottom: 2 }, index % 3 !== 0 ? { marginLeft: 2 } : { marginLeft: 0 } ]} />
//     </View>
//     </TouchableOpacity>   
//   </View>
// );


// const renderTabBar = props => (
//   <ScrollView horizontal={true} >
//   {tabs.map((tabs) => {
//     return(
//       <Pressable
//         onPress={()=>{}
//         }>
//         <Text>{tabs.tabNo}</Text>
//       </Pressable>
//     )
//   })}
//   </ScrollView>
// );
