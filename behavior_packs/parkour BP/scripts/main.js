console.warn('js以重製')
import { world, system } from "@minecraft/server"
import * as ui from "@minecraft/server-ui"
import { run } from "system/run_parkour"
import { dofall } from "system/redo_fall_damage"

const scoreboard = world.scoreboard
const player = world.getPlayers()
var highest = 0
for (var i = 0; i < world.getPlayers().length; i++) {
    scoreboard.getObjective("slide").setScore(player[i], 0)
    scoreboard.getObjective("lasttickypos").setScore(player[i], player[i].location.y)
}

system.runInterval(e => {
    run()
    for (var i = 0; i < world.getPlayers().length; i++) {
        //do not move this
        var scoreboard = world.scoreboard
        var player = world.getPlayers()
        var ySpeed = player[i].getVelocity().y

        //end
        if (player[i].getVelocity().y < highest) {
            highest = ySpeed.toFixed(2)
        }


    }
}, 1)

function jump(who, jumptype) {
    var scoreboard = world.scoreboard
    if (jumptype == "normal") {
        who.applyKnockback(who.getViewDirection().x, who.getViewDirection().z, 0.3, 0.7)
    } else if (jumptype == "high") {
        who.applyKnockback(who.getViewDirection().x, who.getViewDirection().z, 0.3, 0.8)
    } else if (jumptype == "far") {
        who.applyKnockback(who.getViewDirection().x, who.getViewDirection().z, 1.3, 0.6)
    } else if (jumptype == "little") {
        who.applyKnockback(who.getViewDirection().x, who.getViewDirection().z, 0.1, 0.1)
    } else if (jumptype == "go") {
        who.applyKnockback(who.getViewDirection().x, who.getViewDirection().z, 19, 0)
    }
    scoreboard.getObjective("knockback").setScore(who, 0)
}