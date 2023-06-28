-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local RoactRodux = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux", "src")
local clientStore = TS.import(script, script.Parent.Parent.Parent.Parent, "rodux", "rodux").clientStore
local PlayerDataKeys = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "types", "Rodux").PlayerDataKeys
-- Uses roact-rodux
local function SettingsFrame2(props)
	local isEnabled = props.isEnabled
	return Roact.createElement("Frame", {
		BackgroundColor3 = Color3.fromRGB(64, 64, 64),
	}, {
		Roact.createElement("UICorner", {
			CornerRadius = UDim.new(0.2, 0),
		}),
		Roact.createElement("UIListLayout", {
			Padding = UDim.new(0.3, 0),
			FillDirection = Enum.FillDirection.Horizontal,
			VerticalAlignment = "Center",
			HorizontalAlignment = "Center",
		}),
		Roact.createElement("TextLabel", {
			Text = props.setting,
			TextScaled = true,
			TextColor3 = Color3.fromRGB(255, 255, 255),
			Font = Enum.Font.Gotham,
			Size = UDim2.fromScale(0.4, 0.8),
			BackgroundTransparency = 1,
		}),
		Roact.createElement("TextButton", {
			Text = "",
			TextScaled = true,
			TextColor3 = Color3.fromRGB(255, 255, 255),
			Font = Enum.Font.GothamBlack,
			Size = UDim2.fromScale(0.075, 0.3),
			BackgroundColor3 = if isEnabled then Color3.new(0.13, 0.92, 0.17) else Color3.new(0.92, 0.13, 0.13),
			[Roact.Event.MouseButton1Click] = function()
				local action = {
					type = PlayerDataKeys.updateSetting,
					setting = props.setting,
					value = not isEnabled,
				}
				clientStore:dispatch(action)
			end,
		}, {
			Roact.createElement("UICorner", {
				CornerRadius = UDim.new(0.3, 0),
			}),
		}),
	})
end
local function mapState(state, props)
	return {
		isEnabled = state.settings[props.setting],
	}
end
local function mapDispatch(dispatch, props)
end
local default = RoactRodux.connect(mapState, mapDispatch)(SettingsFrame2)
return {
	default = default,
}
