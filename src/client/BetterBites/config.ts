/**
 * @noSelfInFile
 *
 * NOTE: Use this at the top of your TypeScript files. This prevents functions & methods
 *       from prepending a 'self' reference, which is usually not necessary and complicates
 *       rendered Lua code.
 */
export const config = {
    enabled: true,
    baseBiteChance: 1,
    bleed: 15,
    scratch: 2.5,
    cut: 8,
    wound: 20,
    burn: 45,
    bullet: 55,
    glass: 33,
    zombie: 1,
    thirst: 15, // 0 - 1
    hunger: 15, // 0 - 1
    pain: 75, // 0 - 100
    panic: 45, // 0 - 100
    sick: 50, // 0 - 100
    drunk: 33, // 0 - 100
    sad: 15, // 0 - 100
    wet: 25, // 0 - 100
}

const slider = () => ({
    type: "Slider",
    min: 0,
    max: 100,
    step: 1,
})

const tip = () => ({
    type: "Text",
    a: 0.65,
    customY: -30,
})

const BBConfig = {
    modId: "better_bites",
    name: "Better Bites",
    config,
    menu: {
        enabled: {
            type: "Tickbox",
        },
        baseBiteChance: slider(),
        perInstanceTooltip: tip(),
        burn: slider(),
        bleed: slider(),
        scratch: slider(),
        cut: slider(),
        wound: slider(),
        glass: slider(),
        zombie: slider(),
        bullet: slider(),
        atMaxTooltip: tip(),
        thirst: slider(),
        hunger: slider(),
        pain: slider(),
        panic: slider(),
        sick: slider(),
        drunk: slider(),
        sad: slider(),
        wet: slider(),
    },
}

// @ts-ignore
EasyConfig_Chucked.mods[BBConfig.modId] = BBConfig
