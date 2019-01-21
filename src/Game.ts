import * as PIXI from "pixi.js";
import KeyboardListener from "./utils/KeyboardListener";
import Application = PIXI.Application;
import Player from "./Sprites/Player/Player";

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
        document.getElementById('app').innerHTML = null;
        document.getElementById('app').appendChild(this.app.view);
        this.keyboardListenter = new KeyboardListener();
        this.sprites = [];
        this.players = [
            new Player(50, this),
            new Player(50, this),
            new Player(50, this)
        ];
        this.players.forEach(player => this.app.stage.addChild(player.graphics));
    }
}

export default Game;
