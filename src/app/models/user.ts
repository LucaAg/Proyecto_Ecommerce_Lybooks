export class User {
    id: number;
    name: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    image: string;
  
    constructor() {
      this.id = 0;
      this.name = '';
      this.lastName = '';
      this.age = 0;
      this.email = '';
      this.password = '';
      this.image = '';
    }
  }