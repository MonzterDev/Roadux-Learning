import Roact from "@rbxts/roact";
import { useEffect } from "@rbxts/roact-hooked";
import RoactRodux from "@rbxts/roact-rodux";
import Rodux from "@rbxts/rodux";
import { GenerateViewport } from "@rbxts/viewport-model";
import { PlayerState } from "client/rodux/reducers";
import { GetPetModel, Pet } from "shared/constants/Pets";

interface Props {
	pet: Pet;
	uuid: string;
	onClick: () => void;

	equipped: boolean;
}

function PetButton(props: Props) {
	const isEquipped = props.equipped;
	const model = GetPetModel(props.pet);

	const viewportRef = Roact.createRef<ViewportFrame>();

	useEffect(() => {
		if (viewportRef.getValue()) GenerateViewport(viewportRef.getValue()!, model.Clone());
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
			Event={{ MouseButton1Click: props.onClick }}
		>
			<uicorner CornerRadius={new UDim(0.1, 0)} />
			<textlabel
				Key="PetName"
				AnchorPoint={new Vector2(0.5, 0)}
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0.5, 0, 0.021, 0)}
				Size={new UDim2(0.9, 0, 0.2, 0)}
				Text={props.pet}
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
				Text="999.99M"
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
				Visible={isEquipped}
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
				Visible={false}
				ZIndex={2}
			/>
		</textbutton>
	);
}

function mapState(state: PlayerState, props: Props) {
	const pet = state.petInventory[props.uuid];
	return {
		equipped: pet.equipped ?? false,
	};
}

function mapDispatch(dispatch: Rodux.Dispatch) {}

export default RoactRodux.connect(mapState, mapDispatch)(PetButton);
