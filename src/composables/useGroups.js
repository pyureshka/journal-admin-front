import client from "../api/http-client";

function getGroupByName(name) {
    return client.get('/groups?groupName=' + name).then(r => r.data)
}

export function useGroups() {

    return $$({
        getGroupByName
    })
}