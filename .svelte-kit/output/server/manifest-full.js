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
		client: {start:"_app/immutable/entry/start.BeJXRiRZ.js",app:"_app/immutable/entry/app.Bd1EsUYi.js",imports:["_app/immutable/entry/start.BeJXRiRZ.js","_app/immutable/chunks/DsKadqxD.js","_app/immutable/chunks/CzhO23HD.js","_app/immutable/chunks/lDDLI7_-.js","_app/immutable/entry/app.Bd1EsUYi.js","_app/immutable/chunks/CzhO23HD.js","_app/immutable/chunks/Bcguu_Yt.js","_app/immutable/chunks/OjjX_Doe.js","_app/immutable/chunks/DwsMzhH_.js","_app/immutable/chunks/lDDLI7_-.js","_app/immutable/chunks/BIoakc-c.js","_app/immutable/chunks/BmfPoX4y.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
