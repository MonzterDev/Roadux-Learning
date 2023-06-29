-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Store = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "rodux", "src").Store
local Events = TS.import(script, script.Parent.Parent, "network").Events
local dataReducer = TS.import(script, script.Parent, "reducers").dataReducer
local PlayerDataKeys = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "types", "Rodux").PlayerDataKeys
local DEFAULT_PLAYER_DATA = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants", "PlayerData").DEFAULT_PLAYER_DATA
local clientStore = Store.new(dataReducer)
clientStore:dispatch({
	type = PlayerDataKeys.init,
	data = DEFAULT_PLAYER_DATA,
})
-- Events.replicatePlayerState.connect((action) => {
-- const data = <DataActions>HttpService.JSONDecode(action);
-- clientStore.dispatch(data);
-- });
-- Events.updateData.connect((data) => {
-- const playerData = <PlayerData>HttpService.JSONDecode(data);
-- clientStore.dispatch({ type: PlayerDataKeys.init, data: playerData });
-- });
Events.petAction:connect(function(uuid, action)
	repeat
		if action == "Equip" then
			clientStore:dispatch({
				type = PlayerDataKeys.updatePet,
				uuid = uuid,
				equipped = true,
			})
			break
		end
		if action == "Unequip" then
			clientStore:dispatch({
				type = PlayerDataKeys.updatePet,
				uuid = uuid,
				equipped = false,
			})
			break
		end
		if action == "Delete" then
			clientStore:dispatch({
				type = PlayerDataKeys.updatePet,
				uuid = uuid,
				delete = true,
			})
			break
		end
		if action == "Lock" then
			clientStore:dispatch({
				type = PlayerDataKeys.updatePet,
				uuid = uuid,
				locked = true,
			})
			break
		end
		if action == "Unlock" then
			clientStore:dispatch({
				type = PlayerDataKeys.updatePet,
				uuid = uuid,
				locked = false,
			})
			break
		end
		break
	until true
end)
Events.givePet:connect(function(petInstance)
	clientStore:dispatch({
		type = PlayerDataKeys.givePet,
		uuid = petInstance.uuid,
		pet = petInstance.type,
		rarity = petInstance.rarity,
	})
	print("Pet received")
end)
return {
	clientStore = clientStore,
}
