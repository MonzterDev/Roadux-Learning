import { Controller, OnStart } from "@flamework/core";
import { clientStore } from "client/rodux/rodux";

@Controller({})
export class TestController implements OnStart {
	onStart() {
		print(clientStore);
	}
}
