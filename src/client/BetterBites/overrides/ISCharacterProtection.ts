import { BodyPartType, ISBodyPartPanel, ISCharacterProtection, UIFont, getText, getTextManager, luautils } from "@asledgehammer/pipewrench"
import { calculateBiteChance } from "../bites"

const FONT_HIGHT_SMALL = getTextManager().getFontHeight(UIFont.Small)
const FONT_HIGHT_LARGE = getTextManager().getFontHeight(UIFont.Large)

const getRGB = (value: number) => {
    const r = value
    const g = 1 - value
    const b = 0
    return [r, g, b]
}

export const ISCharacterProtection_render = function (this: ISCharacterProtection) {
    const labelPart = getText("IGUI_health_Part")
    const labelChance = getText("Chance")
    const labelBite = getText("IGUI_health_Bite")
    const labelScratch = getText("IGUI_health_Scratch")
    const chanceWidth = getTextManager().MeasureStringX(UIFont.Small, labelChance)
    const biteWidth = getTextManager().MeasureStringX(UIFont.Small, labelBite)
    const scratchWidth = getTextManager().MeasureStringX(UIFont.Small, labelScratch)

    let yOffset = 8
    let yText = yOffset;

    const partX = 150;
    const chanceX = partX + this.maxLabelWidth + 20;
    const biteX = chanceX + chanceWidth + 20;
    const scratchX = biteX + biteWidth + 20;

    this.drawText(labelPart, partX, yText, 1, 1, 1, 1, UIFont.Small)
    this.drawText(labelChance, chanceX, yText, 1, 1, 1, 1, UIFont.Small)
    this.drawText(labelBite, biteX, yText, 1, 1, 1, 1, UIFont.Small)
    this.drawText(labelScratch, scratchX, yText, 1, 1, 1, 1, UIFont.Small)
    yText += FONT_HIGHT_SMALL + 2

    const result = calculateBiteChance()

    const partDefense = (i: number, bite = true) =>
        this.char.getBodyPartClothingDefense(i, bite, false)

    const chance = (def: number) =>
        math.max(0, math.min(100,
            luautils.round(def, 0)
        ))

    const draw = (x: number, chance: number) => {
        const [r, g, b] = getRGB(1 - chance / 100)
        this.drawText(tostring(chance) + "%", x, yText, r, g, b, 1, UIFont.Small)
    }

    for (let i = 0; i < BodyPartType.ToIndex(BodyPartType.MAX); i++) {
        const str = BodyPartType.ToString(BodyPartType.FromIndex(i))


        if (this.bparts[str]) {
            const biteChance = chance(partDefense(i) - result.total)
            const biteDefense = partDefense(i)
            const scratchDefense = partDefense(i, false);

            const bp = BodyPartType.FromIndex(i)
            const bpName = BodyPartType.getDisplayName(bp)
            const bpPanel = this.bodyPartPanel as ISBodyPartPanel
            bpPanel.setValue(bp, biteChance)

            this.drawText(bpName, partX, yText, 1, 1, 1, 1, UIFont.Small)

            draw(chanceX, biteChance)
            draw(biteX, biteDefense)
            draw(scratchX, scratchDefense)

            yText += FONT_HIGHT_SMALL + 2

        }
    }

    const width = math.max(this.width, scratchX + scratchWidth + 20)
    this.setWidthAndParentWidth(width)

    const height = math.max(this.height, yText + 20)
    this.setHeightAndParentHeight(height)
}