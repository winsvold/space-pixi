import Game from "./Game";
import Player from "./player";

const game = new Game();
const app = game.app;

app.ticker.add(gameLoop);

const player = new Player(50, game);
const player2 = new Player(50, game);
const player3 = new Player(50, game);

app.stage.addChild(player.graphics);
app.stage.addChild(player2.graphics);
app.stage.addChild(player3.graphics);

function gameLoop(delta){
    player.update(delta);
    player2.update(delta);
    player3.update(delta);
}