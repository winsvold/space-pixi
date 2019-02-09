import Weapon from './Weapon';
import Player from '../Player/Player';
import Rocket from '../Projectile/Rocket/Rocket';

class RocketLauncher extends Weapon {
    constructor(player: Player) {
        super(player, 2, 2, 1000, 5);
        this.draw();
    }

    draw() {
        const graphics = this.graphics;
        graphics.lineStyle(2, 0xffffff, 0.5);
        graphics.beginFill(0x000000);
        graphics.drawRect(0, 0, 10, 3);
        graphics.endFill();
        graphics.x = -1.5;
        graphics.y = -1.5;
    }

    fire(): void {
        if (this.canFire()) {
            const calculatedExplosionAt = this.player.acceleration
                .clone()
                .withLength(200)
                .addCoordinate(this.player.getPosition());
            const potentialTargets = this.player.game.players.filter(
                player => player !== this.player
            );
            const targetClosestToExplosion = potentialTargets.sort(
                (player1, player2) =>
                    player1
                        .getPosition()
                        .getRelativePostitionTo(calculatedExplosionAt)
                        .getLength() -
                    player2
                        .getPosition()
                        .getRelativePostitionTo(calculatedExplosionAt)
                        .getLength()
            )[0];
            new Rocket(this, targetClosestToExplosion);
            this.didFire();
        }
    }
}

export default RocketLauncher;
