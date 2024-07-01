module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "categories",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    
      name: {
        type: DataTypes.STRING(255),
        required: true
      },
      description: {
        type: DataTypes.TEXT,
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
      }
    },
    {
      timestamps: false,
    }
  );

  categories.associate = function(models) {
    categories.hasMany(models.products, { foreignKey: 'cat_id' });
  };

  return categories;
};
