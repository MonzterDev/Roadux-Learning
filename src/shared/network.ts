import { Networking } from "@flamework/networking";
import { PlayerData } from "./types/PlayerData";
import { PetAction, PetInstance } from "./constants/Pets";
import { AddPlayerAction } from "./types/Rodux";

interface ServerEvents {
	equipPet: (uuid: string) => void;
	unequipPet: (uuid: string) => void;

	petAction: (uuid: string, action: PetAction) => void;
	renamePet: (uuid: string, name: string) => void;
	deleteAllPets: () => void;
}

interface ServerFunctions {
	getInitialState: () => PlayerData | undefined;
}

interface ClientEvents {
	updateTaps: (amount: number) => void;

	replicatePlayerState: (action: string) => void;

	givePet: (pet: PetInstance) => void;
	petAction: (uuid: string, action: PetAction) => void;
	renamePet: (uuid: string, name: string) => void;

	updateState(action: any): void;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
