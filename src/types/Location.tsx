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
    category: string;
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

export const Category = [
    "🔥 8월의 인기장소",
    "⛱️ 여유로운 여행지",
    "🌊 액티비티 여행지",
    "📱 인스타 속 그 장소!"
]

export enum ReverseCategoryEnum {
    "카테고리 없음" = "None",
    "🔥 8월의 인기장소" = "FIRST",
    "⛱️ 여유로운 여행지" = "SECOND",
    "🌊 액티비티 여행지" = "THIRD",
    "📱 인스타 속 그 장소!" = "FOURTH"
}