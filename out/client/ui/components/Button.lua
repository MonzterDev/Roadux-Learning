-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local function Button(props)
	return Roact.createElement("TextButton", {
		AutoButtonColor = false,
		TextColor3 = Color3.fromRGB(255, 255, 255),
		BorderSizePixel = 0,
		Font = Enum.Font.GothamBlack,
		Text = string.upper(props.Text),
		TextSize = 24,
		AutomaticSize = Enum.AutomaticSize.XY,
		AnchorPoint = Vector2.new(0, 0.5),
		Position = props.Position,
		Rotation = props.Rotation,
		LayoutOrder = props.LayoutOrder,
		[Roact.Event.MouseButton1Click] = function(b)
			return props.OnClick(b)
		end,
	}, {
		Roact.createElement("UIPadding", {
			PaddingTop = UDim.new(0, 10),
			PaddingBottom = UDim.new(0, 10),
			PaddingLeft = UDim.new(0, 15),
			PaddingRight = UDim.new(0, 15),
		}),
		Roact.createElement("UIStroke", {
			Color = Color3.fromRGB(255, 255, 255),
			Thickness = 2,
			ApplyStrokeMode = Enum.ApplyStrokeMode.Border,
		}),
	})
end
return {
	default = Button,
}
