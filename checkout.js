var generate_hash = function (amount, currency, email, tx_ref, secret_key) {
    return '';
};
var paymentbutton = document.querySelector('button');
paymentbutton.addEventListener('mousedown', function () {
    FlutterwaveCheckout({
        public_key: "FLWPUBK-XXXXXXXXXXXXXXXXXXXXXXX-X",
        tx_ref: "titanic-5394759348934985rdj",
        amount: 200,
        currency: "NGN",
        payload_hash: 'ae67f65421fa6db86663f2174f01025fee4dc74ebc136aa3721f326c4a42c366',
        payment_options: "card, mobilemoneyghana, ussd",
        //   redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
        meta: {
            consumer_id: 23,
            consumer_mac: "92a3-912ba-1192a",
        },
        customer: {
            email: "olaobajua@gmail.com",
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
        onclose: function (incomplete) {
            console.log(incomplete);
        }
    });
});
