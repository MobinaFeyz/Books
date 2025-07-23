export const OPENLIBRARY_CONFIG = {
    BASE_URL: "https://openlibrary.org",
    headers: {
        accept: "application/json",
    }
}

export const fetchBooks = async ({query, genre}:{query: string, genre: string}) => {
    const endpoint = query?
        `${OPENLIBRARY_CONFIG.BASE_URL}/search.json?title=${encodeURIComponent(query.replace(/ /g, "+"))}`: genre? `${OPENLIBRARY_CONFIG.BASE_URL}/subjects/${encodeURIComponent(genre)}.json?limit=300`:
        `${OPENLIBRARY_CONFIG.BASE_URL}/search.json?q=bestseller`;
    const response = await fetch(endpoint, {
        method: "GET",
        headers: OPENLIBRARY_CONFIG.headers,
    });
    if(!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    if (data.docs) return data.docs;
    if (data.works) return data.works;
    return [];
}