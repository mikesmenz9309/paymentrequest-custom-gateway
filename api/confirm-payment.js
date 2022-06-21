import axios from 'axios'

export default async (req, res) => {

  // TODO: Validate the request was approved by your payment gateway (in this case Google Pay)

  // Parse the gateway payment info to match Snipcart's schema
  // This will change depending on the payment gateway you choose
  const paymentSessionId = req.query.sessionId
  const data = {
    paymentSessionId,
    state: 'processed',
    transactionId: req.body.requestId,
    instructions: 'Your payment will appear on your statement in the coming days',
    links: {
      refunds: `https://payment.snipcart.com/api/refund?transactionId=${req.body.requestId}`
    },
  }

  // Add authentification
  // This is the secret API key created in Snipcart's merchant dashboard
  const options = {
    headers: {
      Authorization: 'ZTAzMTJiYTUtZmJkZi00MzEyLTg4ZTktNWFiNWJkYWQ5MzRmNjM3OTE0MTM4OTE0NzQwMDQx'
    }
  }

  try{
    // Confirm payment with Snipcart
    const resp = await axios.post(`${process.env.PAYMENT_URL}/api/private/custom-payment-gateway/payment`,data, options)
    
    // ReturnUrl will redirect the user to the Order confirmation page of Snipcart
    return res.json({
      returnUrl: resp.data.returnUrl
    })
  }catch(e){
    console.error(e)
  }

  return res.status(500).send()
}