import Roact, { createElement, mount, unmount } from "@rbxts/roact";
import { SettingsApp } from "../apps/Settings";
import { clientStore } from "client/rodux/rodux";
import { withHookDetection } from "@rbxts/roact-hooked";

withHookDetection(Roact);

const Mount = (topNode: GuiObject) => {
	// const tree = mount(
	// 	createElement(RoactRodux.StoreProvider, { store: clientStore }, [createElement(SettingsApp)]),
	// 	topNode,
	// );
	// return () => unmount(tree);
};

export = Mount;
