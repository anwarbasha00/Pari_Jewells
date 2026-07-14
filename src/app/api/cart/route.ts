import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import authOptions from "@/src/lib/auth";
import { connectDB } from "@/src/lib/connectdb";

import Cart from "@/src/models/cart.model";
import Product from "@/src/models/product.model";

export async function GET() {
  try {
    // Check Login
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const cart = await Cart.findOne({
      user: session.user.id,
    }).populate(
      "items.product",
      "name slug price images stock"
    );


    const formattedCart = {
  ...cart.toObject(),
  items: cart.items.map((item: any) => ({
    productId: item.product._id.toString(),
    slug: item.product.slug,
    name: item.product.name,
    image: item.product.images?.[0]?.url || "",
    price: item.product.price,
    quantity: item.quantity,
  })),
};

    return NextResponse.json(
      {
        success: true,
        cart: formattedCart,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cart.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const { productId, quantity = 1 } = await req.json();

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required.",
        },
        {
          status: 400,
        }
      );
    }
    const product = await Product.findById(productId);

if (!product) {
  return NextResponse.json(
    {
      success: false,
      message: "Product not found.",
    },
    { status: 404 }
  );
}

    // Find user's cart
    let cart = await Cart.findOne({
      user: session.user.id,
    });

    // Create cart if it doesn't exist
    if (!cart) {
      cart = new Cart({
        user: session.user.id,
        items: [],
      });
    }

    // Check if product already exists
    const existingItem = cart.items.find(
      (item: any) =>
        item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    // Populate product details
    await cart.populate(
      "items.product",
      "name slug price images inStock"
    );

    const formattedCart = {
  ...cart.toObject(),
  items: cart.items.map((item: any) => ({
    productId: item.product._id.toString(),
    slug: item.product.slug,
    name: item.product.name,
    image: item.product.images?.[0]?.url || "",
    price: item.product.price,
    quantity: item.quantity,
  })),
};
return NextResponse.json(
  {
    success: true,
    cart: formattedCart,
  },
  {
    status: 200,
  }
);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update cart.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const { productId, action } = await req.json();

    if (!productId || !action) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({
      user: session.user.id,
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart not found.",
        },
        { status: 404 }
      );
    }

    const item = cart.items.find(
      (item: any) =>
        item.product.toString() === productId
    );

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found in cart.",
        },
        { status: 404 }
      );
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      item.quantity -= 1;
    }

    // Remove if quantity becomes 0
    cart.items = cart.items.filter(
      (item: any) => item.quantity > 0
    );

    await cart.save();

    await cart.populate(
      "items.product",
      "name slug price images inStock"
    );

     const formattedCart = {
  ...cart.toObject(),
  items: cart.items.map((item: any) => ({
    productId: item.product._id.toString(),
    slug: item.product.slug,
    name: item.product.name,
    image: item.product.images?.[0]?.url || "",
    price: item.product.price,
    quantity: item.quantity,
  })),
};
return NextResponse.json(
  {
    success: true,
    cart: formattedCart,
  },
  {
    status: 200,
  }
);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update cart.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    await connectDB();

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    const cart = await Cart.findOne({
      user: session.user.id,
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Remove Product
    cart.items = cart.items.filter(
      (item: any) =>
        item.product.toString() !== productId
    );

    await cart.save();

    await cart.populate(
      "items.product",
      "name slug price images inStock"
    );

     const formattedCart = {
  ...cart.toObject(),
  items: cart.items.map((item: any) => ({
    productId: item.product._id.toString(),
    slug: item.product.slug,
    name: item.product.name,
    image: item.product.images?.[0]?.url || "",
    price: item.product.price,
    quantity: item.quantity,
  })),
};
return NextResponse.json(
  {
    success: true,
    cart: formattedCart,
  },
  {
    status: 200,
  }
);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove product.",
      },
      {
        status: 500,
      }
    );
  }
}