console.warn('js以重製')
import { world, system } from "@minecraft/server"
import * as ui from "@minecraft/server-ui"

const scoreboard = world.scoreboard
const player = world.getPlayers()

for (var i = 0; i < world.getPlayers().length; i++) {
    scoreboard.getObjective("slide").setScore(player[i], 0)
}

system.runInterval(e => {
    for (var i = 0; i < world.getPlayers().length; i++) {
        //do not move this
        const scoreboard = world.scoreboard
        const player = world.getPlayers()
        //end
        if (player[i].isOnGround) {
            scoreboard.getObjective("simple").setScore(player[i], 5)
            scoreboard.getObjective("jump").setScore(player[i], 1)
        }
        if (player[i].isJumping) {
            if (player[i].isFalling == false) {
                if (player[i].isSneaking) {
                    if (scoreboard.getObjective("jump").getScore(player[i]) == 1) {
                        scoreboard.getObjective("jump").setScore(player[i], 0)
                        if (player[i].getViewDirection().y < 0.1) {
                            jump(player[i], "far")
                        } else {
                            player[i].runCommand("playanimation @s animation.humanoid.jump.high move 0")
                            jump(player[i], "high")
                        }
                    }
                }
                if (scoreboard.getObjective("fence").getScore(player[i]) == 1) {
                    player[i].runCommand("playanimation @s animation.humanoid.fence_vault.1 move 0")
                    player[i].runCommandAsync("execute anchored feet as @a at @s rotated ~ 0 run tp @s ^^^0.5")
                    jump(player[i], "little")
                }
            }
            if (scoreboard.getObjective("sidewall").getScore(player[i]) == 1 && player[i].isSprinting) {
                player[i].applyKnockback(player[i].getViewDirection().x, player[i].getViewDirection().z, 0.5, 0.01)
                scoreboard.getObjective("wallrunning").setScore(player[i], 1)
            } else if (scoreboard.getObjective("wallrunning").getScore(player[i]) == 1 && player[i].isSneaking) {
                scoreboard.getObjective("wallrunning").setScore(player[i], 0)
                player[i].applyKnockback(player[i].getViewDirection().x, player[i].getViewDirection().z, 0.5, 0.7)
            } else {
                scoreboard.getObjective("wallrunning").setScore(player[i], 0)
            }
        }
        if (player[i].isOnGround && scoreboard.getObjective("eyeblock").getScore(player[i]) == 1) {
            if (player[i].isSneaking && scoreboard.getObjective("feetblock").getScore(player[i]) == 0) {
                player[i].runCommandAsync("execute anchored feet as @a at @s rotated ~ 0 run tp @s ^^^0.5")
                player[i].applyKnockback(player[i].getViewDirection().x, player[i].getViewDirection().z, 2, 0.1)
                scoreboard.getObjective("slide").setScore(player[i], 1)
            }
            if (player[i].isJumping && scoreboard.getObjective("feetblock").getScore(player[i]) == 1 && scoreboard.getObjective("simple").getScore(player[i]) > 0) {
                if (scoreboard.getObjective("simple").getScore(player[i]) == 5) {
                    player[i].runCommand("playanimation @s animation.humanoid.wall.climb move 0.1")
                } else if (scoreboard.getObjective("simple").getScore(player[i]) == 4) {
                    player[i].runCommand("playanimation @s animation.humanoid.wall.fly move 0")
                } else {
                    player[i].runCommand("playanimation @s animation.humanoid.wall.fly move 0")
                }
                jump(player[i], "high")
                scoreboard.getObjective("simple").addScore(player[i], -1)
            }
        }
    }
}, 1)

function jump(who, jumptype) {
    const scoreboard = world.scoreboard
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