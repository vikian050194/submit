import ajax from "./ajax";

export const signUp = async (credentials) => {
    return await ajax.post("signup", credentials);
};

export const signIn = async (credentials) => {
    return await ajax.post("signin", credentials);
};

export const signOut = async () => {
    return await ajax.post("signout");
};
