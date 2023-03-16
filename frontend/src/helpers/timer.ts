
interface ITimer_options {
    timers: any,
    reload: boolean,
    activeTimer: string,
    start: boolean,
}

interface ITimer extends ITimer_options {
    seconds: number,
    interval: number,
    counter: boolean,
    time: string,
}

export class Timer {

    public timer_options: ITimer_options
    public timer: ITimer
    public audio: object

    // @ts-ignore
    constructor({timer_options}: timer_options, {timer}: timer, {audio}: audio) {
        this.timer_options = timer_options
        this.timer = timer
        this.audio = audio
    }


    public async Reset(value: string): Promise<void> {
        this.timer.time = await this.TimeFormat(this.timer_options.activeTimer)
        this.timer.seconds = this.timer_options.timers[value]
        this.timer_options.start = false
        this.timer.counter = false
        clearInterval(this.timer.interval)
    }

    public setActiveBtn (value: string) {
        this.timer_options.activeTimer = value
        this.Reset(value)
    }

    public Reload() {
        this.timer_options.reload = true

        setTimeout(() => {
            this.timer_options.reload = false
        }, 1000);

        this.Reset(this.timer_options.activeTimer)
    }

    public async TimeFormat(value: any){
        let t

        if (typeof value === 'string') t = this.timer_options.timers[value]
        else t = value

        const h = Math.floor(t / 3600).toString().padStart(2, '0'),
            m = Math.floor(t % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(t % 60).toString().padStart(2, '0');

        if (h === '00')
           return  this.timer.time = m + ':' + s;
        else if (h === '00' && m === '00')
            return this.timer.time = s;
        else
            return this.timer.time = h + ':' + m + ':' + s;
    }

    public runTimer() {
        this.timer.seconds--

        if (this.timer.seconds === 0) {
            this.Reset(this.timer_options.activeTimer)
            this.timer_options.start = false
            // @ts-ignore
            this.audio.play()
        }
    }

    public startTimer() {
        if (!this.timer.counter) {
            this.timer.counter = true;

            // @ts-ignore
            this.timer.interval = setInterval(() => this.runTimer(), 1000);

        } else {
            clearInterval(this.timer.interval);
            this.timer.counter = false;
        }
    }
}


export default Timer