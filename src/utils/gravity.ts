import BasicGraphics from '../Sprites/BasicGraphics';
import { Coordinate, PolarCoordinate } from 'winsvold-coordinate';

export enum GravityMode {
    NORMAL,
    WEAK_DECAY,
    STRONG_DECAY,
}

const GRAVITY_CONSTANT = 0.5;
const WEAK_GRAVITY_CONSTANT = GRAVITY_CONSTANT * 0.01;
const STRONG_GRAVITY_CONSTANT = GRAVITY_CONSTANT;
const STRONG_DECAY_DISTANCE_FACTOR = 7.0;

export function getAttractionFrom(
    attracted: BasicGraphics,
    attractor: BasicGraphics,
    mode: GravityMode
) {
    const relativePosition = attracted
        .getPosition()
        .getRelativePostitionTo(attractor.getPosition());
    const distance = relativePosition.getLength();
    switch (mode) {
        case GravityMode.STRONG_DECAY:
            return getStrongDecayAttractionFrom(
                attractor,
                relativePosition,
                distance
            );
        case GravityMode.WEAK_DECAY:
            return getWeakDecayAttractionFrom(
                attractor,
                relativePosition,
                distance
            );
        case GravityMode.NORMAL:
        default:
            return getNormalDecayAttractionFrom(
                attractor,
                relativePosition,
                distance
            );
    }
}

function getNormalDecayAttractionFrom(
    attractor: BasicGraphics,
    relativePosition: Coordinate,
    distance: number
): Coordinate {
    return relativePosition.multiplyLengthBy(
        (attractor.mass * GRAVITY_CONSTANT) / (distance * distance)
    );
}

function getStrongDecayAttractionFrom(
    attractor: BasicGraphics,
    relativePosition: Coordinate,
    distance: number
): Coordinate {
    const strongDecayDistance = distance / STRONG_DECAY_DISTANCE_FACTOR;
    return relativePosition.multiplyLengthBy(
        (attractor.mass * STRONG_GRAVITY_CONSTANT) /
            (strongDecayDistance * strongDecayDistance * strongDecayDistance)
    );
}

function getWeakDecayAttractionFrom(
    attractor: BasicGraphics,
    relativePosition: Coordinate,
    distance: number
) {
    return relativePosition.multiplyLengthBy(
        (attractor.mass * WEAK_GRAVITY_CONSTANT) / distance
    );
}

export function getPerfectOrbitVelocity(
    attracted: BasicGraphics,
    attractor: BasicGraphics
) {
    return getOrbitVelocity(attracted, attractor, 0);
}

export function getOrbitVelocity(
    attracted: BasicGraphics,
    attractor: BasicGraphics,
    displacement: number
) {
    const relativePosition = attracted
        .getPosition()
        .getRelativePostitionTo(attractor.getPosition());
    const radius = relativePosition.getLength();
    const attraction = getAttractionFrom(
        attracted,
        attractor,
        GravityMode.NORMAL
    );
    const velocity =
        Math.sqrt(attraction.getLength() * radius) +
        (Math.random() - 0.5) * displacement;
    const directionRad = relativePosition.getRadians() - Math.PI / 2;
    return new PolarCoordinate(velocity, directionRad).getCartesianCoordinate();
}
