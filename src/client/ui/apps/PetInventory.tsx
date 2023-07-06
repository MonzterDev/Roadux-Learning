import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import { clientStore } from "client/rodux/rodux";
import {
	PET_ACTION_BUTTONS,
	PetActionButton,
	PetInstance,
	PetInventory,
	getBestPets,
	getEquippedPets,
	getMaxPetsEquipped,
	getMaxPetsStored,
	getPetClicks,
} from "shared/constants/Pets";
import ActionButton from "../components/PetInventory/ActionButton";
import Object from "@rbxts/object-utils";
import PetButton from "../components/PetInventory/PetButton";
import PetInfoFrame from "../components/PetInventory/InfoFrame";
import { PlayerState } from "client/rodux/reducers";
import Rodux from "@rbxts/rodux";
import RoactRodux from "@rbxts/roact-rodux";
import { useEffect, useState } from "@rbxts/roact-hooked";
import { Events } from "client/network";

interface Props {
	pets: PetInstance[];
	selectedPet?: PetInstance;

	onClick: () => void;
}

function PetInventory(props: Props) {
	const [isTrashMode, setTrashMode] = useState(false);
	const [selectedPet, setSelectedPet] = useState<PetInstance>(undefined);
	const [searchString, setSearchString] = useState<string>("");
	const [petsToTrash, setPetsToTrash] = useState<string[]>([]);

	const searchBoxRef = Roact.createRef<TextBox>();

	const actionButtons = PET_ACTION_BUTTONS.map((action) => {
		return <ActionButton action={action} onClick={() => performAction(action)} />;
	});
	const petButtons = Object.values(props.pets)
		.sort((a, b) => {
			if (a.equipped && !b.equipped) return true;
			if (!a.equipped && b.equipped) return false;

			const aClicks = getPetClicks(a);
			const bClicks = getPetClicks(b);
			return aClicks > bClicks;
		})
		.map((pet, index) => {
			return (
				<PetButton
					pet={pet.type}
					uuid={pet.uuid}
					name={pet.name}
					rarity={pet.rarity}
					selectedToDelete={isTrashMode && petsToTrash.includes(pet.uuid)}
					onClick={() => {
						if (isTrashMode) {
							if (petsToTrash.includes(pet.uuid)) {
								const index = petsToTrash.indexOf(pet.uuid);
								petsToTrash.remove(index);
								setPetsToTrash([...petsToTrash]);
							} else setPetsToTrash([...petsToTrash, pet.uuid]);
						} else setSelectedPet(pet);
					}}
					layoutOrder={index}
				/>
			);
		});

	useEffect(() => {
		if (selectedPet) {
			const petInInventory = clientStore.getState().petInventory[selectedPet.uuid];
			if (!petInInventory) setSelectedPet(undefined);
		}
	});

	function performAction(action: PetActionButton) {
		switch (action) {
			case "Equip Best": {
				const bestPets = getBestPets(clientStore.getState());
				const equippedPets = getEquippedPets(clientStore.getState());

				for (const pet of equippedPets) {
					if (!bestPets.includes(pet.uuid)) Events.petAction(pet.uuid, "Unequip");
					else bestPets.remove(bestPets.indexOf(pet.uuid));
				}

				for (const uuid of bestPets) Events.petAction(uuid, "Equip");

				break;
			}
			case "Trash Mode":
				if (isTrashMode && petsToTrash.size() > 0) {
					for (const uuid of petsToTrash) Events.petAction(uuid, "Delete");
				}
				setTrashMode(!isTrashMode);
				break;
			case "Mass Delete":
				Events.deleteAllPets();
				break;
			case "Unequip All": {
				const equippedPets = getEquippedPets(clientStore.getState());
				for (const pet of equippedPets) Events.petAction(pet.uuid, "Unequip");
				break;
			}
		}
		if (isTrashMode && action !== "Trash Mode") {
			setTrashMode(false);
			setPetsToTrash([]);
		}
	}

	return (
		<StoreProvider store={clientStore}>
			<screengui Key="PetInventory" ResetOnSpawn={false} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
				<frame
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(39, 180, 255)}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(0.3, 0, 0.5, 0)}
				>
					<uiaspectratioconstraint AspectRatio={1.6620000000000001} />
					<uicorner CornerRadius={new UDim(0.025, 0)} />
					<textlabel
						Key="Title"
						AnchorPoint={new Vector2(0.5, 0)}
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBold}
						Position={new UDim2(0.5, 0, 0.021, 0)}
						Size={new UDim2(0.39, 0, 0.067, 0)}
						Text="Pets"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
					/>
					<frame
						Key="Holder"
						AnchorPoint={new Vector2(0.5, 0)}
						BackgroundColor3={Color3.fromRGB(52, 154, 205)}
						Position={new UDim2(0.5, 0, 0.20700000000000002, 0)}
						Size={new UDim2(0.97, 0, 0.768, 0)}
					>
						<uicorner CornerRadius={new UDim(0.025, 0)} />
						<frame
							Key="Buttons"
							AnchorPoint={new Vector2(0.5, 0)}
							BackgroundTransparency={1}
							Position={new UDim2(0.5, 0, 0.887, 0)}
							Size={new UDim2(0.966, 0, 0.1, 0)}
						>
							<uigridlayout
								CellPadding={new UDim2(0.015, 0, 0, 0)}
								CellSize={new UDim2(0.23500000000000001, 0, 1, 0)}
								HorizontalAlignment={Enum.HorizontalAlignment.Center}
								SortOrder={Enum.SortOrder.LayoutOrder}
								VerticalAlignment={Enum.VerticalAlignment.Center}
							/>

							{actionButtons}
						</frame>
						<scrollingframe
							Key="Container"
							Active={true}
							BackgroundTransparency={1}
							Position={new UDim2(0.373, 0, 0.03, 0)}
							ScrollBarImageColor3={Color3.fromRGB(222, 222, 222)}
							ScrollBarThickness={8}
							Size={new UDim2(0.615, 0, 0.8240000000000001, 0)}
							VerticalScrollBarInset={Enum.ScrollBarInset.Always}
						>
							{petButtons}

							<uigridlayout
								CellPadding={new UDim2(0.025, 0, 0.01, 0)}
								CellSize={new UDim2(0.225, 0, 0.125, 0)}
								HorizontalAlignment={Enum.HorizontalAlignment.Center}
								SortOrder={Enum.SortOrder.LayoutOrder}
							/>
						</scrollingframe>
						{!isTrashMode && selectedPet && (
							<PetInfoFrame
								pet={selectedPet.type}
								uuid={selectedPet.uuid}
								name={selectedPet.name}
								rarity={selectedPet.rarity}
							/>
						)}
					</frame>
					<textbutton
						Key="Exit"
						BackgroundColor3={Color3.fromRGB(255, 48, 21)}
						Font={Enum.Font.SourceSans}
						Position={new UDim2(0.927, 0, 0.028, 0)}
						Size={new UDim2(0.058, 0, 0.10300000000000001, 0)}
						Text={""}
						TextColor3={Color3.fromRGB(0, 0, 0)}
						TextSize={14}
						Event={{
							MouseButton1Click: props.onClick,
						}}
					>
						<uicorner CornerRadius={new UDim(0.1, 0)} />
						<textlabel
							Key="X"
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundTransparency={1}
							Font={Enum.Font.GothamBold}
							Position={new UDim2(0.5, 0, 0.5, 0)}
							Size={new UDim2(0.9500000000000001, 0, 0.9500000000000001, 0)}
							Text="X"
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextScaled={true}
							TextSize={14}
							TextWrapped={true}
						/>
					</textbutton>
					<frame
						Key="Search"
						AnchorPoint={new Vector2(0.5, 0)}
						BackgroundColor3={Color3.fromRGB(52, 154, 205)}
						Position={new UDim2(0.5, 0, 0.108, 0)}
						Size={new UDim2(0.276, 0, 0.066, 0)}
					>
						<uicorner CornerRadius={new UDim(0.15, 0)} />
						<textbox
							Key="Search"
							AnchorPoint={new Vector2(0.5, 0.5)}
							BackgroundTransparency={1}
							Font={Enum.Font.Gotham}
							PlaceholderColor3={Color3.fromRGB(177, 177, 177)}
							PlaceholderText="Search..."
							Position={new UDim2(0.5, 0, 0.5, 0)}
							Size={new UDim2(0.9, 0, 0.9, 0)}
							Text={""}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextScaled={true}
							TextSize={14}
							TextWrapped={true}
							TextXAlignment={Enum.TextXAlignment.Left}
							Ref={searchBoxRef}
							Change={{
								Text: (rbx) => setSearchString(rbx.Text),
							}}
						/>
					</frame>
					<frame
						Key="Storage"
						AnchorPoint={new Vector2(0.5, 0)}
						BackgroundTransparency={1}
						Position={new UDim2(0.167, 0, 0.031, 0)}
						Size={new UDim2(0.303, 0, 0.151, 0)}
					>
						<uilistlayout
							HorizontalAlignment={Enum.HorizontalAlignment.Center}
							Padding={new UDim(0.025, 0)}
							SortOrder={Enum.SortOrder.LayoutOrder}
						/>
						<frame Key="Equipped" BackgroundTransparency={1} Size={new UDim2(1, 0, 0.5, 0)}>
							<imagelabel
								Key="Icon"
								BackgroundTransparency={1}
								Image="rbxassetid://11506037408"
								ScaleType={Enum.ScaleType.Fit}
								Size={new UDim2(0.2, 0, 1, 0)}
							/>
							<textlabel
								Key="Amount"
								BackgroundTransparency={1}
								Font={Enum.Font.GothamBold}
								Position={new UDim2(0.21, 0, 0, 0)}
								Size={new UDim2(0.256, 0, 1, 0)}
								Text={
									getEquippedPets(clientStore.getState()).size() +
									"/" +
									getMaxPetsEquipped(clientStore.getState())
								}
								TextColor3={Color3.fromRGB(255, 255, 255)}
								TextScaled={true}
								TextSize={14}
								TextWrapped={true}
							/>
							<textbutton
								Key="Buy"
								BackgroundColor3={Color3.fromRGB(237, 33, 255)}
								Font={Enum.Font.GothamBold}
								Size={new UDim2(0.17500000000000002, 0, 1, 0)}
								Text="+"
								TextColor3={Color3.fromRGB(255, 255, 255)}
								TextScaled={true}
								TextSize={14}
								TextWrapped={true}
							>
								<uicorner CornerRadius={new UDim(0.25, 0)} />
							</textbutton>
							<uilistlayout
								FillDirection={Enum.FillDirection.Horizontal}
								Padding={new UDim(0.05, 0)}
								SortOrder={Enum.SortOrder.LayoutOrder}
								VerticalAlignment={Enum.VerticalAlignment.Center}
							/>
						</frame>
						<frame Key="Stored" BackgroundTransparency={1} Size={new UDim2(1, 0, 0.5, 0)}>
							<imagelabel
								Key="Icon"
								BackgroundTransparency={1}
								Image="rbxassetid://12359044800"
								ScaleType={Enum.ScaleType.Fit}
								Size={new UDim2(0.2, 0, 1, 0)}
							/>
							<textlabel
								Key="Amount"
								BackgroundTransparency={1}
								Font={Enum.Font.GothamBold}
								Position={new UDim2(0.21, 0, 0, 0)}
								Size={new UDim2(0.4, 0, 1, 0)}
								Text={
									Object.values(clientStore.getState().petInventory).size() +
									"/" +
									getMaxPetsStored(clientStore.getState())
								}
								TextColor3={Color3.fromRGB(255, 255, 255)}
								TextScaled={true}
								TextSize={14}
								TextWrapped={true}
							/>
							<textbutton
								Key="Buy"
								BackgroundColor3={Color3.fromRGB(237, 33, 255)}
								Font={Enum.Font.GothamBold}
								Size={new UDim2(0.17500000000000002, 0, 1, 0)}
								Text="+"
								TextColor3={Color3.fromRGB(255, 255, 255)}
								TextScaled={true}
								TextSize={14}
								TextWrapped={true}
							>
								<uicorner CornerRadius={new UDim(0.25, 0)} />
							</textbutton>
							<uilistlayout
								FillDirection={Enum.FillDirection.Horizontal}
								Padding={new UDim(0.05, 0)}
								SortOrder={Enum.SortOrder.LayoutOrder}
								VerticalAlignment={Enum.VerticalAlignment.Center}
							/>
						</frame>
					</frame>
				</frame>
			</screengui>
		</StoreProvider>
	);
}

function mapState(state: PlayerState, props: Props) {
	return {
		pets: Object.values(state.petInventory),
	};
}

function mapDispatch(dispatch: Rodux.Dispatch) {}

export default RoactRodux.connect(mapState, mapDispatch)(PetInventory);
