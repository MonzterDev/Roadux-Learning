import { createElement, mount, unmount } from "@rbxts/roact";
import { SettingsApp } from "../apps/Settings";

const Mount = (topNode: GuiObject) => {
	const tree = mount(createElement(SettingsApp, { exitCallback: () => {}, egg: "Forest" }), topNode);
	return () => unmount(tree);
};

export = Mount;
