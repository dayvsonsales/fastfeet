import * as yup from 'yup';
import Delivery from '../models/Delivery';

class EndDeliveryController {
  async store(req, res) {
    const schema = yup.object().shape({
      signature_id: yup.number().required(),
      deliveryman_id: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const delivery_id = req.params.id;
    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    if (req.body.deliveryman_id !== delivery.deliveryman_id) {
      return res.status(400).json({ error: 'You are not allowed' });
    }

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery already canceled' });
    }

    delivery.end_date = new Date();
    delivery.signature_id = req.body.signature_id;

    const data = await delivery.save();

    return res.json(data);
  }
}

export default new EndDeliveryController();
