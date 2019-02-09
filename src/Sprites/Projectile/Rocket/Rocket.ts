import Projectile from '../Projectile';
import Weapon from '../../Weapons/Weapon';
import Player from '../../Player/Player';
import PolarCoordinate from 'winsvold-coordinate/lib/PolarCoordinate';
import { playerConfig } from '../../Player/playerConfig';
import { circlesIntersect } from '../../../utils/collisionDetect';
import { GravityMode } from '../../../utils/gravity';
import BulletDebrees from '../Bullet/BulletDebrees';
import MiniRocket from './MiniRocket';

class Rocket extends Projectile {
    private target: Player;

    constructor(origin: Weapon, target: Player) {
        super(origin.player, 2000);
        this.target = target;
        this.velocity = this.origin.acceleration
            .clone()
            .withLength(5)
            .addCoordinate(this.origin.velocity);
        const rocketCordinate = this.origin
            .getPosition()
            .addCoordinate(
                new PolarCoordinate(
                    this.origin.size,
                    this.origin.acceleration.angle
                ).getCartesianCoordinate()
            );
        this.graphics.x = rocketCordinate.x;
        this.graphics.y = rocketCordinate.y;
        this.draw();
        this.attractors = this.game.globalAttractors;
        this.size = 3;
    }

    draw() {
        const radius = this.size;
        const graphics = this.graphics;
        graphics.lineStyle(
            1,
            playerConfig[this.origin.playerNumber].color,
            0.8
        );
        graphics.beginFill(0xffffff);
        graphics.drawCircle(0, 0, radius);
    }

    update(delta: number) {
        super.update(delta);
        this.velocity.length *= 0.995;
        const relativeToTarget = this.getPosition()
            .getRelativePostitionTo(this.target.getPosition())
            .withLength(0.06);
        this.velocity.addCoordinate(relativeToTarget);
        this.restrictVelocity(3);
        this.game.players.forEach(
            player =>
                player !== this.origin &&
                circlesIntersect(player, this) &&
                this.hit(player)
        );
        this.attractors.forEach(
            attractors =>
                attractors &&
                circlesIntersect(attractors, this) &&
                this.remove()
        );
        const attraction = this.getCombinedAttractionFromAttractors(
            GravityMode.WEAK_DECAY
        );
        this.velocity.addCoordinate(attraction);
    }

    remove() {
        super.remove();
        for (let i = 0; i < 10; i++) {
            new MiniRocket(this, this.target, (i * Math.PI * 2) / 10);
        }
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
}

export default Rocket;
