export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20')
];

export const server_loads = [];

export const dictionary = {
		"/": [2],
		"/auth/login": [3],
		"/auth/register": [4],
		"/dashboard": [5],
		"/documents": [6],
		"/finance": [7],
		"/finance/reports": [8],
		"/finance/transaction": [9],
		"/hr": [10],
		"/hr/employees": [11],
		"/hr/recruitment": [12],
		"/rnd": [13],
		"/rnd/projects": [14],
		"/rnd/projects/[id]": [15],
		"/sales": [16],
		"/sales/campaigns": [17],
		"/sales/campaigns/[id]": [18],
		"/sales/reports": [19],
		"/settings": [20]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';