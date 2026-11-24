export async function search(query : string){
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=key,isbn,title,author_name,cover_i,subject,first_publish_year&limit=10`;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`Open library error: ${response.status}`);
    }

    const data = await response.json();
    return (data.docs ?? []).filter((book: any) => book.isbn?.length > 0).map((book:any) => ({
        key: book.key,
        isbn: book.isbn?.find((isbn: string) => isbn.length === 13) ?? book.isbn?.[0] ?? null,
        title: book.title,
        author: book.author_name?.join(", ") ?? "Unknown Author",
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
        description: "",
        genres: book.subject?.slice(0, 3) ?? [],
        publicationYear: book.first_publish_year ?? null
    }))
}

export async function getDescription(key: string){
    const response = await fetch(
        "https://openlibrary.org" + key + ".json" 
    );
    if(!response.ok){
        return "";
    }

    const data = await response.json();
    const description = typeof data.description === "string" ? data.description : data.description?.value ?? "";

    return description.length > 500 ? description.slice(0,500) + "..." : description;
}