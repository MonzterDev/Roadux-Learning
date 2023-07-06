import Roact from "@rbxts/roact";
import { useEffect, useState, withHooks, withHooksPure } from "@rbxts/roact-hooked";
import { useSelector } from "@rbxts/roact-rodux-hooked";
import Rodux from "@rbxts/rodux";
import { CleanViewport, GenerateViewport } from "@rbxts/viewport-model";
import { Events } from "client/network";
import { PlayerState } from "client/rodux/reducers";
import { GetPetModel, Pet, Rarity, createPetInstance, getPetClicks } from "shared/constants/Pets";

interface Props {
	uuid: string;
}

function PetInfoFrame(props: Props) {
	const petState = useSelector((state: PlayerState) => state.petInventory[props.uuid]);

	const [isRenaming, setIsRenaming] = useState(false);

	const infoFrameRef = Roact.createRef<Frame>();
	const viewportRef = Roact.createRef<ViewportFrame>();
	const renameButtonRef = Roact.createRef<ImageButton>();
	const renameTextBoxRef = Roact.createRef<TextBox>();

	const instance = createPetInstance({
		name: petState.name,
		type: petState.type,
		uuid: props.uuid,
		rarity: petState.rarity,
		equipped: petState.equipped,
		locked: petState.locked,
	});

	const model = GetPetModel(petState.type);

	// Have to use this because we can't use the hook before it is set
	useEffect(() => {
		const viewport = viewportRef.getValue();
		if (viewport) {
			CleanViewport(viewport);
			GenerateViewport(viewport, model.Clone());
		}
	}, [viewportRef, model]);

	return (
		<frame
			Key="Info"
			AnchorPoint={new Vector2(0.5, 0)}
			BackgroundColor3={Color3.fromRGB(52, 126, 195)}
			Position={new UDim2(0.187, 0, 0.03, 0)}
			Size={new UDim2(0.342, 0, 0.8240000000000001, 0)}
			Visible={petState.type !== undefined}
			Ref={infoFrameRef}
		>
			<textlabel
				Key="PetName"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0.5, 0, 0.021, 0)}
				Size={new UDim2(0.9, 0, 0.067, 0)}
				Text={petState.name}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				Visible={!isRenaming}
			/>
			<uicorner CornerRadius={new UDim(0.025, 0)} />
			<textbox
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.Gotham}
				PlaceholderText="Enter Name"
				Position={new UDim2(0.5, 0, 0.021, 0)}
				Size={new UDim2(0.9, 0, 0.067, 0)}
				Text={""}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				Visible={isRenaming}
				Ref={renameTextBoxRef}
				Event={{
					FocusLost: (enterPressed) => {
						const textBox = renameTextBoxRef.getValue();
						if (!textBox) return;

						if (enterPressed && textBox.Text.size() > 1 && textBox.Text.size() < 25)
							Events.renamePet(props.uuid, textBox.Text);

						setIsRenaming(false);
						textBox.Text = "";
					},
				}}
			/>
			<viewportframe
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.109, 0)}
				Size={new UDim2(0.678, 0, 0.243, 0)}
				Ref={viewportRef}
			>
				<imagebutton
					Key="Lock"
					BackgroundTransparency={1}
					Image={petState.locked ? "rbxassetid://12012052569" : "rbxassetid://12359088245"}
					Position={new UDim2(0.05, 0, 0.55, 0)}
					ScaleType={Enum.ScaleType.Fit}
					Size={new UDim2(0.15, 0, 0.4, 0)}
					Event={{
						MouseButton1Click: () => {
							Events.petAction(props.uuid, petState.locked ? "Unlock" : "Lock");
						},
					}}
				/>
				<imagebutton
					Key="Rename"
					BackgroundTransparency={1}
					Image={isRenaming ? "rbxassetid://11506037946" : "rbxassetid://12359393622"}
					Position={new UDim2(0.8200000000000001, 0, 0.55, 0)}
					ScaleType={Enum.ScaleType.Fit}
					Size={new UDim2(0.15, 0, 0.4, 0)}
					Event={{
						MouseButton1Click: () => setIsRenaming(!isRenaming),
					}}
				/>
			</viewportframe>
			<textlabel
				Key="Level"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0.5, 0, 0.376, 0)}
				Size={new UDim2(0.678, 0, 0.051000000000000004, 0)}
				Text="Level 100"
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
			<frame
				Key="ProgressBar"
				BackgroundColor3={Color3.fromRGB(26, 71, 108)}
				Position={new UDim2(0.161, 0, 0.447, 0)}
				Size={new UDim2(0.678, 0, 0.038, 0)}
			>
				<uicorner CornerRadius={new UDim(0.3, 0)} />
				<textlabel
					Key="Amount"
					AnchorPoint={new Vector2(0, 0.5)}
					BackgroundTransparency={1}
					Font={Enum.Font.GothamBold}
					Position={new UDim2(0.05, 0, 0.5, 0)}
					Size={new UDim2(0.9, 0, 0.8, 0)}
					Text="1,000/1,000"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextStrokeTransparency={0.66}
					TextWrapped={true}
					TextXAlignment={Enum.TextXAlignment.Left}
					ZIndex={3}
				/>
				<frame
					Key="Progress"
					BackgroundColor3={Color3.fromRGB(74, 255, 249)}
					Size={new UDim2(0, 0, 1, 0)}
					ZIndex={2}
				>
					<uicorner CornerRadius={new UDim(0.3, 0)} />
				</frame>
			</frame>
			<frame
				Key="Stats"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.515, 0)}
				Size={new UDim2(0.9, 0, 0.225, 0)}
			>
				<uigridlayout
					CellPadding={new UDim2(0, 0, 0, 0)}
					CellSize={new UDim2(1, 0, 0.3, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				<frame Key="Auto" BackgroundTransparency={1} Size={new UDim2(0, 100, 0, 100)}>
					<imagelabel
						Key="Icon"
						BackgroundTransparency={1}
						Image="rbxassetid://11521634151"
						ScaleType={Enum.ScaleType.Fit}
						Size={new UDim2(0.2, 0, 1, 0)}
					/>
					<textlabel
						Key="Amount"
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBold}
						Position={new UDim2(0.25, 0, 0, 0)}
						Size={new UDim2(0.75, 0, 1, 0)}
						Text="+99.99M/sec"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
				</frame>
				<frame Key="Clicks" BackgroundTransparency={1} Size={new UDim2(0, 100, 0, 100)}>
					<textlabel
						Key="Amount"
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBold}
						Position={new UDim2(0.25, 0, 0, 0)}
						Size={new UDim2(0.75, 0, 1, 0)}
						Text={tostring(getPetClicks(instance))}
						TextColor3={Color3.fromRGB(247, 255, 166)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
					<imagelabel
						Key="Icon"
						BackgroundTransparency={1}
						Image="rbxassetid://11521633974"
						ScaleType={Enum.ScaleType.Fit}
						Size={new UDim2(0.2, 0, 1, 0)}
					/>
				</frame>
				<frame Key="Exists" BackgroundTransparency={1} Size={new UDim2(0, 100, 0, 100)}>
					<textlabel
						Key="Amount"
						BackgroundTransparency={1}
						Font={Enum.Font.GothamBold}
						Position={new UDim2(0.25, 0, 0, 0)}
						Size={new UDim2(0.75, 0, 1, 0)}
						Text="999,999 Exist"
						TextColor3={Color3.fromRGB(237, 191, 107)}
						TextScaled={true}
						TextSize={14}
						TextWrapped={true}
						TextXAlignment={Enum.TextXAlignment.Left}
					/>
					<imagelabel
						Key="Icon"
						BackgroundTransparency={1}
						Image="rbxassetid://12359088568"
						ScaleType={Enum.ScaleType.Fit}
						Size={new UDim2(0.2, 0, 1, 0)}
					/>
				</frame>
			</frame>
			<frame
				Key="Buttons"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.738, 0)}
				Size={new UDim2(0.9, 0, 0.225, 0)}
			>
				<uigridlayout
					CellPadding={new UDim2(0, 0, 0.05, 0)}
					CellSize={new UDim2(1, 0, 0.3, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
				/>
				<textbutton
					Key="Equip"
					BackgroundColor3={Color3.fromRGB(156, 98, 255)}
					Font={Enum.Font.GothamBold}
					Size={new UDim2(0, 200, 0, 50)}
					Text={petState.equipped ? "Unequip" : "Equip"}
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					Event={{
						MouseButton1Click: () => {
							if (petState.equipped) Events.petAction(props.uuid, "Unequip");
							else Events.petAction(props.uuid, "Equip");
						},
					}}
				>
					<uicorner CornerRadius={new UDim(0.35000000000000003, 0)} />
				</textbutton>
				<textbutton
					Key="Shiny"
					BackgroundColor3={Color3.fromRGB(124, 124, 124)}
					Font={Enum.Font.GothamBold}
					Size={new UDim2(0, 200, 0, 50)}
					Text="Shiny (2/5)"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
				>
					<uicorner CornerRadius={new UDim(0.35000000000000003, 0)} />
				</textbutton>
				<textbutton
					Key="Delete"
					BackgroundColor3={Color3.fromRGB(219, 86, 86)}
					Font={Enum.Font.GothamBold}
					Size={new UDim2(0, 200, 0, 50)}
					Text="Delete"
					TextColor3={Color3.fromRGB(255, 255, 255)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
					Event={{
						MouseButton1Click: () => {
							if (!petState.locked) Events.petAction(props.uuid, "Delete");
						},
					}}
				>
					<uicorner CornerRadius={new UDim(0.35000000000000003, 0)} />
				</textbutton>
			</frame>
		</frame>
	);
}

export default withHooksPure(PetInfoFrame);
