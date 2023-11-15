import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiBookService {
  constructor() { }

  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  async fetchData()
  {
    try
    {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?key=AIzaSyC2pkxZTviaSW3cJs3FTRyDpl3BugOPi5Q`);
      return await res.json();
    }
    catch(error)
    { 
      console.log(error);
    }
  }
}
