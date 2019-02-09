import Projectile from '../Projectile';
import Player from '../../Player/Player';
import { playerConfig } from '../../Player/playerConfig';
import { GravityMode } from '../../../utils/gravity';
import { circlesIntersect } from '../../../utils/collisionDetect';

class BulletDebrees extends Projectile {
    constructor(origin: Player, bullet: Projectile) {
        super(origin);
        this.velocity.length += 9 * Math.random();
        this.velocity.angle += Math.random() * Math.PI * 2;
        this.graphics.x = bullet.graphics.x;
        this.graphics.y = bullet.graphics.y;
        this.draw();
        this.attractors = this.game.globalAttractors;
    }

    draw() {
        const radius = 1;
        const graphics = this.graphics;
        graphics.lineStyle(
            2,
            playerConfig[this.origin.playerNumber].color,
            0.5
        );
        graphics.beginFill(0xffffff);
        graphics.drawCircle(0, 0, radius);
        graphics.alpha = 0.2;
    }

    update(delta: number) {
        super.update(delta);
        this.velocity.length *= 0.99;
        this.attractors.forEach(
            attractor => circlesIntersect(attractor, this) && this.remove()
        );
        const attraction = this.getCombinedAttractionFromAttractors(
            GravityMode.STRONG_DECAY
        );
        this.velocity.addCoordinate(attraction);
    }
}

export default BulletDebrees;
