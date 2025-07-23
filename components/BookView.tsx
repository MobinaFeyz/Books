import {Image, View, Text, FlatList} from "react-native";

interface BookProps{
    title: string;
    imageUrl: string;
    author: string;
}

const BookView = ({title, imageUrl, author}: BookProps) => {
    return(
        <View className="flex-col items-center m-4 w-1/4">
            <Image source={{uri:`https://covers.openlibrary.org/b/id/${imageUrl}-M.jpg`}} className="w-full h-48 rounded-lg"
                   resizeMode="stretch" />
            <Text className="text-sm font-bold mt-2 text-center" numberOfLines={3} style={{fontSize:15}}>{title}</Text>
            <Text className="text-black text-center" numberOfLines={2}>{author}</Text>
        </View>
    );
}
export default BookView;
