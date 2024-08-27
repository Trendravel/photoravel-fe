export interface Location {
    id: number;
    latitude: number;
    longitude: number;
    address: string;
    description: string;
    name: string;
    images: Array<string>;
    user_id: number;
    distance: number;
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
