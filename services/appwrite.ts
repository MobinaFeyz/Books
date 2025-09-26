import { Client, Databases, ID, Query, Account } from "appwrite";
import {Book, UserBooks} from "@/interfaces/interfaces";
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID_METRICS= process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_METRICS!;
const COLLECTION_ID_USERBOOKS = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_USERBOOKS!;
const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
const database = new Databases(client);
export const account = new Account(client);

export const updateSearchCount = async (query:string, book:Book) => {

    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID_METRICS, [
            Query.equal("searchTerm", query),
        ]);

        if (result.documents.length > 0) {
            const existingBook = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID_METRICS,
                existingBook.$id,
                {
                    count: existingBook.count + 1,
                }
            );
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID_METRICS, ID.unique(), {
                searchTerm: query,
                count: 1,
                poster_url: `https://covers.openlibrary.org/b/id/${book.cover_i || book.cover_id}-M.jpg`,
                book_id: book.cover_edition_key || book.key.replace("/works/",""),
                title: book.title,
                author: book.author_name[0] || book.authors?.[0]?.name
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const saveUserData = async (book: Book, status: String) => {
    const book_OL = book.key.split("/").pop()!;
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID_USERBOOKS, [
            Query.equal("bookID", book_OL),
        ]);
        if (!result.documents.length) {
            const user = await account.get();
            await database.createDocument(DATABASE_ID, COLLECTION_ID_USERBOOKS, ID.unique(), {
                userID: user.$id,
                bookID: book_OL,
                status: status
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export {ID};


export const getUserData = async(): Promise<UserBooks[]|undefined> => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID_USERBOOKS);
        return result.documents as unknown as UserBooks[];
    } catch (error) {
        console.log(error);
        throw error;
    }
}