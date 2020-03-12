const makeRequest = async (method = "GET", url = "", data = {}) => {
    const options = {
        method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
    };

    if (method === "GET") {
        delete options.body;
    }

    const response = await fetch(`/api/${url}`, options);

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

export {
    get,
    post
};