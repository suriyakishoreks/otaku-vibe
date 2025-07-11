export interface JikanResource {
	mal_id: number;
	type: string;
	name: string;
	url: string;
}

export interface JikanNamedResource {
	name: string;
	url: string;
}

export interface JikanResourceTitle {
	type: string;
	title: string;
}

export interface JikanResourcePeriod {
	from: string;
	to: string;
	string: string;
	prop: {
		from: { day: number; month: number; year: number; };
		to: { day: number; month: number; year: number; };
	};
}

export interface JikanResourceRelation {
	relation: string;
	entry: JikanResource[];
}
