module.exports = (sequelize, DataTypes) => {
  const products = sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cat_id: {
        type: DataTypes.INTEGER,
        required: true
      },
      name: {
        type: DataTypes.STRING(255),
        required: true
      },
      description: {
        type: DataTypes.TEXT,
        required: true
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
      
      },
      rating: {
        type: DataTypes.DECIMAL(10,1)
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
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


  products.associate = function (models) {
    products.belongsTo(models.categories, { foreignKey: "cat_id", as: "Category" });
    products.hasMany(models.reviews, { foreignKey: "item_id", as: "reviews" });
  };

  return products;
};
