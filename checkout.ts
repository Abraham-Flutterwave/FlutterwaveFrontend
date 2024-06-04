interface Window {
    FlutterwaveCheckout: (params: FlutterwavePayload) => void;
}

declare const FlutterwaveCheckout: (param: FlutterwavePayload) => void;

type FlutterwavePayload = {
    public_key: string;
    tx_ref: string;
    amount: number;
    currency: string;
    payment_options: string;
    meta: object;
    payload_hash?: string;
    customer: {
        email: string;
        name: string;
        phone_number: string;
    },
    customizations: {
        title: string;
        description: string;
        logo: string;
    },
    callback: (response: { status: string, tx_ref: string, id: number }) => void,
    onclose: (is_payment_complete: boolean) => void
}

type FlutterwaveCheckoutFunction = (payload: FlutterwavePayload) => void

type FlutterwaveHashGeneratorFunction = (
  amount: number, 
  currency: string, 
  email: string, 
  tx_ref: string, 
  secret_key: string 
) => string

const generate_hash: FlutterwaveHashGeneratorFunction = (amount, currency, email, tx_ref, secret_key) => {
  return ''
}

const paymentbutton  = document.querySelector('button') as HTMLButtonElement;
paymentbutton.addEventListener('mousedown', () => {
    FlutterwaveCheckout({
        public_key: "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X",
        tx_ref: "titanic-5394759348934985rdj",
        amount:200,
        currency: "NGN",
        payload_hash: 'ae67f65421fa6db86663f2174f01025fee4dc74ebc136aa3721f326c4a42c366',
        payment_options: "card, mobilemoneyghana, ussd",
      //   redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
        meta: {
          consumer_id: 23,
          consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
          email: "johndoe@example.com",
          phone_number: "08102909304",
          name: "Rose DeWitt Bukater",
        },
        customizations: {
          title: "Abraham's test",
          description: "Order Payment",
          logo: "",
        },
        callback: function (response) {
          console.log(response);
        },
        onclose: function(incomplete) {
            console.log(incomplete)
        }
      });
})
