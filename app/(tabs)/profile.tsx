import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useFetch} from "@/services/useFetch";
import {account} from "@/services/appwrite";
import {router} from "expo-router";
import {fetchBookDetails} from "@/services/api";
import {getUserData} from "@/services/appwrite";

type ItemData = {
    id: string;
    title: string;
};

const DATA: ItemData[] = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

type ItemProps = {
    item: ItemData;
    onPress: () => void;
    backgroundColor: string;
    textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
        <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
);

const Profile = () => {
    const [selectedId, setSelectedId] = useState<string>();
    const {data, loading, error} = useFetch(() => getUserData());
    const[usersWantToReadBooks, setUsersWantToReadBooks] = useState<string[]>([]);
    useEffect(() => {
        if(!data) return;
        setUsersWantToReadBooks(data.filter((item)=> item.status==="wants_to_read").map((item)=> item.bookID));

        // usersWantToReadBooks.forEach(value => {
        //     const {data, loading, error} = useFetch(()=> fetchBookDetails(value));
        // })
    },[data]);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
            } catch (error) {
                router.push("../Screens/Login");
            }
        };
        checkSession();
    }, []);

    const logoutHandle = async () => {
        try {
            await account.deleteSession("current");
            router.replace("../Screens/Login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }


    const renderItem = ({item}: {item: ItemData}) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const color = item.id === selectedId ? 'white' : 'black';

        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity className="mx-auto mt-12 bg-blue-950 rounded w-1/4 h-16 items-center justify-center" onPress={logoutHandle}><Text className="text-white text-3xl text-center">{"Logout"}</Text>
                </TouchableOpacity>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default Profile;