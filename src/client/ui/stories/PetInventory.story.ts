import Roact, { createElement, mount, unmount } from "@rbxts/roact";
import { clientStore } from "client/rodux/rodux";
import { withHookDetection } from "@rbxts/roact-hooked";
import PetInventory from "../apps/PetInventory";

withHookDetection(Roact);

const Mount = (topNode: GuiObject) => {
	// const tree = mount(
	// 	createElement(RoactRodux.StoreProvider, { store: clientStore }, [
	// 		createElement(PetInventory, {
	// 			onClick: () => {
	// 				unmount(tree);
	// 			},
	// 		}),
	// 	]),
	// 	topNode,
	// );
	// return () => unmount(tree);
};

export = Mount;
