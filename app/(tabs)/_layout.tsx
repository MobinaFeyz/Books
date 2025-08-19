import React from "react";
import {Tabs} from "expo-router";
import "../../global.css";
import {Image, ImageBackground, Text, View} from "react-native";
import HomeIcon from '../../assets/images/home.png';
import SearchIcon from '../../assets/images/search.png';
import ForYouIcon from '../../assets/images/forYou.png';
import ProfileIcon from '../../assets/images/profile.png';

const TabIcon = ({icon, title, focused}: any) => {
    if(focused)
        return(
            <ImageBackground source={require('../../assets/images/highlight.png')} className="flex flex-col w-full flex-1 min-w-[105px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden justify-self-center">
                <Image source={icon} tintColor="#252159" className="size-7" />
                <Text className="text-[10px]" style={{color:'#252159'}}>{title}</Text>
            </ImageBackground>
        );

    return (
        <View className="flex flex-col w-full flex-1 min-w-[105px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden justify-self-center">
            <Image source={icon} tintColor="#151312" className="size-7" />
        </View>
    )
}

const _Layout = () =>{
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            tabBarItemStyle:{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 3,
            },
                tabBarStyle: {
                backgroundColor:'#E8F9FF',
                borderRadius:50,
                marginHorizontal:20,
                marginBottom: 40,
                height: 55,
                overflow: 'hidden',
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} title="Home" icon={HomeIcon}/>
                    )
                }}
                />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} title="Search" icon={SearchIcon}/>
                    )
                }}
            />
            <Tabs.Screen
                name="forYou"
                options={{
                    title: "For You",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} title="For You" icon={ForYouIcon}/>
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} title="Profile" icon={ProfileIcon}/>
                    )
                }}
            />
        </Tabs>
    );
}

export default _Layout;