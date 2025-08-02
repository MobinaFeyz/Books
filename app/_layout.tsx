import { Stack } from "expo-router";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
    const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean|null>(null);
    useEffect(() => {
      const checkIfFirstTimeUser = async () => {
        const hasLoggedIn = await AsyncStorage.getItem("hasLoggedIn");
        setIsFirstTimeUser(hasLoggedIn===null);
      };
      checkIfFirstTimeUser();
    }, []);
    if (isFirstTimeUser===null)
        return null;

  return (
      <Stack>
          {isFirstTimeUser?(
              <Stack.Screen
              name="Screens/Login"
              options={{headerShown: false}}/>):
              (<Stack.Screen
                  name="(tabs)"
                  options={{headerShown: false}}/>)
          }

         <Stack.Screen
              name="(tabs)"
              options={{headerShown: false}}/>
        <Stack.Screen
          name="book/[Id]"
          options={{ headerTitle: "Book Details"}}/>
          <Stack.Screen
          name="Screens/SignUp"
          options={{headerShown: false}}
          />
      </Stack>
  );
}
