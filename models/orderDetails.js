module.exports = (sequelize, DataTypes) => {
  const orderDetails = sequelize.define(
    "orderDetails",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        required: true
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      created_by: {
        type: DataTypes.BIGINT
      },
      updated_by: {
        type: DataTypes.BIGINT
      },
    },
    {
      timestamps: false,
    }
  );

  orderDetails.associate = function(models) {
    orderDetails.hasMany(models.orderItems, {
      foreignKey: 'order_id',
      as: 'items'
    });
  };

  return orderDetails;
};
