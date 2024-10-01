export interface SimpleReview {
    content: string;
    rating: number;
    images: Array<string>;
}

export interface SingleReview {
    reviewId: number;
    reviewType: string;
    content: string;
    rating: number;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

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