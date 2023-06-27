-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Reflect
local Service = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Service
local ProfileService = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "profileservice", "src")
local _services = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "services")
local HttpService = _services.HttpService
local Players = _services.Players
local _network = TS.import(script, game:GetService("ServerScriptService"), "TS", "network")
local Events = _network.Events
local Functions = _network.Functions
local DEFAULT_PLAYER_DATA = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants", "PlayerData").DEFAULT_PLAYER_DATA
local forEveryPlayer = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "util", "functions", "forEveryPlayer").forEveryPlayer
local DATASTORE_NAME = "PlayerData"
local KEY_TEMPLATE = "%d_Data"
local PlayerDataService
do
	PlayerDataService = setmetatable({}, {
		__tostring = function()
			return "PlayerDataService"
		end,
	})
	PlayerDataService.__index = PlayerDataService
	function PlayerDataService.new(...)
		local self = setmetatable({}, PlayerDataService)
		return self:constructor(...) or self
	end
	function PlayerDataService:constructor()
		self.profileStore = ProfileService.GetProfileStore(DATASTORE_NAME, DEFAULT_PLAYER_DATA)
		self.profiles = {}
	end
	function PlayerDataService:onInit()
		forEveryPlayer(function(player)
			return self:createProfile(player)
		end, function(player)
			return self:removeProfile(player)
		end)
		Functions.getData:setCallback(function(player, data)
			local _profiles = self.profiles
			local _player = player
			local profile = _profiles[_player]
			local _result = profile
			if _result ~= nil then
				_result = _result.Data
				if _result ~= nil then
					_result = _result[data]
				end
			end
			local _condition = _result
			if _condition == nil then
				_condition = false
			end
			return _condition
		end)
		task.spawn(function()
			while 1 + 1 == 2 do
				local _exp = Players:GetPlayers()
				local _arg0 = function(player)
					print(true)
					local profile = self:getProfile(player)
					if profile then
						profile.adjustTaps(1)
					end
				end
				for _k, _v in _exp do
					_arg0(_v, _k - 1, _exp)
				end
				task.wait(1)
			end
		end)
	end
	function PlayerDataService:createProfile(player)
		local userId = player.UserId
		local profileKey = string.format(KEY_TEMPLATE, userId)
		local profile = self.profileStore:LoadProfileAsync(profileKey)
		if not profile then
			return player:Kick()
		end
		profile:ListenToRelease(function()
			local _profiles = self.profiles
			local _player = player
			_profiles[_player] = nil
			player:Kick()
		end)
		profile:AddUserId(userId)
		profile:Reconcile()
		local _profiles = self.profiles
		local _player = player
		_profiles[_player] = profile
		Events.updateData:fire(player, HttpService:JSONEncode(profile.Data))
	end
	function PlayerDataService:removeProfile(player)
		local _profiles = self.profiles
		local _player = player
		local profile = _profiles[_player]
		local _result = profile
		if _result ~= nil then
			_result:Release()
		end
	end
	function PlayerDataService:getProfile(player)
		local _profiles = self.profiles
		local _player = player
		local profile = _profiles[_player]
		if profile then
			local setTaps = function(value)
				profile.Data.taps = value
				local action = HttpService:JSONEncode({
					type = "updateCurrency",
					currency = "taps",
					amount = value,
				})
				Events.replicatePlayerState(player, action)
				Events.updateTaps(player, value)
			end
			local adjustTaps = function(value)
				local amount = profile.Data.taps + value
				setTaps(amount)
			end
			return {
				data = profile.Data,
				setTaps = setTaps,
				adjustTaps = adjustTaps,
			}
		end
		return false
	end
end
-- (Flamework) PlayerDataService metadata
Reflect.defineMetadata(PlayerDataService, "identifier", "server/services/PlayerDataService@PlayerDataService")
Reflect.defineMetadata(PlayerDataService, "flamework:implements", { "$:flamework@OnInit" })
Reflect.decorate(PlayerDataService, "$:flamework@Service", Service, {})
return {
	PlayerDataService = PlayerDataService,
}
