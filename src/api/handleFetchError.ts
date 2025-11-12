export const handleFetchError = (res: Response) => {
    if (!res.ok) {
        if (res.status >= 400 && res.status < 500) throw new Error(`Client Error ${res.status}`);
        if (res.status >= 500 && res.status < 600) throw new Error(`Server Error ${res.status}`);
    }
};
