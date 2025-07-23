import React, {forwardRef, useEffect} from "react";
import { Image, TextInput, TextInputProps, View } from "react-native";

interface SearchBarProps extends TextInputProps {
    onPress?: () => void;
    value: string;
    onTextChange: (value: string) => void;
}

const SearchBar = forwardRef<TextInput, SearchBarProps>(
    ({ onPress, value, onTextChange, ...props }, ref) => {
        return (
            <View className="flex-row items-center bg-blue-300 rounded-full px-5 py-4 mt-12 mb-3 mx-2.5">
                <TextInput
                    ref={ref}
                    placeholder="Search books by their title..."
                    className="text-black ml-2.5 flex-1"
                    onPress={onPress}
                    onChangeText={onTextChange}
                    value={value}
                    {...props}
                />
                <Image
                    source={require("../assets/images/search.png")}
                    resizeMode={"contain"}
                    className="size-5"
                />
            </View>
        );
    }
);

export default SearchBar;
