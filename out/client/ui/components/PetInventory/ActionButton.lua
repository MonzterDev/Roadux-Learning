-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local ACTION_BUTTONS
local function ActionButton(props)
	return Roact.createFragment({
		[props.action] = Roact.createElement("TextButton", {
			BackgroundColor3 = ACTION_BUTTONS[props.action].backgroundColor,
			Font = Enum.Font.SourceSans,
			Size = UDim2.new(0, 200, 0, 50),
			Text = "",
			TextColor3 = Color3.fromRGB(0, 0, 0),
			TextSize = 14,
			[Roact.Event.MouseButton1Click] = props.onClick,
		}, {
			Roact.createElement("UICorner", {
				CornerRadius = UDim.new(0.2, 0),
			}),
			Icon = Roact.createElement("ImageLabel", {
				AnchorPoint = Vector2.new(0, 0.5),
				BackgroundTransparency = 1,
				Image = ACTION_BUTTONS[props.action].image,
				Position = UDim2.new(0.025, 0, 0.5, 0),
				ScaleType = Enum.ScaleType.Fit,
				Size = UDim2.new(0.2, 0, 0.8, 0),
			}),
			Title = Roact.createElement("TextLabel", {
				BackgroundTransparency = 1,
				Font = Enum.Font.GothamBold,
				Position = UDim2.new(0.25, 0, 0, 0),
				Size = UDim2.new(0.7000000000000001, 0, 1, 0),
				Text = props.action,
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
			}),
		}),
	})
end
ACTION_BUTTONS = {
	["Equip Best"] = {
		image = "rbxassetid://12359088672",
		backgroundColor = Color3.fromRGB(64, 125, 255),
	},
	["Mass Delete"] = {
		image = "rbxassetid://12359088444",
		backgroundColor = Color3.fromRGB(218, 85, 85),
	},
	["Trash Mode"] = {
		image = "rbxassetid://12359088363",
		backgroundColor = Color3.fromRGB(220, 52, 52),
	},
	["Unequip All"] = {
		image = "rbxassetid://11506037408",
		backgroundColor = Color3.fromRGB(156, 98, 255),
	},
}
local default = ActionButton
return {
	default = default,
}
