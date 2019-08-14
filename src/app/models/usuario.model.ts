export class Usuario{
    
    constructor(
        //el orden en que se declaran SI importan, ya que deben venir en el mismo orden
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ){}
}