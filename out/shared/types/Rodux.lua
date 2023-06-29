-- Compiled with roblox-ts v2.1.0
local PlayerDataKeys
do
	local _inverse = {}
	PlayerDataKeys = setmetatable({}, {
		__index = _inverse,
	})
	PlayerDataKeys.updateCurrency = "updateCurrency"
	_inverse.updateCurrency = "updateCurrency"
	PlayerDataKeys.init = "init"
	_inverse.init = "init"
	PlayerDataKeys.updateSetting = "updateSetting"
	_inverse.updateSetting = "updateSetting"
	PlayerDataKeys.updatePet = "updatePet"
	_inverse.updatePet = "updatePet"
	PlayerDataKeys.givePet = "givePet"
	_inverse.givePet = "givePet"
	PlayerDataKeys.renamePet = "renamePet"
	_inverse.renamePet = "renamePet"
end
return {
	PlayerDataKeys = PlayerDataKeys,
}
