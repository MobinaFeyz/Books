import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFetch} from "@/services/useFetch";
import {account} from "@/services/appwrite";
import {router} from "expo-router";
import {fetchBookDetails} from "@/services/api";
import {getUserData} from "@/services/appwrite";
import BooksList from "@/components/BooksList";

const Profile = () => {
    const {data, loading, error} = useFetch(() => getUserData());
    const[usersWantToReadBookIDs, setUsersWantToReadBookIDs] = useState<string[]>([]);
    const[usersWantToReadBooks, setUsersWantToReadBooks] = useState<any[]>([]);
    const [usersEmail, setUsersEmail] = useState<string>("");

    useEffect(() => {
        if(!data) return;
        const IDs = data.filter((item)=> item.status==="wants_to_read").map((item)=> item.bookID);
        setUsersWantToReadBookIDs(IDs);

        const fetchBooks = async () => {
            try {
                const results = await Promise.all(IDs.map((id) => fetchBookDetails(id)));
                setUsersWantToReadBooks(results);
            } catch (err) {
                console.error("Failed to fetch books", err);
            }
        };
        fetchBooks();
    },[data]);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
                if(session) {
                    setUsersEmail(session.email);
                }
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

    return (
        <SafeAreaView className="flex-1 p-2.5 bg-blue-100 h-full">
            {loading && (
                <>
                    <Text>Loading...</Text>
                    <ActivityIndicator className="self-center" size="large" color="blue" />
                </>
            )}

            {error && <Text className="text-red-800">Error: {error.message}</Text>}

            {usersWantToReadBooks && usersWantToReadBooks.length > 0 && (
                <>
                    <View className="rounded h-20 p-1 mb-6" style={{
                        justifyContent: "space-between",
                        flexDirection: "row-reverse",
                        alignItems:"center",
                        backgroundColor: "#005A9C",
                    }}>
                        <TouchableOpacity
                            className="bg-blue-950 rounded w-1/4 items-center justify-center h-16"
                            onPress={logoutHandle} >
                            <Text className="text-white text-3xl text-center">Logout</Text>
                        </TouchableOpacity>
                        {usersEmail && (<Text className="ml-2 text-2xl italic color-white">Signed in as:{"\n" + usersEmail}</Text>)}
                    </View>

                    <BooksList books={usersWantToReadBooks} title={"Your Books To Read"}></BooksList>

                </>
            )}
        </SafeAreaView>
    );

};
export default Profile;