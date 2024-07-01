module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define(
    "reviews",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.DECIMAL(10, 1),
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
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
      }
    },
    {
      timestamps: false,
    }
  );
  reviews.associate = function(models) {
    reviews.belongsTo(models.products, { foreignKey: 'item_id', as: 'product' });
  }

  return reviews;
};
