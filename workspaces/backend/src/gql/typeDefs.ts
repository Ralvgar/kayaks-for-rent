import { gql } from "apollo-server";

export const typeDefs = gql`
  type Spot {
    _id: ID!
    title: String!
    description: String!
    locationName: String!
    location: Location!
    imageUrls: [ImageUrls]
    mainImageUrl: String!
    kayakTypes: [SpotKayakType!]
    isHighlighted: Boolean!
    slug: String
  }

  type KayakReservation {
    kayakType: String!
    duration: String!
  }

  type Reservation {
    _id: String!
    timestamp: String!
    userId: String!
    spotId: String!
    kayakReservations: [KayakReservation!]
    priceEur: Float!
  }

  type CreateReservationResponse {
    reservationID: ID
    error: String
  }

  type ImageUrls {
    imageUrl: String
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  type SpotKayakType {
    name: String!
    description: String!
    pax: String!
    pricing: [KayakPricing!]
  }

  type KayakPricing {
    from: String!
    to: String!
    durationName: String!
    durationDescription: String!
    priceEur: Float!
  }

  type KayakType {
    description: String!
    people: Int!
  }

  type LoginResult {
    ok: Boolean!
    email: String
    token: String
    tokenExpirationHours: Int
    error: String
  }

  type UserResponse {
    email: String
  }

  type PaymentResponse {
    id: String
    confirmation: Boolean
  }

  input SpotsQuery {
    isHighlighted: Boolean
  }

  input KayakReservationInput {
    kayakType: String!
    duration: String!
  }

  type Query {
    spots(query: SpotsQuery, limit: Int): [Spot!]
    reservations: [Reservation!]
    spot(_id: String, slug: String): Spot!
    user: UserResponse
    payment(id: String): PaymentResponse!
  }

  type Mutation {
    signup(
      email: String!
      phoneNumber: String!
      password: String!
    ): LoginResult!
    login(email: String!, password: String!): LoginResult!
    createReservation(
      timestamp: String!
      spotId: String!
      kayakReservations: [KayakReservationInput!]
      paymentId: String!
    ): CreateReservationResponse
  }
`;
