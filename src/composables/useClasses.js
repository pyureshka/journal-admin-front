import client from "../api/http-client";
import { onMounted} from "vue";

function getClasses() {
    return client
        .get('classes')
        .then(response => response.data);
}

export function useClasses() {
    let classes = $ref([])

    onMounted( async () => {
        classes = await getClasses()
    })

    return $$({
        classes
    })
}