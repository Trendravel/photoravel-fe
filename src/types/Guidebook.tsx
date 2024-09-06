export interface Guidebook {
    id: number;
    userId: string;
    title: string;
    content?: string;
    region: string;
    views: number;    
    images: string;
    createdAt: string;
    updatedAt?: string;
  }