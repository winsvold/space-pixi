import Graphics = PIXI.Graphics;
import Coordinate from "winsvold-coordinate/lib/Coordinate";

export function boxesIntersect(a: Graphics, b: Graphics) {
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

interface SpriteWithRadius {
    graphics: Graphics;
    size: number;
}

export function circlesIntersect(a: SpriteWithRadius, b: SpriteWithRadius) {
    if (boxesIntersect(a.graphics, b.graphics)) {
        const A = new Coordinate(a.graphics.x, a.graphics.y);
        const B = new Coordinate(b.graphics.x, b.graphics.y);
        const distance = A.getRelativePostitionTo(B);
        if (distance.getLength() < a.size + b.size) {
            return true;
        }
    }
    return false;
}