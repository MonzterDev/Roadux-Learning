import Roact from "@rbxts/roact";
import { useEffect, withHooks } from "@rbxts/roact-hooked";
import { useSelector } from "@rbxts/roact-rodux-hooked";
import Rodux from "@rbxts/rodux";
import { GenerateViewport } from "@rbxts/viewport-model";
import { PlayerState } from "client/rodux/reducers";
import { GetPetModel, Pet, Rarity, createPetInstance, getPetClicks } from "shared/constants/Pets";

interface Props {
	uuid: string;

	selectedToDelete: boolean;

	visible: boolean;
	layoutOrder: number;

	onClick: () => void;
}

function PetButton(props: Props) {
	const petState = useSelector((state: PlayerState) => state.petInventory[props.uuid]);

	const viewportRef = Roact.createRef<ViewportFrame>();

	const model = GetPetModel(petState.type);

	// Have to use this because we can't use the hook before it is set
	useEffect(() => {
		const viewport = viewportRef.getValue();
		if (!viewport?.FindFirstChildOfClass("Model")) {
			GenerateViewport(viewportRef.getValue()!, model.Clone());
		}
	});

	return (
		<textbutton
			Key={props.uuid}
			BackgroundColor3={Color3.fromRGB(0, 179, 255)}
			Font={Enum.Font.SourceSans}
			Size={new UDim2(0, 200, 0, 50)}
			Text={""}
			TextColor3={Color3.fromRGB(0, 0, 0)}
			TextSize={14}
			Visible={props.visible}
			Event={{ MouseButton1Click: props.onClick }}
			LayoutOrder={props.layoutOrder}
		>
			<uicorner CornerRadius={new UDim(0.1, 0)} />
			<textlabel
				Key="PetName"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0.5, 0, 0.021, 0)}
				Size={new UDim2(0.9, 0, 0.2, 0)}
				Text={petState.name}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				ZIndex={2}
			/>
			<textlabel
				Key="Clicks"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0.5, 0, 0.687, 0)}
				Size={new UDim2(0.9, 0, 0.313, 0)}
				Text={tostring(
					getPetClicks(
						createPetInstance({
							uuid: props.uuid,
							type: petState.type,
							name: petState.name,
							rarity: petState.rarity,
							equipped: petState.equipped,
						}),
					),
				)}
				TextColor3={Color3.fromRGB(255, 255, 127)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				ZIndex={2}
			/>
			<viewportframe
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0.85, 0, 0.85, 0)}
				Ref={viewportRef}
			/>
			<imagelabel
				Key="Equipped"
				BackgroundTransparency={1}
				Image="rbxassetid://12115454539"
				ScaleType={Enum.ScaleType.Fit}
				Size={new UDim2(0.2, 0, 0.2, 0)}
				ZIndex={3}
				Visible={petState.equipped}
			/>
			<textlabel
				Key="Selected"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0.75, 0, 0.75, 0)}
				Text="X"
				TextColor3={Color3.fromRGB(255, 0, 0)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
				Visible={props.selectedToDelete}
				ZIndex={2}
			/>
		</textbutton>
	);
}

export default withHooks(PetButton);
