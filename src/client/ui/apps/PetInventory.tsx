import Roact from "@rbxts/roact";
import { StoreProvider, useSelector } from "@rbxts/roact-rodux-hooked";
import { clientStore } from "client/rodux/rodux";
import { PetInventory } from "shared/constants/Pets";
import PetFrame from "../components/PetInventory/PetFrame";

interface Props {
	onClick: () => void;
}

export default function PetInventory(props: Props) {
	return (
		<StoreProvider store={clientStore}>
			<screengui Key="PetInventory" ResetOnSpawn={false} ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
				<PetFrame onClick={props.onClick} />
			</screengui>
		</StoreProvider>
	);
}
