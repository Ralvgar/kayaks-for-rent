import { gql } from "@apollo/client";

export const GET_RESERVATIONS = gql`
  query getReservations {
    reservations {
        _id
        timestamp
        userId
        spotId
        kayakType
        duration
        priceEur
    }
  }
`;
