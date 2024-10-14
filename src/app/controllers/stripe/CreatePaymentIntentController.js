import Stripe from 'stripe';
import * as Yup from 'yup';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (items) => {
  const total = items.reduce((acc, current) => current.price * current.quantity + acc, 0);
  return total;
};

class CreatePaymentIntentController {
  async store(request, response) {
    const schema = Yup.object({
      products: Yup.array()
        .required()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
            price: Yup.number().required(),
          }),
        ),
    });

    try {
      // Validação dos dados
      schema.validateSync(request.body, { abortEarly: false });

      const { products } = request.body;
      const amount = calculateOrderAmount(products);

      // Criação do Payment Intent com Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'brl',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      // Retorna a resposta JSON com o clientSecret e o link
      return response.json({
        clientSecret: paymentIntent.client_secret,
        dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
      });
    } catch (err) {
      // Trata possíveis erros
      return response.status(400).json({ error: err.errors });
    }
  }
}

export default new CreatePaymentIntentController();
