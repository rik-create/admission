// Base type definitions

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'guard' | 'admin';
    avatar?: string;
    createdAt: Date;
  }
  
  export interface Timestamped {
    createdAt: Date;
    updatedAt: Date;
  }
  