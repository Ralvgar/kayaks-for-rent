import { paymentCalculation } from "../utils/paymentCalculation";
import { DbService } from "../services/DbService";
import { PaymentService } from "../services/PaymentService";
import { ReservationParams, UserContext } from "../types/types";

export const createReservationMutation = async (
  parent: null | undefined,
  { timestamp, spotId, kayakReservations, paymentId }: ReservationParams,
  context: UserContext
) => {
  if (!context.user) {
    return {
      error: "Es necesario estar identificado como usuario.",
    };
  }
  const spotData = await DbService.getSpotById(spotId);

  const priceEur = paymentCalculation(
    kayakReservations,
    timestamp,
    spotData.kayakTypes
  );

  const paymentResolve = PaymentService.createCharge(paymentId, priceEur).then(
    async (resp) => {
      const createReservationResponse = await DbService.createReservation(
        timestamp,
        context.user._id,
        spotId,
        kayakReservations,
        resp,
        priceEur
      );
      return createReservationResponse;
    },

    () => {
      return { error: "ERR_ON_PAYMENT" };
    }
  );
  return paymentResolve;
};
