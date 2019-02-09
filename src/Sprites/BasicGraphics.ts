import PolarCoordinate from 'winsvold-coordinate/lib/PolarCoordinate';
import Graphics = PIXI.Graphics;
import Game from '../Game';
import Coordinate from 'winsvold-coordinate/lib/Coordinate';
import { getAttractionFrom, GravityMode } from '../utils/gravity';

abstract class BasicGraphics {
    public graphics: Graphics;
    public game: Game;
    public size: number = 10;
    public velocity: PolarCoordinate;
    public acceleration: PolarCoordinate;
    public mass: number = 1;
    public attractors: BasicGraphics[] = [];

    constructor(game: Game) {
        this.game = game;
        this.graphics = new Graphics();
        this.velocity = new PolarCoordinate();
        this.acceleration = new PolarCoordinate();
    }

    abstract draw(): void;

    getPosition() {
        return new Coordinate(this.graphics.x, this.graphics.y);
    }

    addToGameQuick() {
        this.game.app.stage.addChild(this.graphics);
        this.game.sprites.push(this);
    }

    removeFromGameQuick() {
        this.game.app.stage.removeChild(this.graphics);
        this.game.sprites.filter(sprite => sprite !== this);
    }

    update(delta: number) {
        if (this.acceleration.length > 0) {
            this.velocity.addCoordinate(this.acceleration);
        }
        const velocityCartesian = this.velocity.getCartesianCoordinate();
        this.graphics.x += velocityCartesian.x * delta;
        this.graphics.y += velocityCartesian.y * delta;
    }

    restrictVelocity(restrictVelocityTo: number) {
        if (this.velocity.length > restrictVelocityTo) {
            this.velocity.length *= 0.99;
        }
        if (this.velocity.length < 0) {
            this.velocity.length = 0;
        }
        this.velocity.length *= 0.995;
    }

    keepOnCanvas() {
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

    getCombinedAttractionFromAttractors(
        mode: GravityMode = GravityMode.NORMAL
    ) {
        return this.attractors.reduce(
            (acc, attractor) =>
                acc.addCoordinate(getAttractionFrom(this, attractor, mode)),
            new Coordinate()
        );
    }
}

export default BasicGraphics;
