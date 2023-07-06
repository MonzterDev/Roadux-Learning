import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import { clientStore } from "client/rodux/rodux";
import SettingFrame from "../components/Settings/SettingFrame";
import { Settings } from "shared/constants/Settings";

interface Props {}

export class SettingsApp extends Roact.Component<Props> {
	public constructor(props: Props) {
		super(props);
	}

	public render() {
		const settingFrames = Settings.map((setting) => {
			return <SettingFrame setting={setting} />;
		});

		return (
			<StoreProvider store={clientStore}>
				<screengui>
					<frame
						Size={UDim2.fromScale(0.3, 0.7)}
						AnchorPoint={new Vector2(0.5, 0.5)}
						Position={UDim2.fromScale(0.5, 0.5)}
						BackgroundColor3={new Color3(0.14, 0.14, 0.14)}
					>
						<uicorner CornerRadius={new UDim(0.025, 0)} />
						<textlabel
							Text={"SETTINGS"}
							TextScaled={true}
							TextColor3={Color3.fromRGB(255, 255, 255)}
							Font={Enum.Font.GothamBlack}
							Size={UDim2.fromScale(0.9, 0.1)}
							AnchorPoint={new Vector2(0.5, 0)}
							Position={UDim2.fromScale(0.5, 0)}
							BackgroundTransparency={1}
						/>

						<scrollingframe
							Size={UDim2.fromScale(0.9, 0.85)}
							AnchorPoint={new Vector2(0.5, 0)}
							Position={UDim2.fromScale(0.5, 0.115)}
							BackgroundTransparency={1}
							AutomaticCanvasSize={Enum.AutomaticSize.Y}
							VerticalScrollBarInset={Enum.ScrollBarInset.Always}
						>
							<uigridlayout CellSize={UDim2.fromScale(0.95, 0.25)} HorizontalAlignment={"Center"} />

							{settingFrames}
						</scrollingframe>
					</frame>
				</screengui>
			</StoreProvider>
		);
	}
}
