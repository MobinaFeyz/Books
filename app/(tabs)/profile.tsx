import React, {useEffect} from "react";
import {TouchableOpacity, View, Text, SafeAreaView} from "react-native";
import {account} from "@/services/appwrite";
import {router} from "expo-router";

const Profile =() =>
{
    // profile.tsx
    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await account.get();
            } catch (error) {
                router.push("../Screens/Login");
            }
        };

        checkSession();
    }, []);

    const logoutHandle = async () => {
        try {
            await account.deleteSession("current");
            router.replace("../Screens/Login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    }
    return (<SafeAreaView>
        <TouchableOpacity className="mx-auto mt-12 bg-blue-950 rounded w-1/4 h-16 items-center justify-center" onPress={logoutHandle}>
            <Text className="text-white text-3xl text-center">{"Logout"}</Text>
        </TouchableOpacity>
    </SafeAreaView>);
}
export default Profile;