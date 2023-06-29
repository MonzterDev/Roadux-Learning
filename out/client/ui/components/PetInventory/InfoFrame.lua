-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local _roact_hooked = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-hooked", "src")
local useEffect = _roact_hooked.useEffect
local useState = _roact_hooked.useState
local RoactRodux = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux", "src")
local _viewport_model = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "viewport-model", "src")
local CleanViewport = _viewport_model.CleanViewport
local GenerateViewport = _viewport_model.GenerateViewport
local Events = TS.import(script, script.Parent.Parent.Parent.Parent, "network").Events
local GetPetModel = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants", "Pets").GetPetModel
local function PetInfoFrame(props)
	local isEquipped = props.equipped
	local isLocked = props.locked
	local isRenaming, setIsRenaming = useState(false)
	local infoFrameRef = Roact.createRef()
	local viewportRef = Roact.createRef()
	local renameButtonRef = Roact.createRef()
	local renameTextBoxRef = Roact.createRef()
	local model = GetPetModel(props.pet)
	-- Have to use this because we can't use the hook before it is set
	useEffect(function()
		local viewport = viewportRef:getValue()
		if viewport then
			CleanViewport(viewport)
			GenerateViewport(viewport, model:Clone())
		end
	end)
	return Roact.createFragment({
		Info = Roact.createElement("Frame", {
			AnchorPoint = Vector2.new(0.5, 0),
			BackgroundColor3 = Color3.fromRGB(52, 126, 195),
			Position = UDim2.new(0.187, 0, 0.03, 0),
			Size = UDim2.new(0.342, 0, 0.8240000000000001, 0),
			Visible = props.pet ~= nil,
			[Roact.Ref] = infoFrameRef,
		}, {
			PetName = Roact.createElement("TextLabel", {
				AnchorPoint = Vector2.new(0.5, 0),
				BackgroundTransparency = 1,
				Font = Enum.Font.GothamBold,
				Position = UDim2.new(0.5, 0, 0.021, 0),
				Size = UDim2.new(0.9, 0, 0.067, 0),
				Text = props.name,
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
				Visible = not isRenaming,
			}),
			Roact.createElement("UICorner", {
				CornerRadius = UDim.new(0.025, 0),
			}),
			Roact.createElement("TextBox", {
				AnchorPoint = Vector2.new(0.5, 0),
				BackgroundTransparency = 1,
				Font = Enum.Font.Gotham,
				PlaceholderText = "Enter Name",
				Position = UDim2.new(0.5, 0, 0.021, 0),
				Size = UDim2.new(0.9, 0, 0.067, 0),
				Text = "",
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
				Visible = isRenaming,
				[Roact.Ref] = renameTextBoxRef,
				[Roact.Event.FocusLost] = function(enterPressed)
					local textBox = renameTextBoxRef:getValue()
					if not textBox then
						return nil
					end
					if enterPressed and (#textBox.Text > 1 and #textBox.Text < 25) then
						Events.renamePet(props.uuid, textBox.Text)
					end
					setIsRenaming(false)
					textBox.Text = ""
				end,
			}),
			Roact.createElement("ViewportFrame", {
				AnchorPoint = Vector2.new(0.5, 0),
				BackgroundTransparency = 1,
				Position = UDim2.new(0.5, 0, 0.109, 0),
				Size = UDim2.new(0.678, 0, 0.243, 0),
				[Roact.Ref] = viewportRef,
			}, {
				Lock = Roact.createElement("ImageButton", {
					BackgroundTransparency = 1,
					Image = if isLocked then "rbxassetid://12012052569" else "rbxassetid://12359088245",
					Position = UDim2.new(0.05, 0, 0.55, 0),
					ScaleType = Enum.ScaleType.Fit,
					Size = UDim2.new(0.15, 0, 0.4, 0),
					[Roact.Event.MouseButton1Click] = function()
						Events.petAction(props.uuid, if isLocked then "Unlock" else "Lock")
					end,
				}),
				Rename = Roact.createElement("ImageButton", {
					BackgroundTransparency = 1,
					Image = if isRenaming then "rbxassetid://11506037946" else "rbxassetid://12359393622",
					Position = UDim2.new(0.8200000000000001, 0, 0.55, 0),
					ScaleType = Enum.ScaleType.Fit,
					Size = UDim2.new(0.15, 0, 0.4, 0),
					[Roact.Event.MouseButton1Click] = function()
						return setIsRenaming(not isRenaming)
					end,
				}),
			}),
			Level = Roact.createElement("TextLabel", {
				AnchorPoint = Vector2.new(0.5, 0),
				BackgroundTransparency = 1,
				Font = Enum.Font.GothamBold,
				Position = UDim2.new(0.5, 0, 0.376, 0),
				Size = UDim2.new(0.678, 0, 0.051000000000000004, 0),
				Text = "Level 100",
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
				TextXAlignment = Enum.TextXAlignment.Left,
			}),
			ProgressBar = Roact.createElement("Frame", {
				BackgroundColor3 = Color3.fromRGB(26, 71, 108),
				Position = UDim2.new(0.161, 0, 0.447, 0),
				Size = UDim2.new(0.678, 0, 0.038, 0),
			}, {
				Roact.createElement("UICorner", {
					CornerRadius = UDim.new(0.3, 0),
				}),
				Amount = Roact.createElement("TextLabel", {
					AnchorPoint = Vector2.new(0, 0.5),
					BackgroundTransparency = 1,
					Font = Enum.Font.GothamBold,
					Position = UDim2.new(0.05, 0, 0.5, 0),
					Size = UDim2.new(0.9, 0, 0.8, 0),
					Text = "1,000/1,000",
					TextColor3 = Color3.fromRGB(255, 255, 255),
					TextScaled = true,
					TextSize = 14,
					TextStrokeTransparency = 0.66,
					TextWrapped = true,
					TextXAlignment = Enum.TextXAlignment.Left,
					ZIndex = 3,
				}),
				Progress = Roact.createElement("Frame", {
					BackgroundColor3 = Color3.fromRGB(74, 255, 249),
					Size = UDim2.new(0, 0, 1, 0),
					ZIndex = 2,
				}, {
					Roact.createElement("UICorner", {
						CornerRadius = UDim.new(0.3, 0),
					}),
				}),
			}),
			Stats = Roact.createElement("Frame", {
				AnchorPoint = Vector2.new(0.5, 0),
				BackgroundTransparency = 1,
				Position = UDim2.new(0.5, 0, 0.515, 0),
				Size = UDim2.new(0.9, 0, 0.225, 0),
			}, {
				Roact.createElement("UIGridLayout", {
					CellPadding = UDim2.new(0, 0, 0, 0),
					CellSize = UDim2.new(1, 0, 0.3, 0),
					SortOrder = Enum.SortOrder.LayoutOrder,
				}),
				Auto = Roact.createElement("Frame", {
					BackgroundTransparency = 1,
					Size = UDim2.new(0, 100, 0, 100),
				}, {
					Icon = Roact.createElement("ImageLabel", {
						BackgroundTransparency = 1,
						Image = "rbxassetid://11521634151",
						ScaleType = Enum.ScaleType.Fit,
						Size = UDim2.new(0.2, 0, 1, 0),
					}),
					Amount = Roact.createElement("TextLabel", {
						BackgroundTransparency = 1,
						Font = Enum.Font.GothamBold,
						Position = UDim2.new(0.25, 0, 0, 0),
						Size = UDim2.new(0.75, 0, 1, 0),
						Text = "+99.99M/sec",
						TextColor3 = Color3.fromRGB(255, 255, 255),
						TextScaled = true,
						TextSize = 14,
						TextWrapped = true,
						TextXAlignment = Enum.TextXAlignment.Left,
					}),
				}),
				Clicks = Roact.createElement("Frame", {
					BackgroundTransparency = 1,
					Size = UDim2.new(0, 100, 0, 100),
				}, {
					Amount = Roact.createElement("TextLabel", {
						BackgroundTransparency = 1,
						Font = Enum.Font.GothamBold,
						Position = UDim2.new(0.25, 0, 0, 0),
						Size = UDim2.new(0.75, 0, 1, 0),
						Text = "x100M",
						TextColor3 = Color3.fromRGB(247, 255, 166),
						TextScaled = true,
						TextSize = 14,
						TextWrapped = true,
						TextXAlignment = Enum.TextXAlignment.Left,
					}),
					Icon = Roact.createElement("ImageLabel", {
						BackgroundTransparency = 1,
						Image = "rbxassetid://11521633974",
						ScaleType = Enum.ScaleType.Fit,
						Size = UDim2.new(0.2, 0, 1, 0),
					}),
				}),
				Exists = Roact.createElement("Frame", {
					BackgroundTransparency = 1,
					Size = UDim2.new(0, 100, 0, 100),
				}, {
					Amount = Roact.createElement("TextLabel", {
						BackgroundTransparency = 1,
						Font = Enum.Font.GothamBold,
						Position = UDim2.new(0.25, 0, 0, 0),
						Size = UDim2.new(0.75, 0, 1, 0),
						Text = "999,999 Exist",
						TextColor3 = Color3.fromRGB(237, 191, 107),
						TextScaled = true,
						TextSize = 14,
						TextWrapped = true,
						TextXAlignment = Enum.TextXAlignment.Left,
					}),
					Icon = Roact.createElement("ImageLabel", {
						BackgroundTransparency = 1,
						Image = "rbxassetid://12359088568",
						ScaleType = Enum.ScaleType.Fit,
						Size = UDim2.new(0.2, 0, 1, 0),
					}),
				}),
			}),
			Buttons = Roact.createElement("Frame", {
				AnchorPoint = Vector2.new(0.5, 0),
				BackgroundTransparency = 1,
				Position = UDim2.new(0.5, 0, 0.738, 0),
				Size = UDim2.new(0.9, 0, 0.225, 0),
			}, {
				Roact.createElement("UIGridLayout", {
					CellPadding = UDim2.new(0, 0, 0.05, 0),
					CellSize = UDim2.new(1, 0, 0.3, 0),
					SortOrder = Enum.SortOrder.LayoutOrder,
				}),
				Equip = Roact.createElement("TextButton", {
					BackgroundColor3 = Color3.fromRGB(156, 98, 255),
					Font = Enum.Font.GothamBold,
					Size = UDim2.new(0, 200, 0, 50),
					Text = if isEquipped then "Unequip" else "Equip",
					TextColor3 = Color3.fromRGB(255, 255, 255),
					TextScaled = true,
					TextSize = 14,
					TextWrapped = true,
					[Roact.Event.MouseButton1Click] = function()
						if isEquipped then
							Events.petAction(props.uuid, "Unequip")
						else
							Events.petAction(props.uuid, "Equip")
						end
					end,
				}, {
					Roact.createElement("UICorner", {
						CornerRadius = UDim.new(0.35000000000000003, 0),
					}),
				}),
				Shiny = Roact.createElement("TextButton", {
					BackgroundColor3 = Color3.fromRGB(124, 124, 124),
					Font = Enum.Font.GothamBold,
					Size = UDim2.new(0, 200, 0, 50),
					Text = "Shiny (2/5)",
					TextColor3 = Color3.fromRGB(255, 255, 255),
					TextScaled = true,
					TextSize = 14,
					TextWrapped = true,
				}, {
					Roact.createElement("UICorner", {
						CornerRadius = UDim.new(0.35000000000000003, 0),
					}),
				}),
				Delete = Roact.createElement("TextButton", {
					BackgroundColor3 = Color3.fromRGB(219, 86, 86),
					Font = Enum.Font.GothamBold,
					Size = UDim2.new(0, 200, 0, 50),
					Text = "Delete",
					TextColor3 = Color3.fromRGB(255, 255, 255),
					TextScaled = true,
					TextSize = 14,
					TextWrapped = true,
					[Roact.Event.MouseButton1Click] = function()
						if not isLocked then
							Events.petAction(props.uuid, "Delete")
						end
					end,
				}, {
					Roact.createElement("UICorner", {
						CornerRadius = UDim.new(0.35000000000000003, 0),
					}),
				}),
			}),
		}),
	})
end
local function mapState(state, props)
	local pet = state.petInventory[props.uuid]
	if not pet then
		return {
			equipped = false,
			locked = false,
		}
	end
	local _object = {}
	local _left = "equipped"
	local _condition = pet.equipped
	if _condition == nil then
		_condition = false
	end
	_object[_left] = _condition
	local _left_1 = "locked"
	local _condition_1 = pet.locked
	if _condition_1 == nil then
		_condition_1 = false
	end
	_object[_left_1] = _condition_1
	return _object
end
local function mapDispatch(dispatch)
end
local default = RoactRodux.connect(mapState, mapDispatch)(PetInfoFrame)
return {
	default = default,
}
