import {watch} from 'vue'
import type {Ref} from 'vue'

// add allowed types
type AllowedTypes = string | number | boolean | object | Object | Array<any> | undefined | null;

export const makePersistent = (reference: Ref<AllowedTypes>, store_name: string) => {
    const value = localStorage.getItem(store_name);

    if (value) {
        try {
            reference.value = JSON.parse(value);
        } catch (e) {
            console.error("[Pinia] Persistence error:", e);
            return;
        }
    }

    watch(reference,(newValue) => {
        let value = JSON.stringify(newValue)
        localStorage.setItem(store_name,  value);
    }, {
        deep: true
    });
}