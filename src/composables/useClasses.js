import client from "../api/http-client";
import {onBeforeUnmount, onMounted} from "vue";

function getClasses() {
    return client
        .get('classes')
        .then(response => response.data);
}

export function useClasses() {
    let classes = $ref(null)
    let classesB = $computed(() => classes?.filter(c => c.liter === "В"))

    let updateInterval = null

    function updateClasses() {
        updateInterval = setInterval(async () => {
            classes = await getClasses()
        }, 1 * 1000)
    }

    onMounted(async () => {
        classes = await getClasses()
        updateClasses()
    })

    onBeforeUnmount(() => {
        clearInterval(updateInterval)
    })

    return $$({
        classes,
        classesB
    })
}