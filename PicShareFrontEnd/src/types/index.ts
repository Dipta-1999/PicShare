export interface Picture {
    _id: string;
    url: string;
    title: string;
    sharedBy: string;
    createdAt: string;
  }
  
  export interface User {
    _id: string;
    username: string;
    favorites: Picture[];
  }