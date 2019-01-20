import * as PIXI from "pixi.js";
import KeyboardListener from "./KeyboardListener";
import Application = PIXI.Application;

class Game {

    public app: Application;
    public keyboardListenter: KeyboardListener;

    constructor() {
        this.app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, antialias: true});
        document.getElementById('app').innerHTML = null;
        document.getElementById('app').appendChild(this.app.view);
        this.keyboardListenter = new KeyboardListener();
    }
}

export default Game;
