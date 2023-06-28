import { NextApiRequest, NextApiResponse } from "next";
import { loadStripe } from "@stripe/stripe-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const stripe = await loadStripe(`${process.env.STRIPE_KEY_SECRET}`, {
        apiVersion: "2022-11-15"
      });

      res.status(200).json({ message: "Hello" });
    } catch (error: any) {
      return res.status(error?.statusCode).json(error);
    }
  }
}
