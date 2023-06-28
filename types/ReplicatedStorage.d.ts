interface ReplicatedStorage extends Instance {
	Pets: Folder & {
		Turtle: Model & {
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeTurtle"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Dog: Model & {
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape"]: MeshPart & {
				Decal: Decal;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeDog"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Cat: Model & {
			["Meshes/PetShape"]: MeshPart & {
				Decal: Decal;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Fox: Model & {
			["Meshes/PetShapeCatEars"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Bunny: Model & {
			["Meshes/PetShape"]: MeshPart & {
				Decal: Decal;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
		};
		Pig: Model & {
			["Meshes/PetShape2"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapePig"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeTail"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShapeElephant"]: MeshPart & {
				WeldConstraint: WeldConstraint;
			};
			["Meshes/PetShape"]: MeshPart & {
				Decal: Decal;
			};
		};
	};
	TS: Folder & {
		network: ModuleScript;
		util: Folder & {
			functions: Folder & {
				forEveryPlayer: ModuleScript;
				toTileCase: ModuleScript;
			};
		};
		types: Folder & {
			PlayerData: ModuleScript;
			Rodux: ModuleScript;
		};
		components: Folder;
		constants: Folder & {
			Pets: ModuleScript;
			Settings: ModuleScript;
			PlayerData: ModuleScript;
		};
	};
	rbxts_include: Folder & {
		RuntimeLib: ModuleScript;
		Promise: ModuleScript;
		node_modules: Folder & {
			["@flamework"]: Folder & {
				core: Folder & {
					out: ModuleScript & {
						reflect: ModuleScript;
						metadata: ModuleScript;
						modding: ModuleScript;
						flamework: ModuleScript;
					};
				};
				components: Folder & {
					out: ModuleScript & {
						componentTracker: ModuleScript;
					};
				};
				networking: Folder & {
					out: ModuleScript & {
						events: Folder & {
							createClientHandler: ModuleScript;
							createServerHandler: ModuleScript;
							createNetworkingEvent: ModuleScript;
						};
						functions: Folder & {
							createClientHandler: ModuleScript;
							createNetworkingFunction: ModuleScript;
							createServerHandler: ModuleScript;
							errors: ModuleScript;
						};
						handlers: ModuleScript;
						middleware: Folder & {
							createMiddlewareProcessor: ModuleScript;
							skip: ModuleScript;
						};
						util: Folder & {
							populateInstanceMap: ModuleScript;
						};
					};
				};
			};
			["@rbxts"]: Folder & {
				roact: Folder & {
					src: ModuleScript & {
						createSpy: ModuleScript;
						createSignal: ModuleScript;
						oneChild: ModuleScript;
						Component: ModuleScript;
						createElement: ModuleScript;
						createReconciler: ModuleScript;
						GlobalConfig: ModuleScript;
						strict: ModuleScript;
						createRef: ModuleScript;
						Type: ModuleScript;
						Portal: ModuleScript;
						Symbol: ModuleScript;
						PropMarkers: Folder & {
							Ref: ModuleScript;
							Change: ModuleScript;
							Children: ModuleScript;
							Event: ModuleScript;
						};
						ComponentLifecyclePhase: ModuleScript;
						Config: ModuleScript;
						assign: ModuleScript;
						assertDeepEqual: ModuleScript;
						getDefaultInstanceProperty: ModuleScript;
						Binding: ModuleScript;
						NoopRenderer: ModuleScript;
						forwardRef: ModuleScript;
						internalAssert: ModuleScript;
						createReconcilerCompat: ModuleScript;
						createFragment: ModuleScript;
						RobloxRenderer: ModuleScript;
						PureComponent: ModuleScript;
						invalidSetStateMessages: ModuleScript;
						ElementKind: ModuleScript;
						createContext: ModuleScript;
						Logging: ModuleScript;
						ElementUtils: ModuleScript;
						SingleEventManager: ModuleScript;
						None: ModuleScript;
					};
				};
				profileservice: Folder & {
					src: ModuleScript;
				};
				["roact-rodux-hooked"]: Folder & {
					src: ModuleScript & {
						hooks: Folder & {
							useSelector: ModuleScript;
							useDispatch: ModuleScript;
							useStore: ModuleScript;
						};
						utils: Folder & {
							shallowEqual: ModuleScript;
						};
						components: Folder & {
							Context: ModuleScript;
							StoreProvider: ModuleScript;
						};
						vendor: Folder & {
							RoactHooked: ModuleScript;
							Roact: ModuleScript;
						};
					};
				};
				t: Folder & {
					lib: Folder & {
						ts: ModuleScript;
					};
				};
				["compiler-types"]: Folder & {
					types: Folder;
				};
				["object-utils"]: ModuleScript;
				["roact-hooked"]: Folder & {
					src: ModuleScript & {
						hoc: ModuleScript;
						Roact: ModuleScript;
						NoYield: ModuleScript;
						withHookDetection: ModuleScript;
						pureComponent: ModuleScript;
						hooks: ModuleScript;
					};
				};
				["roact-rodux"]: Folder & {
					src: ModuleScript & {
						StoreContext: ModuleScript;
						StoreProvider: ModuleScript;
						Symbol: ModuleScript;
						shallowEqual: ModuleScript;
						join: ModuleScript;
						connect: ModuleScript;
					};
				};
				types: Folder & {
					include: Folder & {
						generated: Folder;
					};
				};
				maid: Folder & {
					Maid: ModuleScript;
				};
				services: ModuleScript;
				rodux: Folder & {
					src: ModuleScript & {
						combineReducers: ModuleScript;
						NoYield: ModuleScript;
						createReducer: ModuleScript;
						loggerMiddleware: ModuleScript;
						makeActionCreator: ModuleScript;
						thunkMiddleware: ModuleScript;
						prettyPrint: ModuleScript;
						Store: ModuleScript;
						Signal: ModuleScript;
					};
				};
				cmdr: Folder & {
					Cmdr: ModuleScript & {
						CreateGui: ModuleScript;
						Shared: Folder & {
							Registry: ModuleScript;
							Dispatcher: ModuleScript;
							Command: ModuleScript;
							Argument: ModuleScript;
							Util: ModuleScript;
						};
						BuiltInTypes: Folder & {
							PlayerId: ModuleScript;
							Type: ModuleScript;
							Vector: ModuleScript;
							URL: ModuleScript;
							UserInput: ModuleScript;
							BindableResource: ModuleScript;
							StoredKey: ModuleScript;
							Team: ModuleScript;
							Primitives: ModuleScript;
							Player: ModuleScript;
							BrickColor: ModuleScript;
							MathOperator: ModuleScript;
							Command: ModuleScript;
							Color3: ModuleScript;
							ConditionFunction: ModuleScript;
							Duration: ModuleScript;
						};
						BuiltInCommands: Folder & {
							help: ModuleScript;
							Admin: Folder & {
								gotoPlaceServer: ModuleScript;
								kill: ModuleScript;
								teleport: ModuleScript;
								kickServer: ModuleScript;
								killServer: ModuleScript;
								respawn: ModuleScript;
								respawnServer: ModuleScript;
								gotoPlace: ModuleScript;
								kick: ModuleScript;
								teleportServer: ModuleScript;
								announce: ModuleScript;
								announceServer: ModuleScript;
							};
							Debug: Folder & {
								getPlayerPlaceInstance: ModuleScript;
								version: ModuleScript;
								thru: ModuleScript;
								blink: ModuleScript;
								uptime: ModuleScript;
								position: ModuleScript;
								fetchServer: ModuleScript;
								uptimeServer: ModuleScript;
								getPlayerPlaceInstanceServer: ModuleScript;
								fetch: ModuleScript;
							};
							Utility: Folder & {
								rand: ModuleScript;
								jsonArrayEncode: ModuleScript;
								pick: ModuleScript;
								echo: ModuleScript;
								bind: ModuleScript;
								["var"]: ModuleScript;
								replace: ModuleScript;
								alias: ModuleScript;
								hover: ModuleScript;
								varSetServer: ModuleScript;
								varServer: ModuleScript;
								jsonArrayDecode: ModuleScript;
								varSet: ModuleScript;
								run: ModuleScript;
								runLines: ModuleScript;
								unbind: ModuleScript;
								history: ModuleScript;
								runif: ModuleScript;
								clear: ModuleScript;
								len: ModuleScript;
								resolve: ModuleScript;
								math: ModuleScript;
								edit: ModuleScript;
							};
						};
						CmdrClient: ModuleScript & {
							CmdrInterface: ModuleScript & {
								AutoComplete: ModuleScript;
								Window: ModuleScript;
							};
							DefaultEventHandlers: ModuleScript;
						};
						Initialize: ModuleScript;
					};
					TS: ModuleScript;
				};
				signal: ModuleScript;
			};
		};
	};
}
