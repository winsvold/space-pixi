interface PlayerConfig {
    up: string,
    down: string,
    left: string,
    right: string,
    color: number
}

export const playerConfig: PlayerConfig[] = [
    {
        up: 'arrowup',
        down: 'arrowdown',
        left: 'arrowleft',
        right: 'arrowright',
        color: 0xFF5622
    }, {
        up: 'w',
        down: 's',
        left: 'a',
        right: 'd',
        color: 0xaa56FF
    }, {
        up: 'i',
        down: 'k',
        left: 'j',
        right: 'l',
        color: 0x00FFbb
    }
];