import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

class CheckoutDetailCardBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'SuperEz Inc.',
      amount: 1000000,
      email: 'eddy.fidel0809@gmail.com',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      currency: 'USD',
      locale: 'auto'
    };
  }

  onToken = (token) => {
    const {
      amount,
      currency,
    } = this.state;

    fetch('https://api.getsuperez.com/payments/checkout', {
      method: 'POST',
      body: JSON.stringify({
        token: token.id,
        amount: amount
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(response => {
      response.json().then(data => {
        alert('Payment has been processed');
      });
    });
  }

  render() {
    const {
      name,
      amount,
      email,
      image,
      currency,
      locale,
    } = this.state;

    return (
      <div className="card-body">
        <StripeCheckout
          name={name}
          amount={amount}
          email={email}
          image={image}
          currency={currency}
          locale={locale}
          shippingAddress
          billingAddress={true}
          zipCode={true}
          token={this.onToken}
          stripeKey="pk_test_CSlFqyxWGcM7z5UMRsxE2kyC"
        />
      </div>
    );
  }
}

export default CheckoutDetailCardBody;
