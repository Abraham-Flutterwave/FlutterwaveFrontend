class PaymentButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // Creating a button element
      const button = document.createElement('button');
      button.textContent = this.getAttribute('label') || 'Pay Now';
      button.style.cssText = `
        padding: 10px 20px;
        background-color: #f5a623;
        border: none;
        color: white;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
      `;
  
      // Appending button to shadow DOM
      this.shadowRoot.append(button);
  
      // Binding the click event
      button.addEventListener('click', () => this.makePayment());
    }
  
    makePayment() {
      // Flutterwave payment parameters
      const paymentParams = {
        public_key: this.getAttribute('public-key'),
        tx_ref: this.getAttribute('tx-ref'),
        amount: this.getAttribute('amount'),
        currency: this.getAttribute('currency'),
        payment_options: this.getAttribute('payment-options'),
        customer: {
          email: this.getAttribute('customer-email'),
          phone_number: this.getAttribute('customer-phone'),
          name: this.getAttribute('customer-name'),
        },
        customizations: {
          title: this.getAttribute('title'),
          description: this.getAttribute('description'),
          logo: this.getAttribute('logo'),
        },
      };
  
      // Loading Flutterwave SDK and initiating payment
      this.loadFlutterwaveScript().then(() => {
        FlutterwaveCheckout(paymentParams);
      });
    }
  
    loadFlutterwaveScript() {
      return new Promise((resolve, reject) => {
        if (document.querySelector('script#flutterwave-js')) {
          resolve();
          return;
        }
  
        const script = document.createElement('script');
        script.id = 'flutterwave-js';
        script.src = 'https://checkout.flutterwave.com/v3.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.append(script);
      });
    }
  }
  
  // Defining the custom element
  customElements.define('flutterwave-payment-button', PaymentButton);
  