-- Compiled with roblox-ts v2.1.0
-- This was created because of what seems to be an issue on Flamework's Netowrking?
-- https://discord.com/channels/476080952636997633/1012815033559949412/1012815033559949412
-- * Used to enable type inferencing on certain objects when networking
local function isA(object)
	return true
end
return {
	isA = isA,
}
