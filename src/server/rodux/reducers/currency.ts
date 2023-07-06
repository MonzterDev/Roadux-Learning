import { Action, createReducer } from "@rbxts/rodux";
import { AddPlayerAction, UpdateCurrencyAction, UpdateSettingAction } from "shared/types/Rodux";
import { RemovePlayerAction, WithDefaultAction, removePlayer } from ".";
import Object from "@rbxts/object-utils";

export function updateCurrency(state: CurrencyState, action: WithDefaultAction<UpdateCurrencyAction>): CurrencyState {
	const newState = Object.deepCopy(state);
	newState[action.meta.playerId][action.currency] = action.amount;
	return newState;
}

export function addPlayer(state: CurrencyState, action: WithDefaultAction<AddPlayerAction>): CurrencyState {
	const newState = Object.deepCopy(state);
	newState[action.meta.playerId] = {} as never;
	for (const currency of Object.keys(action.data.currency)) {
		newState[action.meta.playerId][currency] = action.data.currency[currency as keyof typeof action.data.currency];
	}
	return newState;
}

export type CurrencyActions =
	| WithDefaultAction<UpdateCurrencyAction>
	| WithDefaultAction<AddPlayerAction>
	| WithDefaultAction<RemovePlayerAction>;

export type CurrencyState = Record<number, Record<"taps" | "gems", number>>;

export const currencyReducer = createReducer<CurrencyState, CurrencyActions>(
	{},
	{
		updateCurrency: updateCurrency,
		addPlayer: addPlayer,
		removePlayer: removePlayer,
	},
);
