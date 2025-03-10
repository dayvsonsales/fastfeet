import * as yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Queue from '../../lib/Queue';

import NewDeliveryMail from '../jobs/NewDeliveryMail';

class DeliveryController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { q = '', id, status } = req.query;

    const limit = 5;

    const options = {
      offset: (page - 1) * limit,
      limit,
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          include: [{ model: File, as: 'avatar' }],
        },
        {
          model: File,
          as: 'signature',
        },
      ],
      where: {
        product: {
          [Op.iLike]: `%${q}%`,
        },
        id: id || {
          [Op.ne]: null,
        },
      },
      order: [['id', 'asc']],
    };

    if (status === 'pending') {
      options.where.start_date = null;
      options.where.canceled_at = { [Op.eq]: null };
      options.where.end_date = { [Op.eq]: null };
    } else if (status === 'started') {
      options.where.start_date = { [Op.ne]: null };
      options.where.canceled_at = { [Op.eq]: null };
      options.where.end_date = { [Op.eq]: null };
    } else if (status === 'canceled') {
      options.where.canceled_at = { [Op.ne]: null };
    } else if (status === 'ended') {
      options.where.end_date = { [Op.ne]: null };
    }

    const deliveries = await Delivery.findAndCountAll(options);

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      recipient_id: yup.number().required(),
      deliveryman_id: yup.number().required(),
      product: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!recipient || !deliveryman) {
      return res
        .status(400)
        .json({ error: 'Recipient or deliveryman invalid' });
    }

    const data = await Delivery.create(req.body);

    data.setDataValue('recipient', recipient);
    data.setDataValue('deliveryman', deliveryman);

    await Queue.add(NewDeliveryMail.key, data);

    return res.json(data);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      recipient_id: yup.number(),
      deliveryman_id: yup.number(),
      product: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).send({ error: 'Validation failed' });
    }

    if (req.body.end) {
      req.body.end_date = new Date();
    }

    const delivery = await Delivery.findByPk(req.params.id);

    const data = await delivery.update(req.body);

    return res.json(data);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    if (!delivery) {
      return res.status(404).send({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json({ message: 'Deleted' });
  }
}

export default new DeliveryController();
