export class Company{
	constructor(
		public id?: number,
        public nit?: number,
        public name_comp?: string ,
		public address?: string,
		public city?: string,
		public phone?: number,
        public user_id?: number,
		public image_company?: File,
		public created_at?: any,
		public updated_at?: any
	) {}
}