import Weapon from './Weapon';
import Bullet from '../Projectile/Bullet/Bullet';
import Player from '../Player/Player';

class Gun extends Weapon {
    public cooldown: number;

    constructor(player: Player) {
        super(player);
        this.cooldown = 200;
    }

    fire(): void {
        if (this.cooldown < performance.now()) {
                new Bullet(this);
                this.cooldown = performance.now() + 200;
        }
    }
}

export default Gun;
