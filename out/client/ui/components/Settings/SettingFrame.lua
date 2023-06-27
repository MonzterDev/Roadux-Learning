-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local useState = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-hooked", "src").useState
local clientStore = TS.import(script, script.Parent.Parent.Parent.Parent, "rodux", "rodux").clientStore
local PlayerDataKeys = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "types", "Rodux").PlayerDataKeys
local function SettingsFrame(props)
	local isEnabled, setIsEnabled = useState(function()
		local currentState = clientStore:getState()
		return currentState.data.settings[props.setting]
	end)
	local toggleEnabled = function()
		setIsEnabled(function(action)
			return not action
		end)
		local action = {
			type = PlayerDataKeys.updateSetting,
			setting = props.setting,
			value = not isEnabled,
		}
		clientStore:dispatch(action)
	end
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
			[Roact.Event.MouseButton1Click] = toggleEnabled,
		}, {
			Roact.createElement("UICorner", {
				CornerRadius = UDim.new(0.3, 0),
			}),
		}),
	})
end
local default = SettingsFrame
return {
	default = default,
}
