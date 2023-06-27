import Roact from "@rbxts/roact";

interface Props {
	Text: string;
	Position?: UDim2;
	Rotation?: number;
	LayoutOrder?: number;
	OnClick: (b: TextButton) => void;
}

export default function Button(props: Props) {
	return (
		<textbutton
			AutoButtonColor={false}
			TextColor3={Color3.fromRGB(255, 255, 255)}
			BorderSizePixel={0}
			Font={Enum.Font.GothamBlack}
			Text={props.Text.upper()}
			TextSize={24}
			AutomaticSize={Enum.AutomaticSize.XY}
			AnchorPoint={new Vector2(0, 0.5)}
			Position={props.Position}
			Rotation={props.Rotation}
			LayoutOrder={props.LayoutOrder}
			Event={{
				MouseButton1Click: (b) => props.OnClick(b),
			}}
		>
			<uipadding
				PaddingTop={new UDim(0, 10)}
				PaddingBottom={new UDim(0, 10)}
				PaddingLeft={new UDim(0, 15)}
				PaddingRight={new UDim(0, 15)}
			/>
			<uistroke
				Color={Color3.fromRGB(255, 255, 255)}
				Thickness={2}
				ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
			/>
		</textbutton>
	);
}
