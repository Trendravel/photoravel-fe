interface LocationInfo_Type {
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

export default LocationInfo_Type;