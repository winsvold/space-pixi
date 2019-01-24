import Projectile from "../Projectile";
import Player from "../../Player/Player";
import {playerConfig} from "../../Player/playerConfig";
import { circlesIntersect} from "../../../utils/collisionDetect";
import BulletDebrees from "./BulletDebrees";
import Coordinate from "winsvold-coordinate/lib/Coordinate";
// @ts-ignore
import audioUrl = require('../../../../sounds/bullet.mp3');
import Weapon from '../../Weapons/Weapon';

class Bullet extends Projectile {

    constructor(origin: Weapon, gunPlacement: number) {
        super(origin.player);
        let originAcceleration = this.origin.acceleration.clone();
        originAcceleration.length = 8;
        this.velocity.addCoordinate(originAcceleration);
        this.velocity.angle += Math.random() * .1;
        let bulletCordinate = new Coordinate(this.origin.graphics.x, this.origin.graphics.y);
        originAcceleration.length = this.origin.size;
        originAcceleration.rotateDegrees(gunPlacement);
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

    update(delta: number) {
        super.update(delta);
        this.velocity.length *= 0.995;
        this.game.players.forEach(player => player !== this.origin && circlesIntersect(player, this) && this.hit(player))
    }

    hit(player: Player) {
        for (let i = 0; i < 20; i++) {
            new BulletDebrees(player, this);
        }
        let deltaVelocity = this.velocity.clone();
        deltaVelocity.length *= 0.1;
        player.velocity.addCoordinate(deltaVelocity);
        this.remove();
    }

    sound() {
        const audio = new Audio(audioUrl);
        audio.volume = .05;
        audio.play();
    }
}

export default Bullet;
