export interface Location {
    locationId: number;
    latitude: number;
    longitude: number;
    address: string;
    description: string;
    name: string;
    images: Array<string>;
    views: number;
    ratingAvg: number;
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
