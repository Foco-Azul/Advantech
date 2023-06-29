import { NextApiRequest, NextApiResponse } from "next";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_KEY_SECRET}`, {
  apiVersion: "2022-11-15"
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
   const body = JSON.parse(req.body)
   const paymentIntents = await stripe.paymentIntents.create({
    amount:body.amount,
    currency: "usd",
    payment_method_types: ["card"],
    description: body.description
   })

      res.status(200).json(paymentIntents);
    } catch (error: any) {
      return res.status(error?.statusCode).json(error);
    }
  }
}
