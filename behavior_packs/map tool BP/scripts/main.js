import { world, system } from "@minecraft/server"
import { word, changeLanguage } from "translation"
import * as ui from "@minecraft/server-ui"
import { encode, decode } from "encode.js"

var afterset = false

const lang_word = ["中文", "english US"];
const lang_code = ["zh_tw", "en_us"];
const lang = new ui.ModalFormData()
    .title("lang")
    .dropdown("Language", lang_word, 0);

const players = world.getPlayers();


players.forEach(player => {
    console.warn("Player found, showing language selection menu.");
    lang.show(player).then(th => {
        changeLanguage(lang_code[th.formValues[0]]);
        intro(player);
    });
    if (world.scoreboard.getObjective("playscene") == null) {
        world.scoreboard.addObjective("playscene", "playscene")
    }
    world.scoreboard.getObjective("playscene").setScore(player, 0);
});

function intro(who) {
    const intro = new ui.MessageFormData()
        .title(word.intro)
        .body(word.tutor)
        .button1(word.give)
        .button2(word.cancel)
        .show(who).then(chose => {
            if (chose.selection == 0) {
                who.runCommandAsync("/give @s stick");
            }
        });
}

var easingStorage = ["linear", "spring", "in_quad", "out_quad", "in_out_quad", "in_cubic", "out_cubic",
    "in_out_cubic", "in_quart", "out_quart", "in_out_quart", "in_quint", "out_quint", "in_out_quint", "in_sine",
    "out_sine", "in_out_sine", "in_expo", "out_expo", "in_out_expo", "in_circ", "out_circ", "in_out_circ",
    "in_bounce", "out_bounce", "in_out_bounce", "in_back", "out_back", "in_out_back", "in_elastic", "out_elastic",
    "in_out_elastic"];

var keybox = ["交談"]
world.setDynamicProperty("keybox", JSON.stringify(keybox))
world.setDynamicProperty("交談", JSON.stringify(cutstorge[0]))

var cutstorge = [
    [
        "交談",
        {
            pos: { x: "372.82", y: "52.79", z: "-1402.12" },
            face: { x: 44, y: -137.47 },
            setting: { easing: "linear", time: 0 }
        },
        {
            pos: { x: "372.82", y: "52.79", z: "-1402.12" },
            face: { x: 44.95, y: -136.09 },
            setting: { easing: "linear", time: 3 }
        },
        {
            pos: { x: "372.85", y: "51.52", z: "-1405.93" },
            face: { x: 19.69, y: -66.63 },
            setting: { easing: "in_quad", time: 4 }
        },
        {
            pos: { x: "372.74", y: "51.52", z: "-1405.30" },
            face: { x: 22.85, y: -81.89 },
            setting: { easing: "linear", time: 5 }
        }
    ]
]
world.afterEvents.playerJoin.subscribe(res => {
    storageMyClips([
        "交談",
        {
            pos: { x: "372.82", y: "52.79", z: "-1402.12" },
            face: { x: 44, y: -137.47 },
            setting: { easing: "linear", time: 0 }
        },
        {
            pos: { x: "372.82", y: "52.79", z: "-1402.12" },
            face: { x: 44.95, y: -136.09 },
            setting: { easing: "linear", time: 3 }
        },
        {
            pos: { x: "372.85", y: "51.52", z: "-1405.93" },
            face: { x: 19.69, y: -66.63 },
            setting: { easing: "in_quad", time: 4 }
        },
        {
            pos: { x: "372.74", y: "51.52", z: "-1405.30" },
            face: { x: 22.85, y: -81.89 },
            setting: { easing: "linear", time: 5 }
        }
    ])
})


system.runInterval(e => {
    for (var o = 0; o < world.getPlayers().length; o++) {
        var players = world.getPlayers()
        var play = world.scoreboard.getObjective("playscene").getScore(players[o])
        if (play != 0) {
            world.scoreboard.getObjective("playscene").setScore(players[o], 0)
            var cutSceneNow = cutstorge[play - 1]
            playscene(cutSceneNow.slice(1), 0, players[o]);
        }
    }
}, 1)


