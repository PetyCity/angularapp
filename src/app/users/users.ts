export class User{
	constructor(
		public id?: number,
		public password?: string,
		public email?: string,
		public name_user?: string ,
		public image?: File,
		public rol?: string,
		public document?: number,
		public created_at?: any,
		public updated_at?: any
	) {}
}