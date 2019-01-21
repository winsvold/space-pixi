import Game from "../../Game";
import {playerConfig} from "./playerConfig";
import BasicGraphics from "../BasicGraphics";
import Bullet from "../Weapons/Bullet/Bullet";
import Weapon from "../Weapons/Weapon";

class Player extends BasicGraphics {
    static playerCounter: number = 0;
    public playerNumber: number;
    private arsenal: Weapon[];
    private selectedWeapon: Weapon | undefined;

    constructor(radius: number, game: Game) {
        super(game);
        this.size = 15;
        this.arsenal = [Bullet];
        this.selectedWeapon = this.arsenal[0];
        this.keepObjectOnCanvas = true;
        this.restrictVelocityTo = 4;
        this.playerNumber = Player.playerCounter++;
        this.acceleration.angle = Math.random() * Math.PI * 2;
        this.draw();
    }

    draw() {
        const radius = this.size;
        const graphics = this.graphics;
        graphics.lineStyle(2, 0xFFFFFF, .5);
        graphics.beginFill(playerConfig[this.playerNumber].color);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();
        graphics.beginFill(0xDDDDDD);
        graphics.drawCircle(radius, 0, radius / 4);
        graphics.endFill();
        graphics.x = this.game.app.view.width * Math.random();
        graphics.y = this.game.app.view.height * Math.random();
    }

    update(delta: number) {
        super.update(delta);
        this.graphics.rotation = this.acceleration.angle;
        this.updateAcceleration(delta);
    }

    updateAcceleration(delta: number) {
        if (this.game.keyboardListenter.keys.includes(playerConfig[this.playerNumber].down)) {
            this.fireWeapon();
        }
        if (this.game.keyboardListenter.keys.includes(playerConfig[this.playerNumber].up)) {
            if (this.acceleration.length < .05) {
                this.acceleration.addToLength(+.02 * delta);
            }
        }
        if (this.game.keyboardListenter.keys.includes(playerConfig[this.playerNumber].left)) {
            this.acceleration.rotateRadians(-.05 * delta);
        }
        if (this.game.keyboardListenter.keys.includes(playerConfig[this.playerNumber].right)) {
            this.acceleration.rotateRadians(.05 * delta)
        }
        this.acceleration.length *= 0.95;
    }

    fireWeapon() {
        const selectedWeapon = this.selectedWeapon;
        if (this.selectedWeapon.cooldown > performance.now()) {
            return;
        }
        switch (selectedWeapon) {
            case Bullet:
                new Bullet(this);
                selectedWeapon.cooldown = performance.now() + 200;
                break;
            default:
        }
    }
}

export default Player;
