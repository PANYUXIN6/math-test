export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.Bhx6gze6.js",app:"_app/immutable/entry/app.Bzm3wfkv.js",imports:["_app/immutable/entry/start.Bhx6gze6.js","_app/immutable/chunks/Gt2O-c4g.js","_app/immutable/chunks/4Lpfm1mz.js","_app/immutable/chunks/wu8WGWAQ.js","_app/immutable/entry/app.Bzm3wfkv.js","_app/immutable/chunks/4Lpfm1mz.js","_app/immutable/chunks/BnJy6Fgy.js","_app/immutable/chunks/CP3jBiu0.js","_app/immutable/chunks/Cp7w3v0t.js","_app/immutable/chunks/wu8WGWAQ.js","_app/immutable/chunks/GIOW0cxA.js","_app/immutable/chunks/D6qk6l_c.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/quiz",
				pattern: /^\/quiz\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/results",
				pattern: /^\/results\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/select-type",
				pattern: /^\/select-type\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
