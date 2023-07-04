import { Controller, OnStart } from "@flamework/core";
import { createElement, mount } from "@rbxts/roact";
import Roact from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";
import RoactRodux from "@rbxts/roact-rodux";
import { Players } from "@rbxts/services";
import { clientStore } from "client/rodux/rodux";
import { SettingsApp } from "client/ui/apps/Settings";
import { Setting } from "shared/constants/Settings";
import { PlayerDataKeys, UpdateSettingAction } from "shared/types/Rodux";

@Controller({})
export class SettingsController implements OnStart {
	private player = Players.LocalPlayer;
	private playerGui = this.player.WaitForChild("PlayerGui", 5);

	onStart() {
		withHookDetection(Roact);
		// mount(
		// 	createElement(RoactRodux.StoreProvider, { store: clientStore }, [createElement(SettingsApp)]),
		// 	this.playerGui,
		// );

		clientStore.changed.connect((newState) => print(newState));
	}

	public updateSetting(setting: Setting, value: boolean) {
		const currentValue = clientStore.getState().settings[setting];
		if (currentValue === value) return;

		const action: UpdateSettingAction = {
			type: PlayerDataKeys.updateSetting,
			setting: setting,
			value: value,
		};
		clientStore.dispatch(action);
	}
}
