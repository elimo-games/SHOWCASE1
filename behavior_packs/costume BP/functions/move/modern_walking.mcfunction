execute as @e[tag=slow] at @s run tp @s ^ ^ ^0.1 facing @e[type=costom:walk_to_target,c=1]
execute as @e[tag=walk] at @s run tp @s ^ ^ ^0.18 facing @e[type=costom:walk_to_target,c=1]
execute as @e[tag=run] at @s run tp @s ^ ^ ^0.2 facing @e[type=costom:walk_to_target,c=1]
execute as @e[tag=fast] at @s run tp @s ^ ^ ^0.3 facing @e[type=costom:walk_to_target,c=1]

execute as @e[name=slow] at @s run tp @s ^ ^ ^0.1 facing @e[type=costom:walk_to_target,c=1]
execute as @e[name=walk] at @s run tp @s ^ ^ ^0.18 facing @e[type=costom:walk_to_target,c=1]
execute as @e[name=run] at @s run tp @s ^ ^ ^0.2 facing @e[type=costom:walk_to_target,c=1]
execute as @e[name=fast] at @s run tp @s ^ ^ ^0.3 facing @e[type=costom:walk_to_target,c=1]

execute as @e[name=fast] at @s run tag @e[type=costom:walk_to_target,r=0.5] add kill
execute as @e[name=walk] at @s run tag @e[type=costom:walk_to_target,r=0.1] add kill
execute as @e[name=run] at @s run tag @e[type=costom:walk_to_target,r=0.5] add kill
execute as @e[name=slow] at @s run tag @e[type=costom:walk_to_target,r=0.1] add kill

execute as @e[tag=fast] at @s run tag @e[type=costom:walk_to_target,r=0.5] add kill
execute as @e[tag=walk] at @s run tag @e[type=costom:walk_to_target,r=0.1] add kill
execute as @e[tag=run] at @s run tag @e[type=costom:walk_to_target,r=0.5] add kill
execute as @e[tag=slow] at @s run tag @e[type=costom:walk_to_target,r=0.1] add kill

execute as @e[tag=kill] at @s run tp @s ~~1000~
kill @e [tag=kill]
