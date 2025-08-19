import React from "react";
import {View, Image, SafeAreaView, ActivityIndicator, Animated, Text, TouchableOpacity} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useFetch} from "@/services/useFetch";
import {fetchBookDetails} from "@/services/api";
import ScrollView = Animated.ScrollView;
import Description from "@/components/Description";

const Details = () => {
    const {id, author} = useLocalSearchParams();
    const {data: book, loading, error} = useFetch(() => fetchBookDetails(id as string));
        return (
            <SafeAreaView className="flex-1 pb-safe">
                {loading && <><Text className="text-center text-2xl mt-4">{"Loading..."}</Text>
                    <ActivityIndicator className="self-center" size="large" color="blue" />
                </>}

                {error && <Text>{error.message}</Text>}

                {book && (
                    <ScrollView className="flex-1 w-full h-full p-2.5" style={{backgroundColor:"#E1EBEE"}}>

                        <View className="flex-1 flex-row mb-6">
                            <Image source={{uri:`https://covers.openlibrary.org/b/id/${book.covers[0]}-M.jpg`}} className="w-1/2 h-96 rounded-lg mr-3" resizeMode="stretch" />

                            <View className="w-1/2 flex-col gap-4 text-sm font-medium pr-2">
                                <Text className="text-3xl font-bold" style={{fontStyle: 'italic'}}>{book.title}</Text>
                                <Text>By {author}</Text>
                                {(book.publish_date||book.first_publish_date||book.publish_places?.[0]) && (<Text>{book.publish_date||book.first_publish_date}  {book.publish_places?.[0]}</Text>)}
                                {book.publishers && <Text>Publisher: {book.publishers}</Text>}
                                {book.number_of_pages && <Text>Number of pages: {book.number_of_pages}</Text>}
                                {book.languages && <Text>Language: {book.languages?.[0].key.replace("/languages/","").toUpperCase()}</Text>}
                                {book.isbn_13 && <Text>ISBN 13: {book.isbn_13}</Text>}
                                {book.subjects && <Text>Subjects:{"\n"}{book.subjects.slice(0,5).join(", ")},...</Text>}
                            </View>
                        </View>

                        {book.description && (
                            <Description description={book.description} />
                        )}

                        <TouchableOpacity className={"self-center w-2/3 h-14 bg-blue-900 rounded-full justify-center align-middle m-1.5"}>
                            <Text className="text-white text-center">{"Want to read"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={"self-center w-2/3 h-14 bg-blue-900 rounded-full justify-center align-middle m-1.5 mb-16"}>
                            <Text className="text-white text-center">{"Already read"}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                )}

            </SafeAreaView>
    );
}

export default Details;