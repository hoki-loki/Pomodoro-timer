import { ref } from "vue";

const bus = ref(new Map());

export const useEventsBus = () => {

    const emit = (event: string, value: any) => {
        bus.value.set(event, value);
    }

    const recieve = (event: string, callback: Function) => {
        bus.value.get(event)
        callback(bus.value.get(event))
    }

    return {
        recieve,
        emit,
        bus
    }
}

export default useEventsBus;