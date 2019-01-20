import Weapon from "./Weapon";
import Bullet from "./Bullet";

export interface Stock {
    amount: number;
    weapon: Weapon;
    cooldown: number;
}

class WeaponArsenal {
    public weapons: Stock[];

    constructor() {
        this.weapons = [{
            weapon: Bullet,
            amount: 100,
            cooldown: performance.now()
        }];
    }
}

export default WeaponArsenal;