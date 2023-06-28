import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Item from "../models/Item.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose"


export const getUser = async (req, res) => { // returns the user.
  try {

    const userId = '64929a568726af26b72bb17d'

    const user = await User.findById(userId)

    return res.status(200).json(user)

  } catch (error) {

    return res.status(500).json({error})
  }
}


export const getUserHistory = async (req, res) => { //returns all user transactions

  try {

    //this param supposed to get from middleware
    const userId = '64929a568726af26b72bb17d'

    const user = await User.findById(userId)

    console.log(user)

    const userTransactions = await Promise.all(

        user.transactions.map(transId=> Transaction.findById(transId))
    )


    return res.status(200).json(userTransactions)

  } catch (error) {

        return res.status(500).json({error})

  }
}


export const addToCart = async (req, res) => {
  const { userId, itemId, color, size, count } = req.body;

  try {
    console.log("Received request to add item to cart:", itemId);

    const user = await User.findById(userId);
    console.log("User found:", user);

    let cart = await Cart.findOne({ user: userId });
    console.log("Cart found:", cart);

    if (!cart) {
      console.log("Creating new cart for user:", userId);
      cart = Cart.create({ user: userId, items: [], totalCost: 0, notes: "" });
      user.cart=cart;
      user.save();
    }

    const item = await Item.findById(itemId);
    if (!item) {
      console.log("Item not found:", itemId);
      return res.status(404).json({ message: "Invalid item" });
    }

    const colorObj = item.colors.find((c) => c.colorName === color);
    if (!colorObj) {
      console.log("Color not found:", color);
      return res.status(404).json({ message: "Invalid color" });
    }

    const sizeObj = colorObj.size.find((s) => s.sizeName === size);
    if (!sizeObj) {
      console.log("Size not found:", size);
      return res.status(404).json({ message: "Invalid size" });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.id.toString() === itemId &&
        item.color === color &&
        item.size === size
    );
    if (existingItemIndex !== -1) {
      console.log("Existing item found in cart. Updating count:", cart.items[existingItemIndex]);
      cart.items[existingItemIndex].count += count;
    } else {
      console.log("Adding new item to cart:", itemId);
      cart.items.push({
        id: itemId,
        color: color,
        size: size,
        count: count,
        price: sizeObj.price || item.price, // Retrieve the price from sizeObj if available, otherwise fallback to item price
      });
    }
    cart.totalCost = cart.totalCost+(sizeObj.price || item.price)*count;
    console.log("Updated cart totalCost:", cart.totalCost);

    await cart.save();

    console.log("Cart saved:", cart);

    return res.status(200).json(cart);
  } catch (error) {
    console.log("Error occurred:", error);
    return res.status(500).json({ error });
  }
};


export const removeFromCart = async (req, res) => {
  const { userId, itemId, color, size, count } = req.body;

  try {
    console.log("Received request to remove item from cart:", itemId);

    const user = await User.findById(userId);
    console.log("User found:", user);

    let cart = await Cart.findOne({ user: userId });
    console.log("Cart found:", cart);

    if (!cart) {
      console.log("Cart not found for user:", userId);
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      console.log("Item not found:", itemId);
      return res.status(404).json({ message: "Invalid item" });
    }

    const colorObj = item.colors.find((c) => c.colorName === color);
    if (!colorObj) {
      console.log("Color not found:", color);
      return res.status(404).json({ message: "Invalid color" });
    }

    const sizeObj = colorObj.size.find((s) => s.sizeName === size);
    if (!sizeObj) {
      console.log("Size not found:", size);
      return res.status(404).json({ message: "Invalid size" });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.id.toString() === itemId &&
        item.color === color &&
        item.size === size
    );
    if (existingItemIndex !== -1) {
      console.log("Existing item found in cart. Updating count:", cart.items[existingItemIndex]);
      if (cart.items[existingItemIndex].count <= count) {
        // Remove the item from the cart if the count is less than or equal to the requested count
        cart.items.splice(existingItemIndex, 1);
      } else {
        // Decrease the count of the item in the cart
        cart.items[existingItemIndex].count -= count;
      }

      // Recalculate the total cost based on the updated cart items
     cart.totalCost = cart.totalCost-(sizeObj.price || item.price)*count;
    } else {
      console.log("Item not found in cart:", itemId);
      return res.status(404).json({ message: "Item not found in cart" });
    }

    console.log("Updated cart:", cart);

    await cart.save();

    console.log("Cart saved:", cart);

    return res.status(200).json(cart);
  } catch (error) {
    console.log("Error occurred:", error);
    return res.status(500).json({ error });
  }
};

export const resetCart = async (req, res) => {
  const { userId } = req.body

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" })
    }

    if (cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" })
    }

        cart.items = []
        cart.totalCost = 0
        cart.notes = ""

        await cart.save()

      return res.status(200).json(cart)
  } catch (error) {
    return res.status(500).json({ error })
  }
}



export const makePurchase = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get customer details from the user model
    const { firstName, lastName, address } = user;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Create a new transaction object
    const transaction = new Transaction({
      customerName: `${firstName} ${lastName}`,
      address,
      products: [],
      totalCost: 0,
    });

    // Declare the selectedItem variable outside the loop
    let selectedItem;

    // Update the transaction with purchased items from the cart
    for (const item of cart.items) {
      const { id, color, size, count, price } = item;

      // Find the item in the database
      selectedItem = await Item.findById(id);
      if (!selectedItem) {
        return res.status(404).json({ message: "Invalid item" });
      }

      // Find the color and size in the item
      const colorObj = selectedItem.colors.find((c) => c.colorName === color);
      if (!colorObj) {
        return res.status(404).json({ message: "Invalid color" });
      }

      const sizeObj = colorObj.size.find((s) => s.sizeName === size);
      if (!sizeObj) {
        return res.status(404).json({ message: "Invalid size" });
      }

      // Calculate the total cost for the current item
      const itemTotalCost = price * count;

      // Update the transaction with the purchased item details
      transaction.products.push({
        name: selectedItem.name,
        count,
        size,
      });
      transaction.totalCost += itemTotalCost;

      // Update the inventory for the purchased item
      sizeObj.stock -= count;
    }

    // Save the changes to the selectedItem and mark it as modified
    await selectedItem.save();
    await selectedItem.markModified('colors');

    // Reset the cart
    cart.items = [];
    cart.totalCost = 0;
    cart.notes = "";

    // Save the transaction and updated cart
    await transaction.save();
    await cart.save();

    // Return the updated cart and transaction
    return res.status(200).json({ cart, transaction });
  } catch (error) {
    return res.status(500).json({ error });
  }
};



