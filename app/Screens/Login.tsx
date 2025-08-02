import {Alert, Text, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import {useState} from "react";
import {router} from "expo-router";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const loginAlert = () =>
        Alert.alert('Login Failed', 'Incorrect username or password', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {text: 'Retry', onPress: () => {
                setUsername("");
                setPassword("");
                }},
        ]);

    const logInHandle = () => {
        if(username.length>4 && password.length>4){
            router.push("(tabs)");
        } else {
            loginAlert();
        }
    };

    return (
        <SafeAreaView className="p-safe flex-1 flex-col items-center justify-center bg-blue-200 gap-6">
            <Text className="text-5xl h-28 text-center">Login</Text>
            <TextInput className="bg-blue-800 rounded-full px-4 w-4/5 h-16" placeholder="Username..." value={username} onChangeText={setUsername} />
            <TextInput className="bg-blue-800 rounded-full px-4 w-4/5 h-16" placeholder="Password..." value={password} onChangeText={setPassword} secureTextEntry={true} />
            <Text className="text-blue-950">Don't have an account? <Text className="underline text-blue-700" onPress={()=> router.push("./SignUp")}>sign up</Text></Text>

            <TouchableOpacity className="bg-blue-900 w-1/5 rounded-full items-center justify-center h-11" onPress={logInHandle}><Text className="text-white">Submit</Text></TouchableOpacity>
        </SafeAreaView>
    )
}
export default Login;