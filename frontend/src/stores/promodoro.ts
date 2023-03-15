import {defineStore} from "pinia";
import {ref} from "vue";
import {makePersistent} from "../helpers/persistence";

type AllowedTypes = string | number | boolean | object | Object | Array<any> | undefined | null;

export const usePromodoro = defineStore("promodoro", () => {
    const defaultSettings: string | object = {
        theme: 'PurpleDay.jpg',
        showNotifications: true,
        showSpotify: true,
        continueTimer: false,
        alertSound: 'Notification',
        alertVolume: 100,
        playSound: false,
        timers: {
            long: 20,
            promodoro: 1500,
            short: 5,
        }
    }
    const promodoro = ref<AllowedTypes>(null);

    makePersistent(promodoro, "promodoro")

    const setPromodoro = (value: object) => {
        promodoro.value = value;
    }

    return {
        promodoro,
        setPromodoro,
        defaultSettings,
    }

});

export default usePromodoro;