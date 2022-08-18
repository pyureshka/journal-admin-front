import client from "../api/http-client";
import { onMounted } from "vue";

function getClasses() {
    return client
        .get('classes')
        ;
}

function createClass(newClass) {
    return client.post('classes/add', newClass)
}

function editClass(newClass) {
    return client.put('classes/' + newClass.id, newClass)
}

export function useClasses() {
    let classes = $ref([])

    onMounted(async () => {
        classes = await getClasses()
    })

    return $$({
        classes,
        getClasses,
        createClass,
        editClass
    })
}