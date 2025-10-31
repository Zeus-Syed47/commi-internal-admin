'use client';
import { createStripeSession } from '@/api/stripe';
import { loadStripe } from '@stripe/stripe-js';
type props = {
    price_id: string;
    user_id: string;
    company_id: string;
};
const SubscribeComponent = ({ price_id, user_id, company_id }: props) => {
    const handleSubmit = async () => {
        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
        );
        if (!stripe) {
            return;
        }
        try {
            const response = await createStripeSession({
                user_id: user_id,
                price_id: price_id,
                company_id: company_id
            });
            const data = response.data;
            if (!data) throw new Error('Something went wrong');
            await stripe.redirectToCheckout({
                sessionId: data?.id
            });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            Click Below button to get
            <button onClick={handleSubmit}>
                Upgrade in
            </button>
        </div>
    );
};
export default SubscribeComponent;