import client from "../api/http-client";
import {onMounted} from "vue";

function getSubjects() {
    return client
        .get('subjects')
        .then(response =>  response.data);
}

export function useSubjects() {
    let subjects = $ref(null)

    onMounted(async () => {
        subjects = await getSubjects()
    })

    return $$({
        subjects
    })
}