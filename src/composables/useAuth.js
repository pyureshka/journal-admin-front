import client from "../api/http-client";

const headers = {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
};

function login(login, pwd) {
    return client.post(`auth?login=${login}&pwd=${pwd}`, {}, { headers });
}

export function useAuth() {
    return $$({ login })
}