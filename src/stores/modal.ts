import { defineStore } from "pinia";
import {computed, ref} from "vue";
import {makePersistent} from "../helpers/persistence";

export const useModal = defineStore("modal", () => {
    const modal = ref<boolean | object | null>(null);

    const isOpenModal = computed(() => modal.value !== false);

    makePersistent(modal, "modal", false)

    const setModal = (value: boolean) => {
         modal.value = value;
    }

    return {
        modal,
        isOpenModal,
        setModal,
    }

});

export default useModal;