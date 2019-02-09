import Projectile from '../Projectile';
import Player from '../../Player/Player';
import { playerConfig } from '../../Player/playerConfig';
import { circlesIntersect } from '../../../utils/collisionDetect';
import { GravityMode } from '../../../utils/gravity';
import BulletDebrees from '../Bullet/BulletDebrees';
import Rocket from './Rocket';

class MiniRocket extends Projectile {
    private target: Player;
    private spawnTime: number;

    constructor(origin: Rocket, target: Player, startAngle: number) {
        super(origin.origin);
        this.target = target;
        this.velocity = origin.acceleration
            .clone()
            .withLength(2 + Math.random())
            .addCoordinate(this.origin.velocity)
            .withRadians(startAngle);
        const rocketCordinate = origin.getPosition();
        this.graphics.x = rocketCordinate.x;
        this.graphics.y = rocketCordinate.y;
        this.draw();
        this.attractors = this.game.globalAttractors;
        this.size = 1;
        this.spawnTime = performance.now();
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
        if (performance.now() < this.spawnTime + 2000) {
            const relativeToTarget = this.getPosition()
                .getRelativePostitionTo(this.target.getPosition())
                .withLength(0.06);
            this.velocity.addCoordinate(relativeToTarget);
        }
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

export default MiniRocket;
