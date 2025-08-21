type DynamicRoutes = {
	"/documents/[id]": { id: string };
	"/rnd/projects/[id]": { id: string };
	"/sales/campaigns/[id]": { id: string }
};

type Layouts = {
	"/": { id?: string };
	"/auth": undefined;
	"/auth/login": undefined;
	"/auth/register": undefined;
	"/dashboard": undefined;
	"/documents": { id?: string };
	"/documents/[id]": { id: string };
	"/finance": undefined;
	"/finance/reports": undefined;
	"/finance/transaction": undefined;
	"/hr": undefined;
	"/hr/employees": undefined;
	"/hr/recruitment": undefined;
	"/rnd": { id?: string };
	"/rnd/projects": { id?: string };
	"/rnd/projects/[id]": { id: string };
	"/sales": { id?: string };
	"/sales/campaigns": { id?: string };
	"/sales/campaigns/[id]": { id: string };
	"/sales/reports": undefined;
	"/settings": undefined
};

export type RouteId = "/" | "/auth" | "/auth/login" | "/auth/register" | "/dashboard" | "/documents" | "/documents/[id]" | "/finance" | "/finance/reports" | "/finance/transaction" | "/hr" | "/hr/employees" | "/hr/recruitment" | "/rnd" | "/rnd/projects" | "/rnd/projects/[id]" | "/sales" | "/sales/campaigns" | "/sales/campaigns/[id]" | "/sales/reports" | "/settings";

export type RouteParams<T extends RouteId> = T extends keyof DynamicRoutes ? DynamicRoutes[T] : Record<string, never>;

export type LayoutParams<T extends RouteId> = Layouts[T] | Record<string, never>;

export type Pathname = "/" | "/auth" | "/auth/login" | "/auth/register" | "/dashboard" | "/documents" | `/documents/${string}` & {} | "/finance" | "/finance/reports" | "/finance/transaction" | "/hr" | "/hr/employees" | "/hr/recruitment" | "/rnd" | "/rnd/projects" | `/rnd/projects/${string}` & {} | "/sales" | "/sales/campaigns" | `/sales/campaigns/${string}` & {} | "/sales/reports" | "/settings";

export type ResolvedPathname = `${"" | `/${string}`}${Pathname}`;

export type Asset = "/logo.png";