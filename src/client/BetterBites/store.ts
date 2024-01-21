/**
 * @noSelfInFile
 *
 * NOTE: Use this at the top of your TypeScript files. This prevents functions & methods
 *       from prepending a 'self' reference, which is usually not necessary and complicates
 *       rendered Lua code.
 */
import { SimpleBodyPart } from "./types";

export const BB = {
    infected: false,
    effects: {
        base: 0,
        bleed: 0,
        scratch: 0,
        cut: 0,
        wound: 0,
        burn: 0,
        bullet: 0,
        glass: 0,
        zombie: 0,
        thirst: 0, // 0 - 1
        hunger: 0, // 0 - 1
        pain: 0, // 0 - 100
        panic: 0, // 0 - 100
        sick: 0, // 0 - 100
        drunk: 0, // 0 - 100
        sad: 0, // 0 - 100
        wet: 0, // 0 - 100
        
    },
    parts: [
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
        { scratched: false, lacerated: false, biten: false },
    ] as SimpleBodyPart[],
}
