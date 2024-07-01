module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: DataTypes.STRING,
        required: true
      },
      last_name: {
        type: DataTypes.STRING,
        required: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        required: true
      },
      status: {
        type: DataTypes.ENUM('Active', 'InActive')
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
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

  return user;
};
