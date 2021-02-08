import { MongoClient, Db, ObjectId } from "mongodb";
import { User } from "@mallorcabootcamp/bsr-types";
import { SpotsQuery } from "../types/types";
import { PaymentService } from "./PaymentService";
import { getUniqueReservationId } from "../utils/getUniqueReservationId";

let db: Db | undefined;
const centsToEurosConversion = 100;

export class DbService {
  static connect() {
    const url = process.env.URL;
    const dbName = process.env.DB_NAME;
    return new Promise<void>((res, rej) => {
      const client = new MongoClient(url as string);
      client.connect((err) => {
        if (err) {
          rej(err);
        } else {
          db = client.db(dbName);
          res();
        }
      });
    });
  }

  static getSpots(query: SpotsQuery, limit?: number) {
    return DbService.getDb()
      .collection("spots")
      .find(query)
      .limit(!limit ? 0 : limit)
      .toArray();
  }

  static getSpotById(id: string) {
    return DbService.getDb()
      .collection("spots")
      .findOne({ _id: new ObjectId(id) });
  }

  static getReservations() {
    return DbService.getDb().collection("reservations").find().toArray();
  }

  static getUserFromToken(token: string) {
    return DbService.getDb().collection("users").findOne({ token });
  }

  static getUser(email: string): Promise<User | null> {
    return DbService.getDb().collection("users").findOne({ email });
  }

  static createUser(
    email: string,
    phoneNumber: string,
    password: string,
    token: string
  ) {
    return DbService.getDb()
      .collection("users")
      .insertOne({ email, phoneNumber, password, token });
  }

  static updateTokenOnUser(email: string, token: string) {
    return DbService.getDb()
      .collection("users")
      .findOneAndUpdate({ email }, { $set: { token } });
  }

  static async createReservation(
    timestamp: string,
    userId: string,
    spotId: string,
    kayakReservations: { kayakType: string; duration: string }[],
    paymentId: string,
    priceEur: number
  ) {
    const reservationID = await getUniqueReservationId(DbService.getDb());
    if (!reservationID) {
      return new Error("ERR_UNAVAILABLE_RESERVATION_ID");
    }
    DbService.getDb()
      .collection("reservations")
      .insertOne({
        reservationID,
        timestamp,
        userId,
        spotId,
        kayakReservations,
        paymentId,
        priceEur: priceEur / centsToEurosConversion,
      });
    return { reservationID };
  }

  static getSpot(_id: string, slug: string) {
    const value = !!_id ? { _id: new ObjectId(_id) } : { slug };
    return DbService.getDb().collection("spots").findOne(value);
  }

  private static getDb(): Db {
    if (!db) {
      throw new Error(
        `Can't get DB before connecting. Please, check you're executing connect method`
      );
    }
    return db;
  }
}
