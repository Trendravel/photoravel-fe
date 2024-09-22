import { Review } from "./Review";

export interface MultipleLocation {
    locationId: number;
    latitude: number;
    longitude: number;
    address: string;
    description: string;
    name: string;
    images: Array<string>;
    views: number;
    ratingAvg: number;
    reviewCounts: number;
    createdAt: string;
    updatedAt: string;
}

export interface UploadingLocation {
    locationId: number;
    latitude: number;
    longitude: number;
    address: string;
    description: string;
    name: string;
    userId: string;
}

export interface SingleLocation {
    locationId: number;
    latitude: number;
    longitude: number;
    address: string;
    description: string;
    name: string;
    images: Array<string>;
    views: number;
    ratingAvg: number;
    reviewCounts: number;
    recentReviewDtos: Array<Review>;
    createdAt: string;
    updatedAt: string;
}
