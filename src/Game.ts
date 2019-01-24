import * as PIXI from "pixi.js";
import KeyboardListener from "./utils/KeyboardListener";
import Player from "./Sprites/Player/Player";
import Application = PIXI.Application;

interface Updatables {
    update: (delta: number) => void;
}

class Game {

    public app: Application;
    public sprites: Updatables[];
    public players: Player[];
    public keyboardListenter: KeyboardListener;

    constructor() {
        this.app = new PIXI.Application({width: window.innerWidth, height: window.innerHeight, antialias: true});
        const root = document.getElementById('app');
        if (!root) {
            console.error('Could not find root element');
        } else {
            root.appendChild(this.app.view);
        }
        this.keyboardListenter = new KeyboardListener();
        this.sprites = [];
        this.players = [
            new Player(this),
            new Player(this),
            new Player(this)
        ];
        this.players.forEach(player => this.app.stage.addChild(player.graphics));
    }
}

export default Game;
