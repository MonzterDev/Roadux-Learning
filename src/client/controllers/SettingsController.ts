import { Controller, OnStart } from "@flamework/core";
import { createElement, mount } from "@rbxts/roact";
import Roact from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";
import { Players } from "@rbxts/services";
import { clientStore } from "client/rodux/rodux";
import { SettingsApp } from "client/ui/apps/Settings";

@Controller({})
export class SettingsController implements OnStart {
	private player = Players.LocalPlayer;
	private playerGui = this.player.WaitForChild("PlayerGui", 5);

	onStart() {
		withHookDetection(Roact);
		mount(createElement(SettingsApp), this.playerGui);

		clientStore.changed.connect((newState) => print(newState));
	}
}
