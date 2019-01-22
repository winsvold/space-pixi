import Projectile from "../Projectile";
import Player from "../../Player/Player";
import {playerConfig} from "../../Player/playerConfig";
import Bullet from "./Bullet";

class BulletDebrees extends Projectile {

    constructor(origin: Player, bullet: Bullet) {
        super(origin);
        this.velocity.length += 9 * Math.random();
        this.velocity.angle += Math.random() * Math.PI * 2;
        this.graphics.x = bullet.graphics.x;
        this.graphics.y = bullet.graphics.y;
        this.draw();
    }

    draw() {
        const radius = 1;
        const graphics = this.graphics;
        graphics.lineStyle(2, playerConfig[this.origin.playerNumber].color, .5);
        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(0, 0, radius);
    }

    update(delta: number) {
        super.update(delta);
        this.velocity.length *= 0.99;
    }
}

export default BulletDebrees;
