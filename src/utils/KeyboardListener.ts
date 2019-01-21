class KeyboardListener {

    public keys: string[];

    constructor() {
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
        this.keys = [];
    }

    handleKeyDown(event: KeyboardEvent) {
        if (!event.repeat) {
            this.keys = [...this.keys, event.key.toLowerCase()];
        }
    }

    handleKeyUp(event: KeyboardEvent) {
        this.keys = this.keys.filter(key => key !== event.key.toLowerCase());
    }
}

export default KeyboardListener;