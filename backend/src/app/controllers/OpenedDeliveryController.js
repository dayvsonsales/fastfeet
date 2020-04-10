import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

class OpenedDeliveryController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const deliveries = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: {
          [Op.eq]: null,
        },
        canceled_at: {
          [Op.eq]: null,
        },
      },
      order: [['id', 'asc']],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'city'],
        },
      ],
    });

    return res.json(deliveries);
  }
}

export default new OpenedDeliveryController();
