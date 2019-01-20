import Player from "../Player";
import BasicGraphics from "../BasicGraphics";
import PolarCoordinate from "winsvold-coordinate/lib/PolarCoordinate";

abstract class Weapon extends BasicGraphics {
    origin: Player;
    constructor(origin: Player) {
        super(origin.game);
        this.origin = origin;
        this.velocity = new PolarCoordinate(this.origin.velocity);
        this.graphics.x = this.origin.graphics.x + this.origin.size * Math.cos(this.origin.acceleration.angle);
        this.graphics.y = this.origin.graphics.y + this.origin.size * Math.sin(this.origin.acceleration.angle);
        this.game.app.stage.addChild(this.graphics);
        this.game.sprites.push(this);
        setTimeout(
            () => this.remove(),
            4000
        );
    }

    remove() {
        this.game.app.stage.removeChild(this.graphics);
        this.game.sprites = this.game.sprites.filter(sprite => sprite !== this);
    }
}


export default Weapon;