import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public refreshToken?: string | null;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    refreshToken: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, modelName: "User", tableName: "users", timestamps: true }
);

export default User;
