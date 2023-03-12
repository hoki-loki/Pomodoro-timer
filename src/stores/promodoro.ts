import { defineStore } from "pinia";
import {computed, ref} from "vue";
import {makePersistent} from "../helpers/persistence";
export const usePromodoro = defineStore("promodoro", () => {
    const promodoro = ref<boolean | object | null | string>(null);

    makePersistent(promodoro, "promodoro")

    const setPromodoro = (value: object) => {
        promodoro.value = value;
    }

    return {
        promodoro,
        setPromodoro,
    }

});

export default usePromodoro;