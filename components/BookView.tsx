import {Image, Text, TouchableOpacity} from "react-native";
import {router} from "expo-router";

interface BookProps{
    title: string;
    imageUrl: string;
    author: string;
    ol: string;
}

const BookView = ({title, imageUrl, author, ol}: BookProps) => {
    return(
        <TouchableOpacity className="flex-col items-center m-4 w-1/4" onPress={() => router.push({ pathname: '../book/BookInfo', params: { id: ol, author: author } })}
        >
            <Image source={{uri:`https://covers.openlibrary.org/b/id/${imageUrl}-M.jpg`}} className="w-full h-48 rounded-lg"
                   resizeMode="stretch" />
            <Text className="text-sm font-bold mt-2 text-center" numberOfLines={3} style={{fontSize:15}}>{title}</Text>
            <Text className="text-black text-center" numberOfLines={2}>{author}</Text>
        </TouchableOpacity>
    );
}
export default BookView;
