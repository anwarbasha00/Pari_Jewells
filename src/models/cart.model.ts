import mongoose, { Schema, models } from "mongoose";

interface CartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

interface Cart {
  user: mongoose.Types.ObjectId;
  items: CartItem[];
}

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart =
  models.Cart ||
  mongoose.model("Cart", cartSchema);

export default Cart;