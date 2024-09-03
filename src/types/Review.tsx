export interface Review {
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