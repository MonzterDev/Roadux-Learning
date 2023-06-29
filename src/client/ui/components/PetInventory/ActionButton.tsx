import Roact from "@rbxts/roact";
import { PetActionButton } from "shared/constants/Pets";

interface Props {
	action: PetActionButton;

	onClick: () => void;
}

function ActionButton(props: Props) {
	return (
		<textbutton
			Key={props.action}
			BackgroundColor3={ACTION_BUTTONS[props.action].backgroundColor}
			Font={Enum.Font.SourceSans}
			Size={new UDim2(0, 200, 0, 50)}
			Text={""}
			TextColor3={Color3.fromRGB(0, 0, 0)}
			TextSize={14}
			Event={{
				MouseButton1Click: props.onClick,
			}}
		>
			<uicorner CornerRadius={new UDim(0.2, 0)} />
			<imagelabel
				Key="Icon"
				AnchorPoint={new Vector2(0, 0.5)}
				BackgroundTransparency={1}
				Image={ACTION_BUTTONS[props.action].image}
				Position={new UDim2(0.025, 0, 0.5, 0)}
				ScaleType={Enum.ScaleType.Fit}
				Size={new UDim2(0.2, 0, 0.8, 0)}
			/>
			<textlabel
				Key="Title"
				BackgroundTransparency={1}
				Font={Enum.Font.GothamBold}
				Position={new UDim2(0.25, 0, 0, 0)}
				Size={new UDim2(0.7000000000000001, 0, 1, 0)}
				Text={props.action}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
			/>
		</textbutton>
	);
}

interface ActionButtonProps {
	image: string;
	backgroundColor: Color3;
}

const ACTION_BUTTONS: Record<PetActionButton, ActionButtonProps> = {
	"Equip Best": {
		image: "rbxassetid://12359088672",
		backgroundColor: Color3.fromRGB(64, 125, 255),
	},
	"Mass Delete": {
		image: "rbxassetid://12359088444",
		backgroundColor: Color3.fromRGB(218, 85, 85),
	},
	"Trash Mode": {
		image: "rbxassetid://12359088363",
		backgroundColor: Color3.fromRGB(220, 52, 52),
	},
	"Unequip All": {
		image: "rbxassetid://11506037408",
		backgroundColor: Color3.fromRGB(156, 98, 255),
	},
};

export default ActionButton;
