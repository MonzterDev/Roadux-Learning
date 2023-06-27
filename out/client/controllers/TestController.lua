-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Reflect = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Reflect
local Controller = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@flamework", "core", "out").Controller
local clientStore = TS.import(script, script.Parent.Parent, "rodux", "rodux").clientStore
local TestController
do
	TestController = setmetatable({}, {
		__tostring = function()
			return "TestController"
		end,
	})
	TestController.__index = TestController
	function TestController.new(...)
		local self = setmetatable({}, TestController)
		return self:constructor(...) or self
	end
	function TestController:constructor()
	end
	function TestController:onStart()
		print(clientStore)
	end
end
-- (Flamework) TestController metadata
Reflect.defineMetadata(TestController, "identifier", "client/controllers/TestController@TestController")
Reflect.defineMetadata(TestController, "flamework:implements", { "$:flamework@OnStart" })
Reflect.decorate(TestController, "$:flamework@Controller", Controller, { {} })
return {
	TestController = TestController,
}
