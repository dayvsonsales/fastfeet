import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const limit = 5;

    const deliveries = await DeliveryProblem.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      include: [
        {
          model: Delivery,
          as: 'delivery',
          required: true,
        },
      ],
      order: [['id', 'asc']],
    });

    return res.json(deliveries);
  }
}

export default new DeliveryProblemController();
