import Weapon from "./Weapon";
import Player from "../Player";
import {playerConfig} from "../playerConfig";

class BulletDebrees extends Weapon {

    constructor(origin: Player) {
        super(origin);
        this.draw();
        this.velocity.length += 9 * Math.random();
        this.velocity.angle += Math.random() * Math.PI * 2;
    }

    draw() {
        const radius = 1;
        const graphics = this.graphics;
        graphics.lineStyle(2, playerConfig[this.origin.playerNumber].color, .5);
        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(0, 0, radius);
    }

    update(delta) {
        super.update(delta);
        this.velocity.length *= 0.99;
    }
}

export default BulletDebrees;
