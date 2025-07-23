import {ActivityIndicator, FlatList, Image, Text, View} from "react-native";
import "../../global.css";
import SearchBar from "../../components/SearchBar";
import {router} from "expo-router";
import {fetchBooks} from "@/services/api";
import {useFetch} from "../../services/useFetch";
import BookView from "@/components/BookView";
import {useEffect, useState} from "react";
import DropDownList from "@/components/DropDownList";

export default function Index() {
    const [searchText, setSearchText] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const {
        data: books,
        loading: booksLoading,
        error: booksError,
        fetchData,
        reset,
    } = useFetch(() => fetchBooks({ query: searchText, genre:selectedGenre}));

    const searchHandle =(searchTerm: string) =>{
        setSearchText(searchTerm);
    }

    useEffect(() => {
        const timeOut = setTimeout(async () =>{
            await fetchData();
        }, 100);
        return () => clearTimeout(timeOut);
    }, [selectedGenre]);

    const [GenreList, setGenreList] = useState(["", "Romance", "History", "Fantasy", "Art", "Science Fiction", "Biographies", "Recipes", "Textbooks", "Children", "Medicine", "Mystery And Detective Stories", "Plays", "Science", "Music"]);




    return (
        <View className="flex-1 items-center bg-blue-100 h-full">
            <SearchBar value={searchText} onTextChange={searchHandle}  onPress={()=> router.push({ pathname: '/search', params: { focus: 'true' } })} />

            <DropDownList selectedValue={selectedGenre} onValueChange={setSelectedGenre} text={"Select Genre"} values={GenreList}/>


            {booksLoading && <><Text>{"Loading..."}</Text>
            <ActivityIndicator className="self-center" size="large" color="blue" />
            </>}
            {booksError && <Text className="text-red-800">Error: {booksError.message}</Text>}

            {books && books.length > 0 && (
                <FlatList
                    className="w-full"
                    data={books}
                    keyExtractor={(item, index) => item.key || index.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 15
                    }}
                    renderItem={({ item }) => (
                        <BookView
                            title={item.title}
                            imageUrl={item.cover_id || item.cover_i}
                            author={item.authors?.[0]?.name || item.author_name?.[0] || "Unknown Author"}
                        />
                    )}
                />
            )}
        </View>

    );
}
