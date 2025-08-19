import {TArray} from "@sinclair/typebox";

interface Book{
    title: string;
    cover_i: string;
    cover_id: string;
    author_name: string;
    authors: TArray;
    cover_edition_key: string;
    key: string;
}