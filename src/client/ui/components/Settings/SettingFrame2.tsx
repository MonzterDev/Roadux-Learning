import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import Rodux from "@rbxts/rodux";
import { PlayerState, UpdateSettingAction } from "client/rodux/reducers";
import { clientStore } from "client/rodux/rodux";
import { Setting } from "shared/constants/Settings";
import { PlayerDataKeys } from "shared/types/Rodux";

// Uses roact-rodux

interface StateProps {
	readonly setting: Setting;
	readonly isEnabled: boolean;
}

interface UIProps extends StateProps {}

interface UIState {}

function SettingsFrame2(props: StateProps) {
	const isEnabled = props.isEnabled;

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
					MouseButton1Click: () => {
						const action: UpdateSettingAction = {
							type: PlayerDataKeys.updateSetting,
							setting: props.setting,
							value: !isEnabled,
						};
						clientStore.dispatch(action);
					},
				}}
			>
				<uicorner CornerRadius={new UDim(0.3, 0)} />
			</textbutton>
		</frame>
	);
}

function mapState(state: PlayerState, props: StateProps) {
	return {
		isEnabled: state.settings[props.setting as keyof typeof state.settings],
	};
}

function mapDispatch(dispatch: Rodux.Dispatch, props: StateProps) {}

export default RoactRodux.connect(mapState, mapDispatch)(SettingsFrame2);
