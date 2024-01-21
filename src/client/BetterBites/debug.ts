/**
 * @noSelfInFile
 *
 * NOTE: Use this at the top of your TypeScript files. This prevents functions & methods
 *       from prepending a 'self' reference, which is usually not necessary and complicates
 *       rendered Lua code.
 */
import { ISButton, ISLabel, ISPanel, UIFont } from "@asledgehammer/pipewrench"
import { calculateBiteChance } from "./bites"

// function that returns RGB triplet for value between 0 and 1
// produces gradient between green and red
const getRGB = (value: number) => {
    const r = value
    const g = 1 - value
    const b = 0
    return [r, g, b]
}

export function initializeUI() {
    const window = new ISPanel(100, 100, 150, 200)
    window.moveWithMouse = true

    let y = 3
 
    const small = () => { const label = new ISLabel(10, y, 20, ``, 255, 255, 255, 255, UIFont.Small, true); y += 10; return label }
    const large = () => { const label = new ISLabel(10, y + 5, 20, ``, 255, 255, 255, 255, UIFont.Large, true); y += 20; return label }

    const effects = {
        base: small(),
        bleed: small(),
        scratch: small(),
        cut: small(),
        wound: small(),
        burn: small(),
        bullet: small(),
        glass: small(),
        zombie: small(),
        thirst: small(),
        hunger: small(),
        pain: small(),
        panic: small(),
        sick: small(),
        drunk: small(),
        sad: small(),
        wet: small(),
        total: large(),
    }

    Object.values(effects).forEach(label => window.addChild(label))
    
    window.update = () => {
        const stats = calculateBiteChance()
        Object.entries(effects).forEach(([key, label]) => {
            const [r, g, b] = getRGB(stats[key as keyof typeof stats] / 100)
            label.r = r
            label.g = g
            label.b = b
            label.name = `${key}: ${string.format("%.2f", stats[key as keyof typeof stats])}%`
        })
    }

    window.setVisible(false)
    window.addToUIManager()

    return window
}