import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {makePersistent} from "../helpers/persistence";


export const  usePromodoro = defineStore("promodoro", () => {
    const defaultSetting: object = {
        theme: 'PurpleDay',
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

    const promodoro = ref(defaultSetting)

    makePersistent(promodoro, "promodoro")

    const theme_image = computed(() => {
        // @ts-ignore
        return promodoro.value.theme.split(' ').join('') + '.jpg';
    });

    const getPromodoro = computed( () => {
        return promodoro.value
    });


    const setPromodoro = (value: object) => {
        promodoro.value = value;
    }

    return {
        promodoro,
        theme_image,
        getPromodoro,
        setPromodoro,
    }

});

export default usePromodoro;