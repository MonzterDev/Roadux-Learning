import { Controller, OnStart } from "@flamework/core";
import Roact, { createElement, mount } from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";
import RoactRodux from "@rbxts/roact-rodux";
import { Players } from "@rbxts/services";
import { clientStore } from "client/rodux/rodux";
import { PetInventoryApp } from "client/ui/apps/PetInventory";
import { PetActionButton } from "shared/constants/Pets";

@Controller({})
export class PetsController implements OnStart {
	private player = Players.LocalPlayer;
	private playerGui = this.player.WaitForChild("PlayerGui", 5);

	onStart() {
		withHookDetection(Roact);
		mount(
			createElement(RoactRodux.StoreProvider, { store: clientStore }, [createElement(PetInventoryApp)]),
			this.playerGui,
		);
	}

	public performPetAction(action: PetActionButton) {
		switch (action) {
			case "Equip Best":
				break;
			case "Mass Delete":
				break;
			case "Trash Mode":
				break;
			case "Unequip All":
				this.unequipAll();
				break;
			default:
				break;
		}
	}

	private unequipAll() {}

	private unequipPet(uuid: string) {}
}