world.afterEvents.itemUse.subscribe(result => {
    if (result.itemStack.typeId == "minecraft:stick") {
        showAdminMenu(result.source);
    }
});

function showAdminMenu(source) {
    const admin_menu = new ui.ActionFormData()
        .title(word.admin)
        .button(word.through_walls)
        .button(word.mode_menu)
        .button(word.tools)
        .button(word.clear_item)
        .button(word.store_places)
        .button(word.cutscene_tool)
        .button(word.test)
        .button(word.register)
        .show(source).then(i => handleAdminSelection(i.selection, source));
}

function testScreen(source) {
    const testS = new ui.ModalFormData()
        .title("damn")
        .toggle(word.parkour_or_not)
        .show(source).then(o => {
            if (o.formValues[0] == true) {
                world.scoreboard.getObjective("play").setScore(source, 0)
            } else {
                world.scoreboard.getObjective("play").setScore(source, 1)
            }
        })
}

function handleAdminSelection(selection, source) {
    switch (selection) {
        case 0:
            source.runCommandAsync("tp @s ^^^2");
            break;
        case 1:
            showGameModeMenu(source);
            break;
        case 2:
            source.runCommandAsync("function dev");
            break;
        case 3:
            source.runCommandAsync("clear");
            source.runCommandAsync("give @s stick");
            break;
        case 4:
            tpl(source);
            break;
        case 5:
            openEditor(source);
            break;
        case 6:
            testScreen(source)
        case 7:
            register(source)
    }
}

function register(player) {
    const register_screen = new ui.ActionFormData()
        .title(word.register)

}

function showGameModeMenu(source) {
    const mode_menu = new ui.ModalFormData()
        .title(word.mode)
        .dropdown(word.mode, [word.adventure, word.creative, word.spectator, word.survival])
        .show(source).then(i => handleGameModeSelection(i.formValues[0], source));
}

function handleGameModeSelection(selection, source) {
    const modes = ["a", "c", "spectator", "survival"];
    source.runCommandAsync(`gamemode ${modes[selection]} @s`);
}

var tpstore = [];
var splitword = "(❁´◡`❁)(●'◡'●)╰(*°▽°*)╯(^///^)(*/ω＼*)☆*: .｡. o(≧▽≦)o .｡.:*☆:-)^_^:-Dಥ_ಥ(┬┬﹏┬┬)ᓚᘏᗢ℃№ä>äʯ૱℃௹℉|–»««⁋‰⁜⁂⁈⌀⌀₱";

export function tpl(who) {
    const form5 = new ui.ActionFormData()
        .title(word.teleport_menu)
        .button(word.add_place);

    var p = [];
    for (var i = 0; i < tpstore.length; i++) {
        var sez = tpstore[i];
        var xs = sez.split(splitword);
        if (xs[4] == who.name) {
            form5.button(xs[0]);
            p.push(xs[1] + splitword + xs[2] + splitword + xs[3]);
        }
    }

    form5.show(who).then(w => {
        let sel3 = w.selection;
        if (sel3 == 0) {
            const form6 = new ui.ModalFormData()
                .title(word.set_place)
                .textField(word.name_, word.name_word, word.untitled_place)
                .show(who).then(e => {
                    let sel = e.formValues;
                    tpstore.push(sel[0] + splitword + who.getHeadLocation().x + splitword + who.getHeadLocation().y + splitword + who.getHeadLocation().z + splitword + who.name);
                });
        } else if (sel3) {
            let sop = p[sel3 - 1].split(splitword);
            who.runCommandAsync(`tp @s ${sop[0]} ${sop[1] - 1} ${sop[2]}`);
        }
    });
}



// 打开编辑器菜单
function openEditor(who) {
    const editmain = new ui.ActionFormData()
        .title(word.cutscene_tool)
        .button(word.new_clip);

    for (var i = 0; i < cutstorge.length; i++) {
        editmain.button(cutstorge[i][0]);
    }

    editmain.show(who).then(e => {
        if (e.selection == 0) {
            addAnim(who)
        }
        if (e.selection !== null && e.selection > 0) {
            let select = e.selection - 1;
            let cutSceneNow = cutstorge[select];
            showEditorMenu(cutSceneNow, select, who);
        }
    });
}

