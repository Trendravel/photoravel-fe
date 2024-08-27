import styled from "@emotion/styled";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

import { Location } from "../types/Location";

const LocationInfoContainer = styled.div`
    display: flex;
    border-radius: 0.5em;
    padding: 0.5em;
    box-shadow: 0em 0.1em 0.5em #BBBBBB;
    margin-bottom: 0.5em;
`;

const LocationImage = styled.img`
    width: 7em;
    height: 7em;
    border-radius: 0.375em;
`;

const SimpleInfoContainer = styled.div`
    padding: 0.25em 0.5em 0 0.75em;
`;

const Title = styled.p`
    font-size: 14pt;
    font-weight: 500;
    text-align: left;
    margin-left: 0.1em;
    margin-bottom: 0.1em;
`;

const RatingArea = styled.div`
    display: flex;
    align-items: center;
`;

const Rate = styled.p`
    font-size: 11pt;
    margin-left: 0.2em;
`;

const Description = styled.p`
    text-align: left;
    padding-top: 0.1em;
    font-size: 11pt;
    overflow: hidden;
    height: 3em;
`;

const Address = styled.p`
    padding-top: 0.75em;
    text-align: right;
    font-size: 8pt;
    color: #94A3B8;
`;

const LocationInfo = (props: { data: Location }) => {
    const [rating] = useState(5);
    const location_data = props.data;
    const descriptionLimit = 50;
    let simplifiedDescription = "";

    if (location_data.description.length >= descriptionLimit) {
        simplifiedDescription = location_data.description.slice(0, descriptionLimit+1);
        simplifiedDescription += " ...";
    }

    return (
        <LocationInfoContainer>
            <LocationImage
                src={location_data.images.length >= 1 ? location_data.images[0] :
                    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"}
            />
            <SimpleInfoContainer>
                <Title>{location_data.name}</Title>
                <RatingArea>
                    <Rating
                        initialValue={rating}
                        readonly={true}
                        size={20}
                    />
                    <Rate>5.0(999+)</Rate>
                </RatingArea>
                <Description>
                    {simplifiedDescription}
                </Description>
                <Address>
                    {location_data.address}
                </Address>
            </SimpleInfoContainer>
        </LocationInfoContainer>
    );
}

export default LocationInfo;
