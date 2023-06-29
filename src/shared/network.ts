import { Networking } from "@flamework/networking";
import { PlayerData } from "./types/PlayerData";
import { PetAction, PetInstance } from "./constants/Pets";

interface ServerEvents {
	equipPet: (uuid: string) => void;
	unequipPet: (uuid: string) => void;

	petAction: (uuid: string, action: PetAction) => void;
}

interface ServerFunctions {
	getData: <k extends keyof PlayerData>(data: k) => PlayerData[k] | false;
}

interface ClientEvents {
	updateData: (data: string) => void; // Using this because Flamework's Guards can be unreliable with large tables
	updateTaps: (amount: number) => void;

	replicatePlayerState: (action: string) => void;

	givePet: (pet: PetInstance) => void;
	petAction: (uuid: string, action: PetAction) => void;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
