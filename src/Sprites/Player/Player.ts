import Game from '../../Game';
import { playerConfig } from './playerConfig';
import BasicGraphics from '../BasicGraphics';
import Weapon from '../Weapons/Weapon';
import RocketLauncher from '../Weapons/RocketLauncher';

class Player extends BasicGraphics {
    static playerCounter: number = 0;
    public playerNumber: number;
    private arsenal: Weapon[];
    private selectedWeapon: Weapon | undefined;

    constructor(game: Game) {
        super(game);
        this.size = 10;
        this.arsenal = [new RocketLauncher(this)];
        this.selectedWeapon = this.arsenal[0];
        this.playerNumber = Player.playerCounter++;
        this.acceleration.angle = Math.random() * Math.PI * 2;
        this.draw();
    }

    draw() {
        const radius = this.size;
        const graphics = this.graphics;
        graphics.lineStyle(2, 0xffffff, 0.5);
        graphics.beginFill(playerConfig[this.playerNumber].color);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();
        graphics.beginFill(0xdddddd);
        graphics.drawCircle(radius, 0, radius / 4);
        graphics.endFill();
        graphics.x = this.game.app.view.width * Math.random();
        graphics.y = this.game.app.view.height * Math.random();
    }

    update(delta: number) {
        super.update(delta);
        this.updateAcceleration(delta);
        this.keepOnCanvas();
        this.restrictVelocity(4);
        this.graphics.rotation = this.acceleration.angle;
        this.arsenal.forEach(weapon => weapon.update(delta));
    }

    updateAcceleration(delta: number) {
        if (
            this.game.keyboardListenter.keys.includes(
                playerConfig[this.playerNumber].down
            )
        ) {
            this.fireWeapon();
        }
        if (
            this.game.keyboardListenter.keys.includes(
                playerConfig[this.playerNumber].up
            )
        ) {
            if (this.acceleration.length < 0.05) {
                this.acceleration.addToLength(+0.02 * delta);
            }
        }
        if (
            this.game.keyboardListenter.keys.includes(
                playerConfig[this.playerNumber].left
            )
        ) {
            this.acceleration.rotateRadians(-0.05 * delta);
        }
        if (
            this.game.keyboardListenter.keys.includes(
                playerConfig[this.playerNumber].right
            )
        ) {
            this.acceleration.rotateRadians(0.05 * delta);
        }
        this.acceleration.length *= 0.95;
    }

    fireWeapon() {
        this.selectedWeapon
            ? this.selectedWeapon.fire()
            : console.error('No weapon selected');
    }
}

export default Player;
