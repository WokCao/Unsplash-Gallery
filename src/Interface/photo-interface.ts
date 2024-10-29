//create interface to use the properties
export default interface Photo {
    id: string;
    alt_description: string | undefined;
    urls: {
        small: string,
        regular: string
    };
    description: string | undefined;
    user: {
        username: string | undefined
    };
    title: string | undefined;
}