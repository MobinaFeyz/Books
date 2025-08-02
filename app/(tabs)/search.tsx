import React, {useEffect, useState, useRef, useCallback} from "react";
import {ActivityIndicator, FlatList, Text, TextInput, View} from "react-native";
import SearchBar from "@/components/SearchBar";
import {useFetch} from "@/services/useFetch";
import {fetchBooks} from "@/services/api";
import BookView from "@/components/BookView";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
const Search =() =>
{
    const {focus} = useLocalSearchParams();
    const searchRef = useRef<TextInput>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const {
        data: books,
        error: booksErr,
        loading: booksLoading,
        fetchData,
        reset,
    } = useFetch(()=> fetchBooks({query: searchTerm, genre: ""}), false);

    useFocusEffect(
        useCallback(()=>{
            return ()=> setSearchTerm("");
        },[])
    );

    useEffect(() => {
        const timeOut = setTimeout(async () =>{
            if(searchTerm.trim().length>2) {
                await fetchData();
            }
            else
                reset();
        }, 500);
        return () => clearTimeout(timeOut);
    }, [searchTerm]);


    useEffect(() => {
        if(focus === 'true' && searchRef.current){
            setTimeout(()=>{
                searchRef.current?.focus();
            },100)
        }
    }, [focus]);


    return (
        <View className="flex-1 items-center bg-blue-100 h-full">
        <SearchBar value={searchTerm} onTextChange={setSearchTerm} ref={searchRef}/>

            {booksLoading && <><Text>{"Loading..."}</Text>
                <ActivityIndicator className="self-center" size="large" color="blue" />
            </>}

        {booksErr && (
            <><Text className="text-red-800">{"Error fetching data..."}</Text></>
        )}

        {books && books.length > 0 && (
            <FlatList
                data={books}
                renderItem={({item})=>(
                <BookView title={item.title} imageUrl={item.cover_i} author={item.author_name} ol={item.cover_edition_key||item.key.replace("/works/","")}/>
                )}
                keyExtractor={(item, index) => item.key || index.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 15
                }}       />
        )}

    </View>);
}
export default Search;