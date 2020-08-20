import { hash } from "bcrypt";
import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email?: string;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
  },
  { collection: "users" },
);

UserSchema.pre("save", function (next) {
  const user = this as IUser;
  if (user.isModified("password")) {
    hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch((err) => next(err));
  } else {
    return next();
  }
});

export default model<IUser>("User", UserSchema);
