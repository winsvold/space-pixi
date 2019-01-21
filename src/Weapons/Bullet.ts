import Weapon from "./Weapon";
import Player from "../Player";
import PolarCoordinate from "winsvold-coordinate/lib/PolarCoordinate";
import {playerConfig} from "../playerConfig";
import {boxesIntersect, circlesIntersect} from "../collisionDetect";
import BulletDebrees from "./BulletDebrees";
import Coordinate from "winsvold-coordinate/lib/Coordinate";

class Bullet extends Weapon {

    constructor(origin: Player) {
        super(origin);
        let originAcceleration = new PolarCoordinate(this.origin.acceleration);
        originAcceleration.length = 8;
        this.velocity.addCoordinate(originAcceleration);
        this.velocity.angle += Math.random() * .1;
        let bulletCordinate = new Coordinate(this.origin.graphics.x, this.origin.graphics.y);
        originAcceleration.length = this.origin.size;
        originAcceleration.rotateDegrees(Math.random() > .5 ? -90 : 90);
        bulletCordinate.addCoordinate(originAcceleration);
        this.graphics.x = bulletCordinate.x;
        this.graphics.y = bulletCordinate.y;
        this.draw();
        this.sound();
    }

    draw() {
        const radius = this.size;
        const graphics = this.graphics;
        graphics.lineStyle(2, playerConfig[this.origin.playerNumber].color, .5);
        graphics.beginFill(0xFFFFFF);
        graphics.drawCircle(0, 0, radius);
    }

    update(delta) {
        super.update(delta);
        this.velocity.length *= 0.995;
        this.game.players.forEach(player => player !== this.origin && circlesIntersect(player, this) && this.hit(player))
    }

    hit(player: Player) {
        for (let i = 0; i < 20; i++) {
            new BulletDebrees(player, this);
        }
        let deltaVelocity = new PolarCoordinate(this.velocity);
        deltaVelocity.length *= 0.1;
        player.velocity.addCoordinate(deltaVelocity);
        this.remove();
    }

    sound() {
        const audioUrl = require('../../sounds/bullet.mp3');
        const audio = new Audio(audioUrl);
        audio.volume = .05;
        audio.play();
    }
}

export default Bullet;
