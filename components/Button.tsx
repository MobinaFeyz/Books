import {Text, TouchableOpacity} from "react-native";
import React from "react";
interface ButtonProps {
    title: string;
    onPress?: () => void;
}

const Button = ({title, onPress}:ButtonProps) => {
    return (
        <TouchableOpacity className="self-center w-2/3 h-14 bg-blue-900 rounded-full justify-center align-middle m-1.5" onPress={onPress}>
            <Text className="text-white text-center">{title}</Text>
        </TouchableOpacity>
    );
}
export default Button;