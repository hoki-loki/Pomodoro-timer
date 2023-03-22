interface ITimer_options {
    timers: any,
    reload: boolean,
    activeTimer: string,
    start: boolean,
    playSound: boolean,
    continueTimer: boolean,
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
    public timer_count: number

    // @ts-ignore
    constructor({timer_options}: timer_options, {timer}: timer, {audio}: audio) {
        this.timer_options = timer_options
        this.timer = timer
        this.audio = audio
        this.timer_count = 0
    }


    public async Reset(value: string): Promise<void> {
        this.timer.time = await this.TimeFormat(this.timer_options.activeTimer)
        this.timer.seconds = this.timer_options.timers[value]
        this.timer_options.start = false
        this.timer.counter = false
        clearInterval(this.timer.interval)
    }

    public setActiveBtn(value: string) {
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

    public async TimeFormat(value: any) {
        let t

        if (typeof value === 'string') t = this.timer_options.timers[value]
        else t = value

        const h = Math.floor(t / 3600).toString().padStart(2, '0'),
            m = Math.floor(t % 3600 / 60).toString().padStart(2, '0'),
            s = Math.floor(t % 60).toString().padStart(2, '0');

        if (h === '00')
            return this.timer.time = m + ':' + s;
        else if (h === '00' && m === '00')
            return this.timer.time = s;
        else
            return this.timer.time = h + ':' + m + ':' + s;
    }

    public PushNotification(text: string = 'Time to take a break') {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            const notification = new Notification("Hi there!", {
                body: text,
            });
            setTimeout(() => notification.close(), 1500);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    const notification = new Notification("Hi there!", {
                        body: text,
                    });
                    setTimeout(() => notification.close(), 1500);
                }
            });
        }

    }

    public async runTimer() {
        this.timer.seconds--

        if (this.timer.seconds === 0) {
            if (this.timer_options.activeTimer === 'short') {
                this.timer.seconds = this.timer_options.timers[this.timer_options.activeTimer]
                if (this.timer_options.continueTimer) {
                    this.timer_options.activeTimer = 'promodoro'
                    await this.PushNotification('Time to work!')
                } else {
                    this.timer_options.activeTimer = 'long'
                    await this.PushNotification('Time to take a long break!')
                }

                this.timer_count++

                if (this.timer_count === 4 && this.timer_options.continueTimer) {
                    this.timer_options.activeTimer = 'long'
                    this.timer_count = 0
                    await this.PushNotification('Time to take a long break!')
                }
            } else if (this.timer_options.activeTimer === 'long') {
                this.timer_options.activeTimer = 'promodoro'
                this.timer.seconds = this.timer_options.timers[this.timer_options.activeTimer]
                await this.PushNotification('Time to work!')
            } else {
                this.timer_options.activeTimer = 'short'
                this.timer.seconds = this.timer_options.timers[this.timer_options.activeTimer]
                await this.PushNotification()
            }

            // @ts-ignore
            if (this.timer_options.playSound) this.audio.play()
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