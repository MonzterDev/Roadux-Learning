-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local createReducer = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "rodux", "src").createReducer
local DEFAULT_PLAYER_DATA = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants", "PlayerData").DEFAULT_PLAYER_DATA
-- Define the `init` function
local function init(state, action)
	return action.data
end
-- Define the `updateCurrency` function
local function updateCurrency(state, action)
	state[action.currency] = action.amount
	return state
end
local function updateSetting(state, action)
	state.settings[action.setting] = action.value
	return state
end
local function updatePet(state, action)
	local pet = state.petInventory[action.uuid]
	if not pet then
		return state
	end
	if action.equipped ~= nil then
		pet.equipped = action.equipped
	end
	if action.locked ~= nil then
		pet.locked = action.locked
	end
	return state
end
local dataReducer = createReducer(DEFAULT_PLAYER_DATA, {
	init = init,
	updateCurrency = updateCurrency,
	updateSetting = updateSetting,
	updatePet = updatePet,
})
return {
	init = init,
	updateCurrency = updateCurrency,
	updateSetting = updateSetting,
	updatePet = updatePet,
	dataReducer = dataReducer,
}
