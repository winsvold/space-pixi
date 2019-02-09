import BasicGraphics from '../BasicGraphics';
import Game from '../../Game';
import Coordinate from 'winsvold-coordinate/lib/Coordinate';

class Planet extends BasicGraphics {
    constructor(game: Game, position: Coordinate, size: number, mass: number) {
        super(game);
        this.graphics.x = position.x;
        this.graphics.y = position.y;
        this.size = size;
        this.mass = mass;
        this.draw();
    }

    update(delta: number) {
        super.update(delta);
    }

    draw() {
        const radius = this.size;
        const graphics = this.graphics;
        graphics.lineStyle(4, 0xffffff, 0.5);
        graphics.beginFill(0xffff000);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();
    }
}

export default Planet;
