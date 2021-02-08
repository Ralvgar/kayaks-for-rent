import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      email
      token
      tokenExpirationHours
      error
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!, $phoneNumber: String!, $password: String!) {
    signup(email: $email, phoneNumber: $phoneNumber, password: $password) {
      ok
      token
      tokenExpirationHours
      error
    }
  }
`;
