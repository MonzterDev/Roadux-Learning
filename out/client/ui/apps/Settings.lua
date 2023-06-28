-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local StoreProvider = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux-hooked", "src").StoreProvider
local clientStore = TS.import(script, script.Parent.Parent.Parent, "rodux", "rodux").clientStore
local Settings = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants", "Settings").Settings
local SettingFrame2 = TS.import(script, script.Parent.Parent, "components", "Settings", "SettingFrame2").default
local SettingsApp
do
	SettingsApp = Roact.Component:extend("SettingsApp")
	function SettingsApp:init(props)
	end
	function SettingsApp:render()
		local _arg0 = function(setting)
			return Roact.createElement(SettingFrame2, {
				setting = setting,
			})
		end
		-- ▼ ReadonlyArray.map ▼
		local _newValue = table.create(#Settings)
		for _k, _v in Settings do
			_newValue[_k] = _arg0(_v, _k - 1, Settings)
		end
		-- ▲ ReadonlyArray.map ▲
		local settingFrames = _newValue
		local _attributes = {
			store = clientStore,
		}
		local _children = {}
		local _length = #_children
		local _children_1 = {}
		local _length_1 = #_children_1
		local _attributes_1 = {
			Size = UDim2.fromScale(0.3, 0.7),
			AnchorPoint = Vector2.new(0.5, 0.5),
			Position = UDim2.fromScale(0.5, 0.5),
			BackgroundColor3 = Color3.new(0.14, 0.14, 0.14),
		}
		local _children_2 = {
			Roact.createElement("UICorner", {
				CornerRadius = UDim.new(0.025, 0),
			}),
			Roact.createElement("TextLabel", {
				Text = "SETTINGS",
				TextScaled = true,
				TextColor3 = Color3.fromRGB(255, 255, 255),
				Font = Enum.Font.GothamBlack,
				Size = UDim2.fromScale(0.9, 0.1),
				AnchorPoint = Vector2.new(0.5, 0),
				Position = UDim2.fromScale(0.5, 0),
				BackgroundTransparency = 1,
			}),
		}
		local _length_2 = #_children_2
		local _attributes_2 = {
			Size = UDim2.fromScale(0.9, 0.85),
			AnchorPoint = Vector2.new(0.5, 0),
			Position = UDim2.fromScale(0.5, 0.115),
			BackgroundTransparency = 1,
			AutomaticCanvasSize = Enum.AutomaticSize.Y,
			VerticalScrollBarInset = Enum.ScrollBarInset.Always,
		}
		local _children_3 = {
			Roact.createElement("UIGridLayout", {
				CellSize = UDim2.fromScale(0.95, 0.25),
				HorizontalAlignment = "Center",
			}),
		}
		local _length_3 = #_children_3
		for _k, _v in settingFrames do
			_children_3[_length_3 + _k] = _v
		end
		_children_2[_length_2 + 1] = Roact.createElement("ScrollingFrame", _attributes_2, _children_3)
		_children_1[_length_1 + 1] = Roact.createElement("Frame", _attributes_1, _children_2)
		_children[_length + 1] = Roact.createElement("ScreenGui", {}, _children_1)
		return Roact.createElement(StoreProvider, _attributes, _children)
	end
end
return {
	SettingsApp = SettingsApp,
}
