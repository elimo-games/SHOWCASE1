gamerule sendcommandfeedback false
gamerule commandblockoutput false
# wall part
execute anchored eyes as @a at @s rotated ~ 0 if block ^ ^1.5 ^0.5 minecraft:air run scoreboard players set @s eyeblock 0
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.5 minecraft:air run scoreboard players set @s feetblock 0
execute anchored eyes as @a at @s rotated ~ 0 unless block ^ ^1.5 ^0.5 minecraft:air run scoreboard players set @s eyeblock 1
execute anchored feet as @a at @s rotated ~ 0 unless block  ^ ^0.5 ^0.5 minecraft:air run scoreboard players set @s feetblock 1
execute anchored feet as @a at @s rotated ~ 0 unless block ^ ^-0.3 ^0.5 minecraft:air run scoreboard players set @s jumpblock 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^-0.3 ^0.5 minecraft:air run scoreboard players set @s jumpblock 0
execute as @a at @s if block ^ ^1 ^0.5 air rotated ~ 0 run scoreboard players set @s overheadblock 0
execute as @a at @s unless block ^ ^1 ^0.5 air rotated ~ 0 run scoreboard players set @s overheadblock 1
# fence part
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:oak_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:birch_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:acacia_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:bamboo_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:cherry_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:jungle_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:spruce_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:warped_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:crimson_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:dark_oak_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:mangrove_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:nether_brick_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:pale_oak_fence run scoreboard players set @s fence 1
execute anchored feet as @a at @s rotated ~ 0 if block  ^ ^0.5 ^0.3 minecraft:air run scoreboard players set @s fence 0
# sidewall part
execute as @a at @s rotated ~ 0 unless block ^0.7 ^0.5 ^ minecraft:air run scoreboard players set @s sidewallleftdown 1
execute as @a at @s rotated ~ 0 if block ^0.7 ^0.5 ^ minecraft:air run scoreboard players set @s sidewallleftdown 0
execute as @a at @s rotated ~ 0 unless block ^0.7 ^1.5 ^ minecraft:air run scoreboard players set @s sidewallleftup 1
execute as @a at @s rotated ~ 0 if block ^0.7 ^1.5 ^ minecraft:air run scoreboard players set @s sidewallleftup 0
execute as @a[scores={sidewallleftup=1,sidewallleftdown=1}] run scoreboard players set @s sidewallleft 1
execute as @a[scores={sidewallleftup=1,sidewallleftdown=0}] run scoreboard players set @s sidewallleft 0
execute as @a[scores={sidewallleftup=0,sidewallleftdown=1}] run scoreboard players set @s sidewallleft 0
execute as @a[scores={sidewallleftup=0,sidewallleftdown=0}] run scoreboard players set @s sidewallleft 0
execute as @a at @s rotated ~ 0 unless block ^-0.7 ^0.5 ^ minecraft:air run scoreboard players set @s sidewallrightdown 1
execute as @a at @s rotated ~ 0 if block ^-0.7 ^0.5 ^ minecraft:air run scoreboard players set @s sidewallrightdown 0
execute as @a at @s rotated ~ 0 unless block ^-0.7 ^0.5 ^ minecraft:air run scoreboard players set @s sidewallrightup 1
execute as @a at @s rotated ~ 0 if block ^-0.7 ^1.5 ^ minecraft:air run scoreboard players set @s sidewallrightup 0
execute as @a[scores={sidewallrightup=1,sidewallrightdown=1}] run scoreboard players set @s sidewallright 1
execute as @a[scores={sidewallrightup=1,sidewallrightdown=0}] run scoreboard players set @s sidewallright 0
execute as @a[scores={sidewallrightup=0,sidewallrightdown=1}] run scoreboard players set @s sidewallright 0
execute as @a[scores={sidewallrightup=0,sidewallrightdown=0}] run scoreboard players set @s sidewallright 0
execute as @a[scores={sidewallleft=1,sidewallright=1}] run scoreboard players set @s sidewall 1
execute as @a[scores={sidewallleft=1,sidewallright=0}] run scoreboard players set @s sidewall 1
execute as @a[scores={sidewallleft=0,sidewallright=1}] run scoreboard players set @s sidewall 1
execute as @a[scores={sidewallleft=0,sidewallright=0}] run scoreboard players set @s sidewall 0
