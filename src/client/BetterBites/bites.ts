/**
 * @noSelfInFile
 *
 * NOTE: Use this at the top of your TypeScript files. This prevents functions & methods
 *       from prepending a 'self' reference, which is usually not necessary and complicates
 *       rendered Lua code.
 */
import { BodyPart, BodyPartType, ZombRand, getPlayer } from '@asledgehammer/pipewrench';
import { SimpleBodyPart, Injury } from './types';
import { config } from './config';
import { BB } from './store';

export const getDmg = () =>
    getPlayer().getBodyDamage()

export const getStats = () =>
    getPlayer().getStats()

const bleedFactor = () => {
    const dmg = getDmg()
    let factor = 0
    for (let i = 0; i < 16; i++) {
        const type = BodyPartType.FromIndex(i)
        const part = dmg.getBodyPart(type)
        if (part.bleeding()) {
            factor += 1
        }
    }
    return factor * config.bleed
}

const scratchFactor = () => {
    const dmg = getDmg()
    let factor = 0
    for (let i = 0; i < 16; i++) {
        const type = BodyPartType.FromIndex(i)
        const part = dmg.getBodyPart(type)
        if (part.scratched()) {
            factor += 1
        }
    }
    return factor * config.scratch
}

const cutFactor = () => {
    const dmg = getDmg()
    let factor = 0
    for (let i = 0; i < 16; i++) {
        const type = BodyPartType.FromIndex(i)
        const part = dmg.getBodyPart(type)
        if (part.isCut()) {
            factor += 1
        }
    }
    return factor * config.cut
}

const woundFactor = () => {
    const dmg = getDmg()
    let factor = 0
    for (let i = 0; i < 16; i++) {
        const type = BodyPartType.FromIndex(i)
        const part = dmg.getBodyPart(type)
        if (part.isDeepWounded()) {
            factor += 1
        }
    }
    return factor * config.wound
}

const burnFactor = () => {
    const dmg = getDmg()
    let factor = 0
    for (let i = 0; i < 16; i++) {
        const type = BodyPartType.FromIndex(i)
        const part = dmg.getBodyPart(type)
        if (part.isBurnt()) {
            factor += 1
        }
    }
    return factor * config.burn
}

const bulletFactor = () => {
    const dmg = getDmg()
    let factor = 0
    for (let i = 0; i < 16; i++) {
        const type = BodyPartType.FromIndex(i)
        const part = dmg.getBodyPart(type)
        if (part.haveBullet()) {
            factor += 1
        }
    }
    return factor * config.bullet
}

const glassFactor = () => {
    const dmg = getDmg()
    let factor = 0
    for (let i = 0; i < 16; i++) {
        const type = BodyPartType.FromIndex(i)
        const part = dmg.getBodyPart(type)
        factor += part.haveGlass() ? 1 : 0
    }
    return factor * config.glass
}

const zombieFactor = () => {
    const dmg = getDmg()
    return dmg.getCurrentNumZombiesVisible() * config.zombie
}

const thirstFactor = () => {
    return getStats().getThirst() * config.thirst
}

const hungerFactor = () => {
    return getStats().getHunger() * config.hunger
}

const painFactor = () => {
    return getStats().getPain() / 100.0 * config.pain
}

const panicFactor = () => {
    return getStats().getPanic() / 100.0 * config.panic
}

const sickFactor = () => {
    return getStats().getSickness() / 100.0 * config.sick
}

const drunkFactor = () => {
    return getStats().getDrunkenness() / 100.0 * config.drunk
}

const sadFactor = () => {
    return getDmg().getUnhappynessLevel() / 100.0 * config.sad
}

const wetFactor = () => {
    return getDmg().getWetness() / 100.0 * config.wet
}

export const calculateBiteChance = () => {
    const total = Object.values(BB.effects).reduce((a, b) => a + b, 0)
    return {
        ...BB.effects,
        total,
    }
}

export const isInfected = () => {
    const dmg = getDmg()
    for (let i = 0; i < 16; i++) {
        const type = BodyPartType.FromIndex(i)
        const part = dmg.getBodyPart(type)
        if (part.IsInfected()) {
            return true
        }
    }
    return false
}

