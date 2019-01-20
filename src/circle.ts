import Graphics = PIXI.Graphics;
import Game from "./Game";

class Circle {
    public circle: Graphics;
    private game: Game;

    constructor(radius: number, game: Game) {
        this.game = game;
        const circle = new Graphics();
        circle.lineStyle(4, 0xFFFFFF, .5);
        circle.beginFill(0x567);
        circle.drawCircle(0, 0, 32);
        circle.endFill();
        circle.x = 100;
        circle.y = 100;
        this.circle = circle;
    }
}

export default Circle;
