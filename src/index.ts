import Game from "./Game";

const game = new Game();
const app = game.app;

app.ticker.add(gameLoop);

function gameLoop(delta: number){
    game.players.forEach(player => player.update(delta));
    game.sprites.forEach(sprite => sprite.update(delta));
}