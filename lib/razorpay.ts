import Razorpay from 'razorpay';

const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
  });
};

const globalForRazorpay = globalThis as unknown as {
  razorpay: Razorpay | undefined;
};

export const razorpay = globalForRazorpay.razorpay ?? getRazorpayInstance();

if (process.env.NODE_ENV !== 'production') {
  globalForRazorpay.razorpay = razorpay;
}

export default razorpay;
