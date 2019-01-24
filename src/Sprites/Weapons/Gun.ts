import Weapon from './Weapon';
import Bullet from '../Projectile/Bullet/Bullet';
import Player from '../Player/Player';

class Gun extends Weapon {
    private alternate: number;

    constructor(player: Player) {
        super(player, 20, 20, 50, .3);
        this.alternate = -90;
        this.draw();
    }

    draw() {
        const graphics = this.graphics;
        graphics.lineStyle(2, 0xFFFFFF, .5);
        graphics.beginFill(0x000000);
        graphics.drawRect(-5, this.player.size, 10, 5);
        graphics.drawRect(-5, -this.player.size, 10, 5);
        graphics.endFill();
        graphics.x = -2.5;
        graphics.y = -2.5;
    }

    fire(): void {
        if (this.canFire()) {
            this.alternate += 180;
            new Bullet(this, this.alternate);
            this.didFire();
        }
    }
}

export default Gun;
