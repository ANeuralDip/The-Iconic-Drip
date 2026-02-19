import {
  Elements,
  CardElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51IqDrCFKltXGJabxrUcI4xhBmlJjwMI2bxx46a6A6aoxltneWNjCDbezWBE10N1tHXRW0P7i8a4zDHOnOLLsGYXo00P1gKJfDe");

const handleSubmit = (stripe, elements) => async () => {
  const cardElement = elements.getElement(CardElement);

  const {error, paymentMethod} = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (error) {
    console.log('[error]', error);
  } else {
    console.log('[PaymentMethod]', paymentMethod);
    // ... SEND to your API server to process payment intent
  }
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <>
      <h1>stripe form</h1>
      <CardElement />
      <button onClick={handleSubmit(stripe, elements)}>Buy</button>
    </>
  );
}

const StripePaymentForm  = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default StripePaymentForm;