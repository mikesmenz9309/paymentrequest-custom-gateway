import axios from 'axios'

export default async (req, res) => {
  console.log(JSON.stringify(req.body))
  if (req.body && req.body.publicToken) {
    try {
      // Validate the request was made by Snipcart
      await axios.get(`https://payment.snipcart.com/api/public/custom-payment-gateway/validate?publicToken=${req.body.publicToken}`)

      // Return the payment methods
      return res.json([{
        id: 'paypast_pay',
        name: 'Payfast',
        checkoutUrl: `https://paymentrequest-custom-gateway-sigma.vercel.app/src/`,
      },{
        id: 'paypast_pay',
        name: 'Payfast',
        checkoutUrl: 'https://paymentrequest-custom-gateway-sigma.vercel.app/src/',
        iconUrl: 'https://paymentrequest-custom-gateway-sigma.vercel.app/src/google_pay.png'
      }])
    }catch(e){
      // Couldn't validate the request
      console.error(e)
      return res.status(401).send()
    }
  }

  // No publicToken provided. This means the request was NOT made by Snipcart
  return res.status(401).send()
}
