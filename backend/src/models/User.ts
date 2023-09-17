import { encrypt } from "@contentpi/lib";
import { IUser, IDataTypes } from "../types/";

export default (sequelize: any, DataTypes: IDataTypes): IUser => {
  const User = sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4(),
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: "The username can only contain letters and numbers",
          },
          len: {
            args: [3, 25],
            msg: "The username needs to be between 3 and 25 characters long",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [6, 25],
            msg: "The password needs to be between 6 and 25 characters long",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid email",
          },
        },
      },
      priviledge: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user: IUser) => {
          user.password = encrypt(user.password);
        },
        beforeUpdate: async (user: IUser) => {
          user.password = encrypt(user.password);
        },
      },
    }
  );
  return User;
};
