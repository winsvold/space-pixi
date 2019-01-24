import Player from '../Player/Player';
import Graphics = PIXI.Graphics;

abstract class Weapon {
    public player: Player;
    public cooldown: number;
    public nextShotAfter: number;
    public magazine: number;
    public maxMagazine: number;
    public spawntime: number;
    public graphics: Graphics;

    constructor(player: Player, magazine: number, maxMagazine: number, cooldown: number, spawntime: number) {
        this.graphics = new Graphics();
        const weaponContainer = new PIXI.Container();
        weaponContainer.addChild(this.graphics);
        player.graphics.addChild(weaponContainer);
        this.player = player;
        this.nextShotAfter = performance.now();
        this.cooldown = cooldown;
        this.magazine = magazine;
        this.maxMagazine = maxMagazine;
        this.spawntime = spawntime;
    }

    update(delta: number) {
        if (this.magazine === this.maxMagazine) {
            return;
        }
        this.magazine += delta / (60 * this.spawntime);
        if (this.magazine > this.maxMagazine) {
            this.magazine = this.maxMagazine;
        }
    }

    canFire() {
        return this.nextShotAfter < performance.now() && this.magazine >= 1;
    }

    didFire() {
        this.nextShotAfter = performance.now() + this.cooldown;
        this.magazine -= 1;
    }

    abstract fire(): void;
    abstract draw(): void;
}

export default Weapon;
