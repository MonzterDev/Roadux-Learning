-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Players = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services").Players
local function forEveryPlayer(joinFunc, leaveFunc)
	local _exp = Players:GetPlayers()
	local _joinFunc = joinFunc
	for _k, _v in _exp do
		_joinFunc(_v, _k - 1, _exp)
	end
	Players.PlayerAdded:Connect(joinFunc)
	if leaveFunc then
		Players.PlayerRemoving:Connect(leaveFunc)
	end
end
return {
	forEveryPlayer = forEveryPlayer,
}
