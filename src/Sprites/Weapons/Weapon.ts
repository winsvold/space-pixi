import Player from '../Player/Player';

abstract class Weapon {
    abstract cooldown: number;
    public player: Player;

    constructor(player: Player) {
        this.player = player;
    }

    abstract fire(): void;
}

export default Weapon;
