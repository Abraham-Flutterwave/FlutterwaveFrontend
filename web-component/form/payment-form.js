class PaymentForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // Create the form element
      const form = document.createElement('form');
      form.innerHTML = `
        <style>
          .form-group {
            margin-bottom: 15px;
          }
          .form-group label {
            display: block;
            margin-bottom: 5px;
          }
          .form-group input {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
          }
          button {
            padding: 10px 20px;
            background-color: #f5a623;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
          }
        </style>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="number" id="amount" name="amount" required>
        </div>
        <div class="form-group">
          <label for="currency">Currency</label>
          <input type="text" id="currency" name="currency" value="NGN" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="tel" id="phone" name="phone" required>
        </div>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <button type="submit">Pay Now</button>
      `;
  
      // Append form to shadow DOM
      this.shadowRoot.append(form);
  
      // Handle form submission
      form.addEventListener('submit', (event) => this.handleSubmit(event));
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const form = this.shadowRoot.querySelector('form');
  
      const paymentParams = {
        public_key: this.getAttribute('public-key'),
        tx_ref: `tx-${Date.now()}`,
        amount: form.amount.value,
        currency: form.currency.value,
        payment_options: this.getAttribute('payment-options'),
        customer: {
          email: form.email.value,
          phone_number: form.phone.value,
          name: form.name.value,
        },
        customizations: {
          title: this.getAttribute('title'),
          description: this.getAttribute('description'),
          logo: this.getAttribute('logo'),
        },
      };
  
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
  
  // Define the custom element
  customElements.define('payment-form', PaymentForm);