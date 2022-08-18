import client from "../api/http-client";

function getGroupByName(name) {
    return client.get('/groups?groupName=' + name)
}

export function useGroups() {

    return $$({
        getGroupByName
    })
}