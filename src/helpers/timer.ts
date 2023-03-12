import useEventsBus from "./bus";
import {ref, watch} from "vue";


export class TimeClock {
    public seconds: number;
    public interval: number;
    public counter: boolean;

    constructor({seconds, interval, counter}) {
        this.seconds = seconds;
        this.interval = interval;
        this.counter = counter;
    }

    public runTimer() {
        this.seconds--;

        if (this.seconds === 0) {
            clearInterval(this.interval);
        }
    }

    public startTimer() {
        if (!this.counter) {
            this.interval = setInterval(() => this.runTimer(), 1000);
            this.counter = true;
        } else {
            clearInterval(this.interval);
            this.counter = false;
        }
    }

    async getCurrentTime() {
        console.log(this.seconds)
        return this.seconds
    }
}

let timerPromodoro = ref(JSON.parse(localStorage.getItem('promodoro') as string).timers.promodoro)

const timer = new TimeClock({
    seconds: timerPromodoro.value,
    interval: null,
    counter: false,
});

export default timer