import { Review } from "./Review";

export interface Photographer {
    accountId: string;
    name: string;
    region: string;
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