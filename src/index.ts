import Game from './Game';
import Planet from './Sprites/Planets/Planet';
import { Coordinate } from 'winsvold-coordinate';

const game = new Game();
const app = game.app;

app.ticker.add(gameLoop);

const sun = new Planet(
    game,
    new Coordinate(window.innerWidth / 2, window.innerHeight / 2),
    50,
    2
);
sun.addToGameQuick();
game.globalAttractors.push(sun);

function gameLoop(delta: number) {
    game.players.forEach(player => player.update(delta));
    game.sprites.forEach(sprite => sprite.update(delta));
}
