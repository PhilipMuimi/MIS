
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/auth" | "/auth/login" | "/auth/register" | "/dashboard" | "/documents" | "/documents/[id]" | "/finance" | "/finance/reports" | "/finance/transaction" | "/hr" | "/hr/employees" | "/hr/recruitment" | "/rnd" | "/rnd/projects" | "/rnd/projects/[id]" | "/sales" | "/sales/campaigns" | "/sales/campaigns/[id]" | "/sales/reports" | "/settings";
		RouteParams(): {
			"/documents/[id]": { id: string };
			"/rnd/projects/[id]": { id: string };
			"/sales/campaigns/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/auth": Record<string, never>;
			"/auth/login": Record<string, never>;
			"/auth/register": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/documents": { id?: string };
			"/documents/[id]": { id: string };
			"/finance": Record<string, never>;
			"/finance/reports": Record<string, never>;
			"/finance/transaction": Record<string, never>;
			"/hr": Record<string, never>;
			"/hr/employees": Record<string, never>;
			"/hr/recruitment": Record<string, never>;
			"/rnd": { id?: string };
			"/rnd/projects": { id?: string };
			"/rnd/projects/[id]": { id: string };
			"/sales": { id?: string };
			"/sales/campaigns": { id?: string };
			"/sales/campaigns/[id]": { id: string };
			"/sales/reports": Record<string, never>;
			"/settings": Record<string, never>
		};
		Pathname(): "/" | "/auth" | "/auth/" | "/auth/login" | "/auth/login/" | "/auth/register" | "/auth/register/" | "/dashboard" | "/dashboard/" | "/documents" | "/documents/" | `/documents/${string}` & {} | `/documents/${string}/` & {} | "/finance" | "/finance/" | "/finance/reports" | "/finance/reports/" | "/finance/transaction" | "/finance/transaction/" | "/hr" | "/hr/" | "/hr/employees" | "/hr/employees/" | "/hr/recruitment" | "/hr/recruitment/" | "/rnd" | "/rnd/" | "/rnd/projects" | "/rnd/projects/" | `/rnd/projects/${string}` & {} | `/rnd/projects/${string}/` & {} | "/sales" | "/sales/" | "/sales/campaigns" | "/sales/campaigns/" | `/sales/campaigns/${string}` & {} | `/sales/campaigns/${string}/` & {} | "/sales/reports" | "/sales/reports/" | "/settings" | "/settings/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/logo.png" | string & {};
	}
}