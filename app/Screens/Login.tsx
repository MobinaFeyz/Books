import { router } from "expo-router";
import { useState } from "react";
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity } from "react-native";
import {account} from "@/services/appwrite";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
        return regex.test(email);
    };

    const logInHandle = async (email:string, password:string) => {
        try {
            if(validateEmail(email) && password.length>=8){
                const session = await account.createEmailPasswordSession(email, password);
                if(session) {
                    router.replace("/(tabs)");
                    return session;
                }
            } else {
                Alert.alert("Incorrect email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error login in to your account: "+ error);
            throw error;
        }
        // try {
        //     await account.deleteSession("current");
        // } catch (error) {
        //     console.error("Logout error:", error);
        // }
    };
    const TextInputClassName = "bg-blue-800 rounded-full px-4 w-4/5 h-16 text-white";
    return (
        <SafeAreaView className="p-safe flex-1 flex-col items-center justify-center bg-blue-200 gap-6">
            <Text className="text-5xl h-28 text-center">Login</Text>
            <TextInput className={TextInputClassName} placeholder="Username..." value={email} onChangeText={setEmail} />
            <TextInput className={TextInputClassName} placeholder="Password..." value={password} onChangeText={setPassword} secureTextEntry={true} />
            <Text className="text-blue-950">Don't have an account? <Text className="underline text-blue-700" onPress={()=> router.push("./SignUp")}>sign up</Text></Text>

            <TouchableOpacity className="bg-blue-900 w-1/5 rounded-full items-center justify-center h-11" onPress={()=> logInHandle(email, password)}><Text className="text-white">Submit</Text></TouchableOpacity>
        </SafeAreaView>
    )
}
export default Login;