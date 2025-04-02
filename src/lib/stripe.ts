import { Alert } from "react-native";
import { supabase } from "./supabase.ts";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
// import { supabase } from "@/lib/supabase";

export const fetchPaymentSheetParams = async (amount: number) => {
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });
  if (data) return data;
  if (error) Alert.alert("Error fetching payment sheet params", error.message);
  return {};
};

export const initialisePaymentSheet = async (amount: number) => {
  console.log("initialisePaymentSheet for :", amount);
  const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(
    amount
  );

  if (!paymentIntent || !publishableKey) return;

  const result = await initPaymentSheet({
    merchantDisplayName: "PizzApp",
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: "John Doe",
    },
  });
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert("Error", error.message);
    return false;
  }
  return true;
};
