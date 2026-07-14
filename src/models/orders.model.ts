import mongoose, { Schema, models } from "mongoose";
import User from "./user.model";
import Product from "./product.model";
interface OrderItem {
  productId: mongoose.Types.ObjectId;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface Order {
  user?: mongoose.Types.ObjectId;

  items: OrderItem[];

  shippingAddress: ShippingAddress;

  paymentMethod: "Cash on Delivery" | "Online";
  paymentStatus: "Pending" | "Paid";

  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;

  subtotal: number;

  deliveryCharge: number;

  total: number;

  status:
    | "Pending"
    | "Confirmed"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
}

const orderSchema = new Schema<Order>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        name: {
          type: String,
          required: true,
        },

        image: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },
    paymentStatus: {
  type: String,
  enum: ["Pending", "Paid"],
  default: "Pending",
},

razorpayOrderId: {
  type: String,
},

razorpayPaymentId: {
  type: String,
  unique: true,
  sparse: true,
},

razorpaySignature: {
  type: String,
},

    subtotal: {
      type: Number,
      required: true,
    },

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order =
  models.Order ||
  mongoose.model<Order>("Order", orderSchema);

export default Order;