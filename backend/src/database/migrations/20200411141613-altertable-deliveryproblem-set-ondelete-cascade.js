module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeConstraint(
      'delivery_problems',
      'delivery_problems_delivery_id_fkey'
    );
  },

  down: (queryInterface) => {
    return queryInterface.addConstraint('delivery_problems', ['delivery_id'], {
      type: 'foreign key',
      name: 'delivery_problems_delivery_id_fkey',
      references: {
        table: 'deliveries',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
};
