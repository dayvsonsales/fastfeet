export function generateSlug(name) {
  const split = name.split(' ');

  let slug;

  if (split.length > 1) {
    slug = `${split[0].substring(0, 1)}${split[1].substring(0, 1)}`;
  } else {
    slug = `${split[0].substring(0, 1)}${split[0].substring(1, 2)}`;
  }

  return slug;
}

export function type(delivery) {
  if (delivery.canceled_at) {
    return 'canceled';
  }

  if (delivery.end_date) {
    return 'delivered';
  }

  if (delivery.start_date) {
    return 'ready';
  }

  return 'pending';
}

export function deliveryStatus(delivery) {
  const deliveryType = type(delivery);

  if (deliveryType === 'ready') {
    return 'Pendente';
  }

  if (deliveryType === 'delivered') {
    return 'Entregue';
  }

  if (deliveryType === 'canceled') {
    return 'Cancelado';
  }

  return 'Aguardando retirada';
}
