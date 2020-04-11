import * as yup from 'yup';
import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';

import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { q = '', id } = req.query;

    const limit = 5;

    const data = await Deliveryman.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
        id: id || {
          [Op.ne]: null,
        },
      },
      include: [
        {
          model: File,
          as: 'avatar',
        },
      ],
      order: [['id', 'asc']],
    });

    return res.send(data);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const deliverymenExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymenExists) {
      return res.status(400).json({ error: 'Deliveryman already exists.' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.send(deliveryman);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email: updatedEmail } = req.body;

    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not exists' });
    }

    if (updatedEmail && updatedEmail !== deliveryman.email) {
      const emailExists = await Deliveryman.findOne({
        where: {
          email: updatedEmail,
        },
      });

      if (emailExists) {
        return res.send({ error: 'Email already exists' });
      }
    }

    const data = await deliveryman.update(req.body);

    return res.send(data);
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).send({ error: 'Deliveryman not exists' });
    }

    await deliveryman.destroy();

    return res.json({ message: 'Deleted' });
  }
}

export default new DeliverymanController();
