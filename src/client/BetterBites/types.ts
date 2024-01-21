/**
 * @noSelfInFile
 *
 * NOTE: Use this at the top of your TypeScript files. This prevents functions & methods
 *       from prepending a 'self' reference, which is usually not necessary and complicates
 *       rendered Lua code.
 */
export type SimpleBodyPart = {
    scratched: boolean,
    lacerated: boolean,
    biten: boolean,
}

export enum Injury {
    Scratch,
    Cut,
    Bite,
}
