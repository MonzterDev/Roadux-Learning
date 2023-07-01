-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local useEffect = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-hooked", "src").useEffect
local RoactRodux = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux", "src")
local GenerateViewport = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "viewport-model", "src").GenerateViewport
local _Pets = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants", "Pets")
local GetPetModel = _Pets.GetPetModel
local createPetInstance = _Pets.createPetInstance
local getPetClicks = _Pets.getPetClicks
local function PetButton(props)
	local isEquipped = props.equipped
	local viewportRef = Roact.createRef()
	local model = GetPetModel(props.pet)
	-- Have to use this because we can't use the hook before it is set
	useEffect(function()
		local viewport = viewportRef:getValue()
		local _result = viewport
		if _result ~= nil then
			_result = _result:FindFirstChildOfClass("Model")
		end
		if not _result then
			GenerateViewport(viewportRef:getValue(), model:Clone())
		end
	end)
	return Roact.createFragment({
		[props.uuid] = Roact.createElement("TextButton", {
			BackgroundColor3 = Color3.fromRGB(0, 179, 255),
			Font = Enum.Font.SourceSans,
			Size = UDim2.new(0, 200, 0, 50),
			Text = "",
			TextColor3 = Color3.fromRGB(0, 0, 0),
			TextSize = 14,
			Visible = props.visible,
			[Roact.Event.MouseButton1Click] = props.onClick,
			LayoutOrder = props.layoutOrder,
		}, {
			Roact.createElement("UICorner", {
				CornerRadius = UDim.new(0.1, 0),
			}),
			PetName = Roact.createElement("TextLabel", {
				AnchorPoint = Vector2.new(0.5, 0),
				BackgroundTransparency = 1,
				Font = Enum.Font.GothamBold,
				Position = UDim2.new(0.5, 0, 0.021, 0),
				Size = UDim2.new(0.9, 0, 0.2, 0),
				Text = props.name,
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
				ZIndex = 2,
			}),
			Clicks = Roact.createElement("TextLabel", {
				AnchorPoint = Vector2.new(0.5, 0),
				BackgroundTransparency = 1,
				Font = Enum.Font.GothamBold,
				Position = UDim2.new(0.5, 0, 0.687, 0),
				Size = UDim2.new(0.9, 0, 0.313, 0),
				Text = tostring(getPetClicks(createPetInstance({
					uuid = props.uuid,
					type = props.pet,
					name = props.name,
					rarity = props.rarity,
					equipped = isEquipped,
				}))),
				TextColor3 = Color3.fromRGB(255, 255, 127),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
				ZIndex = 2,
			}),
			Roact.createElement("ViewportFrame", {
				AnchorPoint = Vector2.new(0.5, 0.5),
				BackgroundTransparency = 1,
				Position = UDim2.new(0.5, 0, 0.5, 0),
				Size = UDim2.new(0.85, 0, 0.85, 0),
				[Roact.Ref] = viewportRef,
			}),
			Equipped = Roact.createElement("ImageLabel", {
				BackgroundTransparency = 1,
				Image = "rbxassetid://12115454539",
				ScaleType = Enum.ScaleType.Fit,
				Size = UDim2.new(0.2, 0, 0.2, 0),
				ZIndex = 3,
				Visible = isEquipped,
			}),
			Selected = Roact.createElement("TextLabel", {
				AnchorPoint = Vector2.new(0.5, 0.5),
				BackgroundTransparency = 1,
				Font = Enum.Font.GothamBold,
				Position = UDim2.new(0.5, 0, 0.5, 0),
				Size = UDim2.new(0.75, 0, 0.75, 0),
				Text = "X",
				TextColor3 = Color3.fromRGB(255, 0, 0),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
				Visible = false,
				ZIndex = 2,
			}),
		}),
	})
end
local function mapState(state, props)
	local pet = state.petInventory[props.uuid]
	local _object = {}
	local _left = "equipped"
	local _condition = pet.equipped
	if _condition == nil then
		_condition = false
	end
	_object[_left] = _condition
	return _object
end
local function mapDispatch(dispatch)
end
local default = RoactRodux.connect(mapState, mapDispatch)(PetButton)
return {
	default = default,
}