// 显示编辑菜单
function showEditorMenu(cutSceneNow, sceneIndex, who) {
    const menu = new ui.ActionFormData()
        .title(word.edit)
        .button(word.play_clip)
        .button(word.edit_keyframe)
        .show(who).then(ea => {
            if (ea.selection == 0) {
                playscene(cutSceneNow.slice(1), 0, who);
                who.onScreenDisplay.setActionBar(word.play_clip);
            } else if (ea.selection == 1) {
                showKeyFrameMenu(cutSceneNow, sceneIndex, who);
            }
        });
}

// 显示关键帧菜单
function showKeyFrameMenu(cutSceneNow, sceneIndex, who) {
    const keyframe = new ui.ActionFormData()
        .title(word.edit_keyframe)
        .button(word.new_keyframe);

    for (var aa = 1; aa < cutSceneNow.length; aa++) {
        keyframe.button(`${word.keyframe}${aa} (${cutSceneNow[aa].pos.x} , ${cutSceneNow[aa].pos.y} , ${cutSceneNow[aa].pos.z})`);
    }

    keyframe.show(who).then(ae => {
        if (ae.selection == 0) {
            showAddKeyFrameMenu(who, sceneIndex, cutSceneNow);
        } else if (ae.selection != null) {
            showEditKeyFrameMenu(who, sceneIndex, ae.selection, cutSceneNow)
        }
    });
}

function addAnim(who) {
    const addAim = new ui.ModalFormData()
        .title(word.add_clip)
        .textField(word.clip_name, word.clip_name, "")
        .show(who).then(result => {
            cutstorge.push([result.formValues[0]])
        })
}

// 显示添加关键帧单
function showEditKeyFrameMenu(who, sceneIndex, frameNow, cutSceneNow) {

    var now = cutstorge[sceneIndex][frameNow]

    const editKeyFrame = new ui.ModalFormData()

    editKeyFrame.title(word.edit_keyframe)
    editKeyFrame.textField(word.pos_x, word.cord_x, now.pos.x)
    editKeyFrame.textField(word.pos_y, word.cord_y, now.pos.y)
    editKeyFrame.textField(word.pos_z, word.cord_z, now.pos.z)
    editKeyFrame.textField(word.angle_x, word.x_angle, now.face.x.toString())
    editKeyFrame.textField(word.angle_y, word.y_angle, now.face.y.toString())
    editKeyFrame.dropdown(word.easing, easingStorage, easingStorage.indexOf(now.setting.easing))
    editKeyFrame.textField(word.work_time, word.second, now.setting.time.toString())
    editKeyFrame.toggle(word.delete_keyframe)
    editKeyFrame.show(who).then(ass => {
        let result = ass.formValues;
        setToCut(result[3], result[4], result[0], result[1], result[2], easingStorage[parseFloat(result[5])], result[6], sceneIndex, frameNow);

        if (result[7] == true) {
            cutstorge[sceneIndex].splice(frameNow, 1)
        }
        showKeyFrameMenu(cutSceneNow, sceneIndex, who)
    });
}

function showAddKeyFrameMenu(who, sceneIndex, cutSceneNow) {
    var viewDirection = who.getViewDirection();
    var angles = directionToAngles(viewDirection.x, viewDirection.y, viewDirection.z);

    const addKeyFrame = new ui.ModalFormData()
        .title(word.add_clip)
        .textField(word.pos_x, word.cord_x, who.getHeadLocation().x.toFixed(2).toString())
        .textField(word.pos_y, word.cord_y, who.getHeadLocation().y.toFixed(2).toString())
        .textField(word.pos_z, word.cord_z, who.getHeadLocation().z.toFixed(2).toString())
        .textField(word.angle_x, word.x_angle, angles[0].toFixed(2).toString())
        .textField(word.angle_y, word.y_angle, angles[1].toFixed(2).toString())
        .dropdown(word.easing, easingStorage, 0)
        .textField(word.work_time, word.second, "")
        .show(who).then(ass => {
            let result = ass.formValues;
            console.warn(easingStorage[parseFloat(result[6])])
            storageToCut(sceneIndex, result[3], result[4], result[0], result[1], result[2], easingStorage[parseFloat(result[5])], result[6]);
            showKeyFrameMenu(cutSceneNow, sceneIndex, who)
        });
}

