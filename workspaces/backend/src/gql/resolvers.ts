import { DbService } from "../services/DbService";
import { loginMutation } from "./loginMutation";
import { signupMutation } from "./signupMutation";
import { SpotsQuery, UserContext } from "../types/types";
import { createReservationMutation } from "./createReservationMutation";

export const resolvers = {
  Query: {
    spots: async (
      parent: null | undefined,
      { query, limit }: { query: SpotsQuery; limit: number }
    ) => {
      return DbService.getSpots(query, limit);
    },
    reservations: () => {
      return DbService.getReservations();
    },
    spot: async (
      parent: null | undefined,
      { _id, slug }: { _id: string; slug: string }
    ) => {
      return DbService.getSpot(_id, slug);
    },
    user: async (
      parent: null | undefined,
      args: null | undefined,
      context: UserContext
    ) => {
      return context.user ? { email: context.user.email } : null;
    },
  },

  Mutation: {
    login: loginMutation,
    signup: signupMutation,
    createReservation: createReservationMutation,
  },
};
