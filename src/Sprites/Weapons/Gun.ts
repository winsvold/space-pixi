import Weapon from './Weapon';
import Bullet from '../Projectile/Bullet/Bullet';
import Player from '../Player/Player';

class Gun extends Weapon {
    private alternate: number;

    constructor(player: Player) {
        super(player, 10, 10, 100, 0.3);
        this.alternate = -90;
        this.draw();
    }

    draw() {
        const graphics = this.graphics;
        graphics.lineStyle(2, 0xffffff, 0.5);
        graphics.beginFill(0x000000);
        graphics.drawRect(-3, this.player.size, 6, 3);
        graphics.drawRect(-3, -this.player.size, 6, 3);
        graphics.endFill();
        graphics.x = -1.5;
        graphics.y = -1.5;
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
