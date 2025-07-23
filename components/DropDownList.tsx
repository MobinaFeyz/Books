import React from "react";
import {Text, View} from "react-native";
import {Picker} from "@react-native-picker/picker";


interface DropDownListProps {
    selectedValue: string;
    onValueChange: (selectedValue: string) => void;
    text: string;
    values: string[];
}
const DropDownList = ({selectedValue, onValueChange, text, values}: DropDownListProps) =>{
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <Text style={{ fontSize: 18, marginRight: 10 }}>{text}</Text>
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => onValueChange(itemValue)}
                style={{ flex: 1 }}
            >
                {values.map((item) => (
                    <Picker.Item label={item} value={item.toLowerCase().replace(/ /g,"_")} key={item} />
                ))}
            </Picker>
        </View>
    )

}
export default DropDownList