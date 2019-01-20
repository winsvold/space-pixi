import Weapon from "./Weapon";
import Player from "../Player";
import PolarCoordinate from "winsvold-coordinate/lib/PolarCoordinate";
import {playerConfig} from "../playerConfig";
import {boxesIntersect} from "../collisionDetect";
import BulletDebrees from "./BulletDebrees";

class Bullet extends Weapon {

    constructor(origin: Player) {
        super(origin);
        this.draw();
        let originAcceleration = new PolarCoordinate(this.origin.acceleration);
        originAcceleration.length = 8;
        this.velocity.addCoordinate(originAcceleration);
        this.velocity.angle += Math.random() * .1;
        this.sound();
    }

    draw() {
        const radius = 2;
        const graphics = this.graphics;
        graphics.lineStyle(2, playerConfig[this.origin.playerNumber].color, .5);
        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(0, 0, radius);
    }

    update(delta) {
        super.update(delta);
        this.velocity.length *= 0.995;
        this.game.players.forEach(player => player !== this.origin && boxesIntersect(player.graphics, this.graphics) && this.hit(player))
    }

    hit(player: Player) {
        for (let i = 0; i < 20; i++) {
            new BulletDebrees(player);
        }
        this.remove();
    }

    sound() {
        const audioUrl = require('../../sounds/bullet.mp3');
        const audio = new Audio(audioUrl);
        audio.volume = .3;
        audio.play();
    }
}

export default Bullet;
