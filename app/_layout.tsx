import {Stack, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {account} from "@/services/appwrite";
import {AppwriteException} from "appwrite";

export default function RootLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try{
                const session = await account.get();
                setIsLoggedIn(true);
                router.replace("/(tabs)");
            } catch (err){
                if(err instanceof AppwriteException){
                    setIsLoggedIn(false);
                    router.replace("/Screens/Login");
                } else {
                    console.error("Session check error", err);
                    setIsLoggedIn(false);
                    router.replace("/Screens/Login");
                }
            }
        };
        checkSession();
    }, []);

  return (
      <Stack>

          <Stack.Screen
              name="Screens/Login"
              options={{headerShown: false}}/>
          <Stack.Screen
              name="Screens/SignUp"
              options={{headerShown: false}}
          />
         <Stack.Screen
              name="(tabs)"
              options={{headerShown: false}}/>
        <Stack.Screen
          name="book/[Id]"
          options={{ headerTitle: "Book Details"}}/>

      </Stack>
  );
}
