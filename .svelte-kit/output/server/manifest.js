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
		client: {start:"_app/immutable/entry/start.BUHKBDhR.js",app:"_app/immutable/entry/app.D1b8a45P.js",imports:["_app/immutable/entry/start.BUHKBDhR.js","_app/immutable/chunks/DphQYWWY.js","_app/immutable/chunks/CzhO23HD.js","_app/immutable/chunks/lDDLI7_-.js","_app/immutable/entry/app.D1b8a45P.js","_app/immutable/chunks/CzhO23HD.js","_app/immutable/chunks/Bcguu_Yt.js","_app/immutable/chunks/OjjX_Doe.js","_app/immutable/chunks/DwsMzhH_.js","_app/immutable/chunks/lDDLI7_-.js","_app/immutable/chunks/BIoakc-c.js","_app/immutable/chunks/BmfPoX4y.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		prerendered_routes: new Set(["/","/quiz","/results","/select-type"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
