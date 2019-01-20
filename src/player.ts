import Graphics = PIXI.Graphics;
import Game from "./Game";
import PolarCoordinate from "winsvold-coordinate/lib/PolarCoordinate";
import BasicGraphics from "./Graphics";
import {playerConfig} from "./playerConfig";

class Player extends BasicGraphics{
    static playerCounter: number = 0;
    private playerNumber: number;

    constructor(radius: number, game: Game) {
        super();
        this.size = 20;
        this.game = game;
        this.graphics = new Graphics();
        this.velocity = new PolarCoordinate();
        this.acceleration = new PolarCoordinate();
        this.keepObjectOnCanvas = true;
        this.restrictVelocityTo = 4;
        this.playerNumber = Player.playerCounter++;
        this.draw();
    }

    draw() {
        const radius = this.size;
        const graphics = this.graphics;
        graphics.lineStyle(2, 0xFFFFFF, .5);
        graphics.beginFill(playerConfig[this.playerNumber].color);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();
        graphics.beginFill(0xDDDDDD);
        graphics.drawCircle(radius, 0, radius/4);
        graphics.endFill();
        graphics.x = 100;
        graphics.y = 100;
    }

    update(delta: number) {
        super.update();
        this.updateAcceleration(delta);
    }

    private updateAcceleration(delta: number) {
        if (this.game.keyboardListenter.keys.includes(playerConfig[this.playerNumber].down)) {
            if (this.acceleration.length > 0) {
                this.acceleration.addToLength(-.002 * delta);
            }
        }
        if (this.game.keyboardListenter.keys.includes(playerConfig[this.playerNumber].up)) {
            if (this.acceleration.length < .05) {
                this.acceleration.addToLength(+.02 * delta);
            }
        }
        if (this.game.keyboardListenter.keys.includes(playerConfig[this.playerNumber].left)) {
            this.acceleration.rotateRadians(-.05 * delta);
        }
        if (this.game.keyboardListenter.keys.includes(playerConfig[this.playerNumber].right)) {
            this.acceleration.rotateRadians(.05 * delta)
        }
        this.acceleration.length *= 0.99;
    }
}

export default Player;