export function loadParts() {
    const dmg = getPlayer().getBodyDamage()
    for (let i = 0; i < 16; i++) {
        const type = BodyPartType.FromIndex(i)
        const part = dmg.getBodyPart(type)
        BB.parts[i].scratched = part.scratched()
        BB.parts[i].lacerated = part.isCut()
        BB.parts[i].biten = part.IsInfected()
    }
}


export function loadEffects() {
    const stats = getStats()
    const dmg = getDmg()
    BB.effects.bleed = bleedFactor()
    BB.effects.scratch = scratchFactor()
    BB.effects.cut = cutFactor()
    BB.effects.wound = woundFactor()
    BB.effects.burn = burnFactor()
    BB.effects.bullet = bulletFactor()
    BB.effects.glass = glassFactor()
    BB.effects.zombie = zombieFactor()
    BB.effects.thirst = thirstFactor()
    BB.effects.hunger = hungerFactor()
    BB.effects.pain = painFactor()
    BB.effects.panic = panicFactor()
    BB.effects.sick = sickFactor()
    BB.effects.drunk = drunkFactor()
    BB.effects.sad = sadFactor()
    BB.effects.wet = wetFactor()
}

export function compareParts(
    onInjured: (oldPart: SimpleBodyPart, newPart: BodyPart, injury: Injury) => void,
    onHealed: (oldPart: SimpleBodyPart, newPart: BodyPart, injury: Injury) => void,
) {
    const dmg = getDmg()
    for (let i = 0; i < 16; i++) {
        const oldPart = BB.parts[i]
        const type = BodyPartType.FromIndex(i)
        const newPart = dmg.getBodyPart(type)
        if (oldPart.scratched !== newPart.scratched()) {
            if (newPart.scratched()) {
                onInjured(oldPart, newPart, Injury.Scratch)
            } else {
                onHealed(oldPart, newPart, Injury.Scratch)
            }
            oldPart.scratched = newPart.scratched()
        }

        if (oldPart.lacerated !== newPart.isCut()) {
            if (newPart.isCut()) {
                onInjured(oldPart, newPart, Injury.Cut)
            } else {
                onHealed(oldPart, newPart, Injury.Cut)
            }
            oldPart.lacerated = newPart.isCut()
        }
        

        if (oldPart.biten !== newPart.IsInfected()) {
            if (newPart.IsInfected()) {
                onInjured(oldPart, newPart, Injury.Bite)
            } else {
                onHealed(oldPart, newPart, Injury.Bite)
            }
            oldPart.biten = newPart.IsInfected()
        }
    }

}

export const onPlayerUpdate = () => {

    if (!getDmg().IsInfected()) {
        BB.infected = false
    }

    if (BB.infected) {
        return
    }
    
    const customBiteChance = calculateBiteChance()
    const roll = ZombRand(0, 100)

    const zeds = getPlayer().getSurroundingAttackingZombies()

    const reaction = getPlayer().getHitReaction()

    let bitten = false
    switch (reaction) {
        case "Bite":
        case "BiteLEFT":
        case "BiteRIGHT":
            bitten = true
            break
        default:
            bitten = false
    }

    compareParts(
        (oldPart, newPart, injury) => {
            if (zeds === 0 || !bitten) {
                return
            }

            const biteProtection = getPlayer().getBodyPartClothingDefense(newPart.getIndex(), true, false)
            const finalBiteChance = customBiteChance.total - biteProtection
            const shouldGetBit = roll < finalBiteChance

            switch (injury) {
                case Injury.Scratch:
                    if (shouldGetBit) {
                        // we think we should upgrade this hit to a bite
                        newPart.setScratched(false, false)
                        newPart.SetBitten(true)
                        BB.infected = true
                    }
                    break
                case Injury.Cut:
                    if (shouldGetBit) {
                        // we think we should upgrade this hit to a bite
                        newPart.setCut(false, false)
                        newPart.SetBitten(true)
                        BB.infected = true
                    }
                    break
                case Injury.Bite:
                    if (!shouldGetBit) {
                        // we disagree with the game that we should get bit
                        newPart.setDeepWounded(true)
                        newPart.SetBitten(false, false)
                        newPart.SetInfected(false)
                        newPart.setWoundInfectionLevel(10)
                        BB.infected = false
                    }
            }
        },
        (oldPart, newPart, injury) => {
            switch (injury) {
                case Injury.Scratch:
                    break
                case Injury.Cut:
                    break
                case Injury.Bite:
                    break
            }
        },
    )

    loadEffects()
}
