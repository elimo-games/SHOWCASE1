console.warn('js以重製')
import { world, system } from "@minecraft/server"
import * as ui from "@minecraft/server-ui"
import { run } from "system/run_parkour"

var scoreboard = world.scoreboard
var player = world.getPlayers()
//do not move this
var scoreboard = world.scoreboard
var player = world.getPlayers()

export function dofall(whot) {
    var who = player[0]
    var ySpeed = who.getVelocity().y
    var lasty = scoreboard.getObjective("lasttickypos")
    if (ySpeed = 0 && Math.abs((lasty.getScore(who) - -0.6)) / 0.05 < 0 && lasty.getScore(who) > 0.6) {
        who.applyDamage(Math.abs((lasty.getScore(who) - -0.6)))
        console.warn(((lasty.getScore(who)) - -0.6) / 0.05)
        console.warn(lasty.getScore(who))
    }
    lasty.setScore(who, ySpeed)

}