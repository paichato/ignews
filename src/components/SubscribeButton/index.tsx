import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJS } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: session, status } = useSession();

  const handleSubscribe = async () => {
    if (status === "unauthenticated") {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("auth/subscribe");

      const { sessionId } = response.data;
      const stripe = await getStripeJS();

      if (stripe) console.log("STRIPE:", stripe);

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
};
