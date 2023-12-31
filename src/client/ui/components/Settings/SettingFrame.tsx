import Roact from "@rbxts/roact";
import { useEffect, useState } from "@rbxts/roact-hooked";
import { ClientStore, clientStore } from "client/rodux/rodux";
import { Setting } from "shared/constants/Settings";
import { Dependency } from "@flamework/core";
import { SettingsController } from "client/controllers/SettingsController";

// Uses roact-hooked

interface Props {
	setting: Setting;
}

function SettingsFrame(props: Props) {
	const settingsController = Dependency(SettingsController);

	const [isEnabled, setIsEnabled] = useState(() => {
		const currentState = clientStore.getState();
		return currentState.settings[props.setting as keyof typeof currentState.settings];
	});

	const toggleEnabled = () => {
		setIsEnabled((action) => !action);
		settingsController.updateSetting(props.setting, !isEnabled);
	};

	return (
		<frame BackgroundColor3={Color3.fromRGB(64, 64, 64)}>
			<uicorner CornerRadius={new UDim(0.2, 0)} />
			<uilistlayout
				Padding={new UDim(0.3, 0)}
				FillDirection={Enum.FillDirection.Horizontal}
				VerticalAlignment={"Center"}
				HorizontalAlignment={"Center"}
			/>

			<textlabel
				Text={props.setting}
				TextScaled={true}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				Font={Enum.Font.Gotham}
				Size={UDim2.fromScale(0.4, 0.8)}
				BackgroundTransparency={1}
			/>

			<textbutton
				Text={""}
				TextScaled={true}
				TextColor3={Color3.fromRGB(255, 255, 255)}
				Font={Enum.Font.GothamBlack}
				Size={UDim2.fromScale(0.075, 0.3)}
				BackgroundColor3={isEnabled ? new Color3(0.13, 0.92, 0.17) : new Color3(0.92, 0.13, 0.13)}
				Event={{
					MouseButton1Click: toggleEnabled,
				}}
			>
				<uicorner CornerRadius={new UDim(0.3, 0)} />
			</textbutton>
		</frame>
	);
}

export default SettingsFrame;
