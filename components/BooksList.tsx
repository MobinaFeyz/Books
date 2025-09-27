import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {router} from "expo-router";

interface BooksListProps{
    title: string,
    books: any[],
}
const BooksList = ({title, books}:BooksListProps) => {
    return (
        <>
            <Text className="text-3xl text-gray-800 font-bold mb-3">{title}</Text>
            <FlatList
                className="flex-1 h-full"
                data={books}
                renderItem={({ item }) => (
                    <View className="w-full px-4 flex-row items-center justify-start h-40">
                        {/*<TouchableOpacity onPress={() => router.push({ pathname: '../book/BookInfo', params: { id: ol, author: author } })} >*/}
                        <Image source={{uri:`https://covers.openlibrary.org/b/id/${item.covers[0]}-M.jpg`}} className="w-24 h-36 rounded-lg mr-3" resizeMode="stretch" />
                        <Text className="text-2xl" style={{width: "60%"}}>{item.title}</Text>
                        <TouchableOpacity className="bg-red-800 p-1 rounded ml-auto">
                            <Text className="color-white" >Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item.key}
                ItemSeparatorComponent={()=> (
                    <View className="h-0.5 w-full bg-blue-50 rounded-full"></View>
                )}
            />
        </>
    );
}

export default BooksList;