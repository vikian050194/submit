const makeRequest = async (method = "GET", url, data) => {
    if (!url) {
        throw new Error("url could not be empty");
    }

    const response = await fetch(`/api/${url}`, {
        method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: data ? JSON.stringify(data) : null
    });

    if (response.status === 200) {
        return await response.json();
    } else if (response.status >= 400) {
        throw new Error(response.statusText);
    }
};

const get = async (url) => {
    return await makeRequest("GET", url);
};

const post = async (url, data) => {
    return await makeRequest("POST", url, data);
};

export default {
    get,
    post
};