// import {
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signOut,
//     AuthError
// } from 'firebase/auth';
// import { auth } from '../FirebaseConfig';
// import { User } from 'firebase/auth';
//
// export const signUp = async (email: string, password: string): Promise<User> => {
//     try {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         return userCredential.user;
//     } catch (error) {
//         throw error as AuthError;
//     }
// };
//
// export const signIn = async (email: string, password: string): Promise<User> => {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         return userCredential.user;
//     } catch (error) {
//         throw error as AuthError;
//     }
// };
//
// export const logOut = async (): Promise<void> => {
//     try {
//         await signOut(auth);
//     } catch (error) {
//         throw error as AuthError;
//     }
// };