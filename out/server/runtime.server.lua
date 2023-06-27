-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Flamework = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Flamework
Flamework._addPaths({ "ServerScriptService", "TS", "components" })
Flamework._addPaths({ "ServerScriptService", "TS", "services" })
Flamework._addPaths({ "ReplicatedStorage", "TS", "components" })
Flamework.ignite()
