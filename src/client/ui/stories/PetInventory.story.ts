import Roact, { createElement, mount, unmount } from "@rbxts/roact";
import { SettingsApp } from "../apps/Settings";
import RoactRodux from "@rbxts/roact-rodux";
import { clientStore } from "client/rodux/rodux";
import { withHookDetection } from "@rbxts/roact-hooked";
import { PetInventoryApp } from "../apps/PetInventory";

withHookDetection(Roact);

const Mount = (topNode: GuiObject) => {
	const tree = mount(
		createElement(RoactRodux.StoreProvider, { store: clientStore }, [createElement(PetInventoryApp)]),
		topNode,
	);
	return () => unmount(tree);
};

export = Mount;
