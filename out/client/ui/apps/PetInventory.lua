-- Compiled with roblox-ts v2.1.0
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local Roact = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact", "src")
local StoreProvider = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux-hooked", "src").StoreProvider
local clientStore = TS.import(script, script.Parent.Parent.Parent, "rodux", "rodux").clientStore
local _Pets = TS.import(script, game:GetService("ReplicatedStorage"), "TS", "constants", "Pets")
local PET_ACTION_BUTTONS = _Pets.PET_ACTION_BUTTONS
local getBestPets = _Pets.getBestPets
local getEquippedPets = _Pets.getEquippedPets
local getMaxPetsEquipped = _Pets.getMaxPetsEquipped
local getMaxPetsStored = _Pets.getMaxPetsStored
local getPetClicks = _Pets.getPetClicks
local ActionButton = TS.import(script, script.Parent.Parent, "components", "PetInventory", "ActionButton").default
local Object = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "object-utils")
local PetButton = TS.import(script, script.Parent.Parent, "components", "PetInventory", "PetButton").default
local PetInfoFrame = TS.import(script, script.Parent.Parent, "components", "PetInventory", "InfoFrame").default
local RoactRodux = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-rodux", "src")
local _roact_hooked = TS.import(script, game:GetService("ReplicatedStorage"), "rbxts_include", "node_modules", "@rbxts", "roact-hooked", "src")
local useEffect = _roact_hooked.useEffect
local useState = _roact_hooked.useState
local Events = TS.import(script, script.Parent.Parent.Parent, "network").Events
local function PetInventory(props)
	local isTrashMode, setTrashMode = useState(false)
	local selectedPet, setSelectedPet = useState(nil)
	local searchString, setSearchString = useState("")
	local petsToTrash, setPetsToTrash = useState({})
	local searchBoxRef = Roact.createRef()
	local performAction
	local _arg0 = function(action)
		return Roact.createElement(ActionButton, {
			action = action,
			onClick = function()
				return performAction(action)
			end,
		})
	end
	-- ▼ ReadonlyArray.map ▼
	local _newValue = table.create(#PET_ACTION_BUTTONS)
	for _k, _v in PET_ACTION_BUTTONS do
		_newValue[_k] = _arg0(_v, _k - 1, PET_ACTION_BUTTONS)
	end
	-- ▲ ReadonlyArray.map ▲
	local actionButtons = _newValue
	local _exp = Object.values(props.pets)
	local _arg0_1 = function(a, b)
		if a.equipped and not b.equipped then
			return true
		end
		if not a.equipped and b.equipped then
			return false
		end
		local aClicks = getPetClicks(a)
		local bClicks = getPetClicks(b)
		return aClicks > bClicks
	end
	table.sort(_exp, _arg0_1)
	local _arg0_2 = function(pet, index)
		local _attributes = {
			pet = pet.type,
			uuid = pet.uuid,
			name = pet.name,
			rarity = pet.rarity,
		}
		local _condition = isTrashMode
		if _condition then
			local _uuid = pet.uuid
			_condition = table.find(petsToTrash, _uuid) ~= nil
		end
		_attributes.selectedToDelete = _condition
		local _exp_1 = string.lower(pet.name)
		local _arg0_3 = string.lower(searchString)
		local _condition_1 = (string.find(_exp_1, _arg0_3)) ~= nil
		if not _condition_1 then
			local _exp_2 = string.lower(pet.type)
			local _arg0_4 = string.lower(searchString)
			_condition_1 = (string.find(_exp_2, _arg0_4)) ~= nil
			if not _condition_1 then
				_condition_1 = string.lower(searchString) == ""
			end
		end
		_attributes.visible = _condition_1
		_attributes.onClick = function()
			if isTrashMode then
				local _uuid = pet.uuid
				if table.find(petsToTrash, _uuid) ~= nil then
					local _uuid_1 = pet.uuid
					local index = (table.find(petsToTrash, _uuid_1) or 0) - 1
					table.remove(petsToTrash, index + 1)
					local _array = {}
					local _length = #_array
					table.move(petsToTrash, 1, #petsToTrash, _length + 1, _array)
					setPetsToTrash(_array)
				else
					local _array = {}
					local _length = #_array
					local _petsToTrashLength = #petsToTrash
					table.move(petsToTrash, 1, _petsToTrashLength, _length + 1, _array)
					_length += _petsToTrashLength
					_array[_length + 1] = pet.uuid
					setPetsToTrash(_array)
				end
			else
				setSelectedPet(pet)
			end
		end
		_attributes.layoutOrder = index
		return Roact.createElement(PetButton, _attributes)
	end
	-- ▼ ReadonlyArray.map ▼
	local _newValue_1 = table.create(#_exp)
	for _k, _v in _exp do
		_newValue_1[_k] = _arg0_2(_v, _k - 1, _exp)
	end
	-- ▲ ReadonlyArray.map ▲
	local petButtons = _newValue_1
	useEffect(function()
		if selectedPet then
			local petInInventory = clientStore:getState().petInventory[selectedPet.uuid]
			if not petInInventory then
				setSelectedPet(nil)
			end
		end
	end)
	function performAction(action)
		repeat
			if action == "Equip Best" then
				local bestPets = getBestPets(clientStore:getState())
				local equippedPets = getEquippedPets(clientStore:getState())
				for _, pet in equippedPets do
					local _uuid = pet.uuid
					if not (table.find(bestPets, _uuid) ~= nil) then
						Events.petAction(pet.uuid, "Unequip")
					else
						local _uuid_1 = pet.uuid
						local _arg0_3 = (table.find(bestPets, _uuid_1) or 0) - 1
						table.remove(bestPets, _arg0_3 + 1)
					end
				end
				for _, uuid in bestPets do
					Events.petAction(uuid, "Equip")
				end
				break
			end
			if action == "Trash Mode" then
				if isTrashMode and #petsToTrash > 0 then
					for _, uuid in petsToTrash do
						Events.petAction(uuid, "Delete")
					end
				end
				setTrashMode(not isTrashMode)
				break
			end
			if action == "Mass Delete" then
				break
			end
			if action == "Unequip All" then
				local equippedPets = getEquippedPets(clientStore:getState())
				for _, pet in equippedPets do
					Events.petAction(pet.uuid, "Unequip")
				end
				break
			end
		until true
		if isTrashMode and action ~= "Trash Mode" then
			setTrashMode(false)
			setPetsToTrash({})
		end
	end
	local _attributes = {
		store = clientStore,
	}
	local _children = {}
	local _length = #_children
	local _attributes_1 = {
		ResetOnSpawn = false,
		ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
	}
	local _children_1 = {}
	local _length_1 = #_children_1
	local _attributes_2 = {
		AnchorPoint = Vector2.new(0.5, 0.5),
		BackgroundColor3 = Color3.fromRGB(39, 180, 255),
		Position = UDim2.new(0.5, 0, 0.5, 0),
		Size = UDim2.new(0.3, 0, 0.5, 0),
	}
	local _children_2 = {
		Roact.createElement("UIAspectRatioConstraint", {
			AspectRatio = 1.6620000000000001,
		}),
		Roact.createElement("UICorner", {
			CornerRadius = UDim.new(0.025, 0),
		}),
		Title = Roact.createElement("TextLabel", {
			AnchorPoint = Vector2.new(0.5, 0),
			BackgroundTransparency = 1,
			Font = Enum.Font.GothamBold,
			Position = UDim2.new(0.5, 0, 0.021, 0),
			Size = UDim2.new(0.39, 0, 0.067, 0),
			Text = "Pets",
			TextColor3 = Color3.fromRGB(255, 255, 255),
			TextScaled = true,
			TextSize = 14,
			TextWrapped = true,
		}),
	}
	local _length_2 = #_children_2
	local _attributes_3 = {
		AnchorPoint = Vector2.new(0.5, 0),
		BackgroundColor3 = Color3.fromRGB(52, 154, 205),
		Position = UDim2.new(0.5, 0, 0.20700000000000002, 0),
		Size = UDim2.new(0.97, 0, 0.768, 0),
	}
	local _children_3 = {
		Roact.createElement("UICorner", {
			CornerRadius = UDim.new(0.025, 0),
		}),
	}
	local _length_3 = #_children_3
	local _attributes_4 = {
		AnchorPoint = Vector2.new(0.5, 0),
		BackgroundTransparency = 1,
		Position = UDim2.new(0.5, 0, 0.887, 0),
		Size = UDim2.new(0.966, 0, 0.1, 0),
	}
	local _children_4 = {
		Roact.createElement("UIGridLayout", {
			CellPadding = UDim2.new(0.015, 0, 0, 0),
			CellSize = UDim2.new(0.23500000000000001, 0, 1, 0),
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			SortOrder = Enum.SortOrder.LayoutOrder,
			VerticalAlignment = Enum.VerticalAlignment.Center,
		}),
	}
	local _length_4 = #_children_4
	for _k, _v in actionButtons do
		_children_4[_length_4 + _k] = _v
	end
	_children_3.Buttons = Roact.createElement("Frame", _attributes_4, _children_4)
	local _attributes_5 = {
		Active = true,
		BackgroundTransparency = 1,
		Position = UDim2.new(0.373, 0, 0.03, 0),
		ScrollBarImageColor3 = Color3.fromRGB(222, 222, 222),
		ScrollBarThickness = 8,
		Size = UDim2.new(0.615, 0, 0.8240000000000001, 0),
		VerticalScrollBarInset = Enum.ScrollBarInset.Always,
	}
	local _children_5 = {}
	local _length_5 = #_children_5
	for _k, _v in petButtons do
		_children_5[_length_5 + _k] = _v
	end
	_length_5 = #_children_5
	_children_5[_length_5 + 1] = Roact.createElement("UIGridLayout", {
		CellPadding = UDim2.new(0.025, 0, 0.01, 0),
		CellSize = UDim2.new(0.225, 0, 0.125, 0),
		HorizontalAlignment = Enum.HorizontalAlignment.Center,
		SortOrder = Enum.SortOrder.LayoutOrder,
	})
	_children_3.Container = Roact.createElement("ScrollingFrame", _attributes_5, _children_5)
	local _child = not isTrashMode and (selectedPet and (Roact.createElement(PetInfoFrame, {
		pet = selectedPet.type,
		uuid = selectedPet.uuid,
		name = selectedPet.name,
		rarity = selectedPet.rarity,
	})))
	if _child then
		_children_3[_length_3 + 1] = _child
	end
	_children_2.Holder = Roact.createElement("Frame", _attributes_3, _children_3)
	_children_2.Exit = Roact.createElement("TextButton", {
		BackgroundColor3 = Color3.fromRGB(255, 48, 21),
		Font = Enum.Font.SourceSans,
		Position = UDim2.new(0.927, 0, 0.028, 0),
		Size = UDim2.new(0.058, 0, 0.10300000000000001, 0),
		Text = "",
		TextColor3 = Color3.fromRGB(0, 0, 0),
		TextSize = 14,
		[Roact.Event.MouseButton1Click] = props.onClick,
	}, {
		Roact.createElement("UICorner", {
			CornerRadius = UDim.new(0.1, 0),
		}),
		X = Roact.createElement("TextLabel", {
			AnchorPoint = Vector2.new(0.5, 0.5),
			BackgroundTransparency = 1,
			Font = Enum.Font.GothamBold,
			Position = UDim2.new(0.5, 0, 0.5, 0),
			Size = UDim2.new(0.9500000000000001, 0, 0.9500000000000001, 0),
			Text = "X",
			TextColor3 = Color3.fromRGB(255, 255, 255),
			TextScaled = true,
			TextSize = 14,
			TextWrapped = true,
		}),
	})
	_children_2.Search = Roact.createElement("Frame", {
		AnchorPoint = Vector2.new(0.5, 0),
		BackgroundColor3 = Color3.fromRGB(52, 154, 205),
		Position = UDim2.new(0.5, 0, 0.108, 0),
		Size = UDim2.new(0.276, 0, 0.066, 0),
	}, {
		Roact.createElement("UICorner", {
			CornerRadius = UDim.new(0.15, 0),
		}),
		Search = Roact.createElement("TextBox", {
			AnchorPoint = Vector2.new(0.5, 0.5),
			BackgroundTransparency = 1,
			Font = Enum.Font.Gotham,
			PlaceholderColor3 = Color3.fromRGB(177, 177, 177),
			PlaceholderText = "Search...",
			Position = UDim2.new(0.5, 0, 0.5, 0),
			Size = UDim2.new(0.9, 0, 0.9, 0),
			Text = "",
			TextColor3 = Color3.fromRGB(255, 255, 255),
			TextScaled = true,
			TextSize = 14,
			TextWrapped = true,
			TextXAlignment = Enum.TextXAlignment.Left,
			[Roact.Ref] = searchBoxRef,
			[Roact.Change.Text] = function(rbx)
				return setSearchString(rbx.Text)
			end,
		}),
	})
	_children_2.Storage = Roact.createElement("Frame", {
		AnchorPoint = Vector2.new(0.5, 0),
		BackgroundTransparency = 1,
		Position = UDim2.new(0.167, 0, 0.031, 0),
		Size = UDim2.new(0.303, 0, 0.151, 0),
	}, {
		Roact.createElement("UIListLayout", {
			HorizontalAlignment = Enum.HorizontalAlignment.Center,
			Padding = UDim.new(0.025, 0),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}),
		Equipped = Roact.createElement("Frame", {
			BackgroundTransparency = 1,
			Size = UDim2.new(1, 0, 0.5, 0),
		}, {
			Icon = Roact.createElement("ImageLabel", {
				BackgroundTransparency = 1,
				Image = "rbxassetid://11506037408",
				ScaleType = Enum.ScaleType.Fit,
				Size = UDim2.new(0.2, 0, 1, 0),
			}),
			Amount = Roact.createElement("TextLabel", {
				BackgroundTransparency = 1,
				Font = Enum.Font.GothamBold,
				Position = UDim2.new(0.21, 0, 0, 0),
				Size = UDim2.new(0.256, 0, 1, 0),
				Text = tostring(#getEquippedPets(clientStore:getState())) .. "/" .. tostring(getMaxPetsEquipped(clientStore:getState())),
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
			}),
			Buy = Roact.createElement("TextButton", {
				BackgroundColor3 = Color3.fromRGB(237, 33, 255),
				Font = Enum.Font.GothamBold,
				Size = UDim2.new(0.17500000000000002, 0, 1, 0),
				Text = "+",
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
			}, {
				Roact.createElement("UICorner", {
					CornerRadius = UDim.new(0.25, 0),
				}),
			}),
			Roact.createElement("UIListLayout", {
				FillDirection = Enum.FillDirection.Horizontal,
				Padding = UDim.new(0.05, 0),
				SortOrder = Enum.SortOrder.LayoutOrder,
				VerticalAlignment = Enum.VerticalAlignment.Center,
			}),
		}),
		Stored = Roact.createElement("Frame", {
			BackgroundTransparency = 1,
			Size = UDim2.new(1, 0, 0.5, 0),
		}, {
			Icon = Roact.createElement("ImageLabel", {
				BackgroundTransparency = 1,
				Image = "rbxassetid://12359044800",
				ScaleType = Enum.ScaleType.Fit,
				Size = UDim2.new(0.2, 0, 1, 0),
			}),
			Amount = Roact.createElement("TextLabel", {
				BackgroundTransparency = 1,
				Font = Enum.Font.GothamBold,
				Position = UDim2.new(0.21, 0, 0, 0),
				Size = UDim2.new(0.4, 0, 1, 0),
				Text = tostring(#Object.values(clientStore:getState().petInventory)) .. "/" .. tostring(getMaxPetsStored(clientStore:getState())),
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
			}),
			Buy = Roact.createElement("TextButton", {
				BackgroundColor3 = Color3.fromRGB(237, 33, 255),
				Font = Enum.Font.GothamBold,
				Size = UDim2.new(0.17500000000000002, 0, 1, 0),
				Text = "+",
				TextColor3 = Color3.fromRGB(255, 255, 255),
				TextScaled = true,
				TextSize = 14,
				TextWrapped = true,
			}, {
				Roact.createElement("UICorner", {
					CornerRadius = UDim.new(0.25, 0),
				}),
			}),
			Roact.createElement("UIListLayout", {
				FillDirection = Enum.FillDirection.Horizontal,
				Padding = UDim.new(0.05, 0),
				SortOrder = Enum.SortOrder.LayoutOrder,
				VerticalAlignment = Enum.VerticalAlignment.Center,
			}),
		}),
	})
	_children_1[_length_1 + 1] = Roact.createElement("Frame", _attributes_2, _children_2)
	_children.PetInventory = Roact.createElement("ScreenGui", _attributes_1, _children_1)
	return Roact.createElement(StoreProvider, _attributes, _children)
end
local function mapState(state, props)
	return {
		pets = Object.values(state.petInventory),
	}
end
local function mapDispatch(dispatch)
end
local default = RoactRodux.connect(mapState, mapDispatch)(PetInventory)
return {
	default = default,
}
