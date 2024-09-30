import { Review } from "./Review";
import { Region } from "./Guidebook";

export interface Photographer {
    accountId: string;
    name: string;
    region: Region;
    description: string;
    profileImg: string;    
    ratingAvg: string;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
    careerYear: number;
    matchingCount: number;
    recentReviewDtos: Review[];
  }