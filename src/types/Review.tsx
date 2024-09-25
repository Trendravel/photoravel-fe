export interface Review {
    reviewType: string;
    content: string;
    rating: number;
    images: string[]; 
    userName: string;
    createdAt: string;
    updatedAt: string;    
    reviewId: number;
    userId: string;
}
