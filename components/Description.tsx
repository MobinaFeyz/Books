import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Description = ({ description }: { description?: string | { value: string } }) => {
    const [showFull, setShowFull] = useState(false);
    const toggleDescription = () => setShowFull(prev => !prev);

    const desc = typeof description === 'string'
        ? description
        : typeof description?.value === 'string'
            ? description.value
            : '';


    const previewText = desc.length > 150 ? desc.slice(0, 150) + "..." : desc;

    return (
        <View className="mb-16 mx-2.5">
            <Text className="text-base text-gray-800 text-justify">
                {showFull ? desc : previewText}
            </Text>
            {desc.length > 150 && (
                <TouchableOpacity onPress={toggleDescription}>
                    <Text className="text-blue-600 mt-1">
                        {showFull ? "See less" : "See more"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Description;
