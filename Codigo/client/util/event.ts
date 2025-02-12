class Event {
    events: { [key: string]: Function[] };

    constructor() {
        this.events = {};
    }

    on(event: string, callback: Function) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    off(event: string, callback: Function) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((cb: any) => cb !== callback);
        }
    }

    emit(event: string, ...args: any[]) {
        if (this.events[event]) {
            this.events[event].forEach((callback) => callback(...args));
        }
    }
}

export default new Event();