import PolarCoordinate from "winsvold-coordinate/lib/PolarCoordinate";
import Graphics = PIXI.Graphics;
import Game from "../Game";

abstract class BasicGraphics {
    public graphics: Graphics;
    public game: Game;
    public size: number = 10;
    public velocity: PolarCoordinate;
    public acceleration: PolarCoordinate;
    public keepObjectOnCanvas?: boolean;
    public restrictVelocityTo?: number;

    constructor(game: Game) {
        this.game = game;
        this.graphics = new Graphics();
        this.velocity = new PolarCoordinate();
        this.acceleration = new PolarCoordinate();
    }

    abstract draw (): void;

    update(delta: number) {
        this.restrictVelocity();
        this.keepOnCanvas();

        this.velocity.addCoordinate(this.acceleration);

        const velocityCartesian = this.velocity.getCartesianCoordinate();
        this.graphics.x += velocityCartesian.x;
        this.graphics.y += velocityCartesian.y;
    }

    restrictVelocity() {
        if (this.restrictVelocityTo === undefined) {
            return;
        }
        if (this.velocity.length > this.restrictVelocityTo) {
            this.velocity.length *= .99;
        }
        if (this.velocity.length < 0) {
            this.velocity.length = 0;
        }
        this.velocity.length *= .995;
    }

    keepOnCanvas() {
        if (!this.keepObjectOnCanvas) {
            return;
        }
        if (this.graphics.x > this.game.app.view.width + this.size) {
            this.graphics.x = -this.size;
        }
        if (this.graphics.y > this.game.app.view.height + this.size) {
            this.graphics.y = -this.size;
        }
        if (this.graphics.x < -this.size) {
            this.graphics.x = this.game.app.view.width + this.size;
        }
        if (this.graphics.y < -this.size) {
            this.graphics.y = this.game.app.view.height + this.size;
        }
    }
}

export default BasicGraphics;