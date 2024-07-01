module.exports = (sequelize, DataTypes) => {
  const orderItems = sequelize.define(
    "orderItems",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'orderDetails',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
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

  orderItems.associate = function(models) {
    orderItems.belongsTo(models.orderDetails, {
      foreignKey: 'order_id',
      as: 'order'
    });
  };

  return orderItems;
};

