import { router } from "expo-router";
import { useState } from "react";
import {Alert, SafeAreaView, Text, TextInput, TouchableOpacity} from "react-native";
import {ID, account} from "@/services/appwrite";
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return regex.test(email);
    };
    const navigation = useNavigation();

    const signUpHandle = async (name:string, email:string, password:string, phoneNumber:string) => {
        try{
            if(!name) {
                Alert.alert("Enter your name");
                return;
            }

            if(!validateEmail(email)) {
                Alert.alert("Wrong email format!");
                return;
            }

            if(password.length < 8) {
                Alert.alert("Password must be at least 8 characters.");
                return;
            }

            if(phoneNumber.indexOf("+") !== 0 || phoneNumber.length !== 13) {
                Alert.alert(`Invalid Phone number!\nEnter your country code first.`);
                return;
            }

            const response = await account.create(ID.unique(), email, password, name);
            if(response){
                router.replace("/(tabs)");
                return response;
            }

        } catch(err:any){
            console.log("Sign up error: " + err);
            Alert.alert("Error creating account: "+ err);
            throw err;
        }
    }
    const TextInputClassName = "bg-blue-800 rounded-2xl px-4 w-4/5 h-16 text-white";
    return (
    <SafeAreaView className="p-safe flex-1 flex-col items-center justify-center bg-blue-200 gap-6">

        <Text className="text-5xl h-28 text-center">Sign up</Text>
        <TextInput className={TextInputClassName} placeholder="Name..." value={name} onChangeText={setName}/>
        <TextInput className={TextInputClassName} placeholder="Email..." value={email} onChangeText={setEmail} />
        <TextInput className={TextInputClassName} placeholder="Password..." value={password} onChangeText={setPassword} secureTextEntry={true} />
        <TextInput textContentType="telephoneNumber" className={TextInputClassName} placeholder="Phone..." value={phoneNumber} onChangeText={setPhoneNumber}/>
        <Text className="text-blue-950">Already have an account? <Text className="underline text-blue-700" onPress={()=> navigation.goBack()}>Login</Text></Text>

        <TouchableOpacity className="bg-blue-900 w-1/5 rounded-2xl items-center justify-center h-11" onPress={()=> signUpHandle(name, email, password, phoneNumber)}><Text className="text-white">Submit</Text></TouchableOpacity>
    </SafeAreaView>
    )
}
export default SignUp;