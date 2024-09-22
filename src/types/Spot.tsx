import { Review } from "./Review";

export interface MultiSpot {
    spotId: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    images: string[];
    views: number;
    createAt: string;
    updatedAt: string;
}

export interface SingleSpot {
    spotId: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    images: string[];
    views: number;
    ratingAvg: number;
    reviewCounts: number;
    recentReviewDtos: Review[];
    createdAt: string;
    updatedAt: string;
}