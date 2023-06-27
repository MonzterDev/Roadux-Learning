-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local StoreProvider = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux-hooked", "src").StoreProvider
local clientStore = TS.import(script, script.Parent.Parent.Parent, "rodux", "rodux").clientStore
local SettingFrame = TS.import(script, script.Parent.Parent, "components", "Settings", "SettingFrame").default
local SettingsApp
do
	SettingsApp = Roact.Component:extend("SettingsApp")
	function SettingsApp:init(props)
	end
	function SettingsApp:render()
		return Roact.createElement(StoreProvider, {
			store = clientStore,
		}, {
			Roact.createElement("ScreenGui", {}, {
				Roact.createElement("Frame", {
					Size = UDim2.fromScale(0.3, 0.7),
					AnchorPoint = Vector2.new(0.5, 0.5),
					Position = UDim2.fromScale(0.5, 0.5),
					BackgroundColor3 = Color3.new(0.14, 0.14, 0.14),
				}, {
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
					Roact.createElement("ScrollingFrame", {
						Size = UDim2.fromScale(0.9, 0.85),
						AnchorPoint = Vector2.new(0.5, 0),
						Position = UDim2.fromScale(0.5, 0.115),
						BackgroundTransparency = 1,
						AutomaticCanvasSize = Enum.AutomaticSize.Y,
						VerticalScrollBarInset = Enum.ScrollBarInset.Always,
					}, {
						Roact.createElement("UIGridLayout", {
							CellSize = UDim2.fromScale(0.95, 0.25),
							HorizontalAlignment = "Center",
						}),
						Roact.createElement(SettingFrame, {
							setting = "Play Music",
						}),
						Roact.createElement(SettingFrame, {
							setting = "Combat",
						}),
					}),
				}),
			}),
		})
	end
end
return {
	SettingsApp = SettingsApp,
}
