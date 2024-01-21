import { execSync } from 'child_process';
import * as fs from 'fs-extra';



const build = () => {   
    execSync('npm run compile')
    // copy all non-ts files in src, recursively, to the same relative path under dist
    fs.copySync('src', 'dist/BetterBites/media/lua', { overwrite: true, filter: (src, dest) => !src.endsWith('.ts') })
    // remove C:/Users/.../Zomboid/mods/better_bites
    fs.removeSync('C:/Users/Dustin/Zomboid/mods/BetterBites')
    // ensure C:/Users/.../Zomboid/mods/better_bites exists
    fs.ensureDirSync('C:/Users/Dustin/Zomboid/mods/BetterBites')
    // copy dist to C:/Users/.../Zomboid/mods/better_bites
    fs.copySync('dist', 'C:/Users/Dustin/Zomboid/mods/', { overwrite: true })
}

build()