// 播放动画
function playscene(scenes, index, who) {
    if (index >= scenes.length) {
        who.runCommandAsync("camera @s clear");
        return;
    }

    let scene = scenes[index];
    let posX = scene.pos.x;
    let posY = scene.pos.y;
    let posZ = scene.pos.z;
    let faceX = parseFloat(scene.face.x);
    let faceY = parseFloat(scene.face.y);

    console.warn(`/camera @s set minecraft:free ease ${scene.setting.time} ${scene.setting.easing} pos ${posX} ${posY} ${posZ} rot ${faceX} ${faceY}`)
    who.runCommandAsync(`/camera @s set minecraft:free ease ${scene.setting.time} ${scene.setting.easing} pos ${posX} ${posY} ${posZ} rot ${faceX} ${faceY}`);

    system.runTimeout(() => {
        playscene(scenes, index + 1, who);
    }, scene.setting.time * 20); // Minecraft 计时器以 tick 为单位，20 tick 等于 1 秒
}

// 转换为角度
function directionToAngles(dirX, dirY, dirZ) {
    var x = dirY * -90
    var y = -Math.atan2(dirX, dirZ) * (180 / Math.PI)
    return [x, y];
}
// 存储关键帧到剪辑
function setToCut(angleX, angleY, posX, posY, posZ, easingMode, time, scene, what) {
    console.warn(easingMode)
    console.warn(time)
    cutstorge[scene][what] = ({
        pos: { x: posX, y: posY, z: posZ },
        face: { x: parseFloat(angleX), y: parseFloat(angleY) },
        setting: { easing: easingMode, time: parseFloat(time) }
    });

    console.warn(parseFloat(time))

}

function storageToCut(sceneIndex, angleX, angleY, posX, posY, posZ, easingMode, time) {
    console.warn(easingMode)
    console.warn(time)
    cutstorge[sceneIndex].push({
        pos: { x: posX, y: posY, z: posZ },
        face: { x: parseFloat(angleX), y: parseFloat(angleY) },
        setting: { easing: easingMode, time: parseFloat(time) }
    });

    console.warn(parseFloat(time))

}

function fixToString(input) {
    return input.toFixed(2).toString()
}

function decode(data) {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.error("解碼失敗", error);
        return [];
    }
}

function storeToDymanic(data) {
    try {
        world.setDynamicProperty("hell", data);
    } catch (error) {
        console.error("存儲失敗", error);
    }
}


system.runInterval(t => {
    if (!afterset && world.getDynamicProperty("keybox") != null) {
        world.setDynamicProperty("keybox", "['交談']")
        cutstorge = readDymanicClips()
        afterset = true
        console.warn("i reload")
    } else if (!afterset && world.getDynamicProperty("keybox") == null) {
        storageMyClips(cutstorge[0])
        console.warn("i loged")
        afterset = true
    } else {
        cutstorge.forEach(back => {
            storageMyClips(back)
        })
        console.warn("i did")
    }
}, 20);

system.runInterval(t => {
}, 20);

function storageMyClips(clip) {
    world.setDynamicProperty(clip[0], JSON.stringify(clip))
    if (!keybox.includes(clip[0])) {
        keybox.push(clip[0])
        console.warn("ida")
    }
    world.setDynamicProperty("keybox", JSON.stringify(keybox))
}

function readDymanicClips() {
    var result = []
    keybox = JSON.parse(world.getDynamicProperty("keybox"))

    for (var i = 0; i < keybox.length; i++) {
        console.warn(keybox[i])
        result.push(JSON.parse(world.getDynamicProperty(keybox[i])))
    }
    return result
}

