import { Review } from "./Review";

export interface spotMultiRead {
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

export interface spotSingleRead {
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

export interface spotCreate {
    spotId: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    locationId: number;
    userId: string;
}

export interface spotUpdate {
    spotId: number;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    locationId: number;
    deleteImages: string[];
}