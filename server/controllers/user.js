import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Item from "../models/Item.js";
import Transaction from "../models/Transaction.js";



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



export const addToCart = async (req, res) => { // adding or updating cart
  const {userId,itemId,count } = req.body

  try {

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    let cart = await Cart.findOne({ user: userId })

    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalCost: 0, notes: "" })
    }

    const existingItem = cart.items.find((item) => item.item.toString() === itemId)
    if (existingItem) {
      existingItem.count += count
    } else {
      cart.items.push({ item: itemId, count })
    }

    cart.totalCost = calculateTotalCost(cart.items)

    await cart.save()

    return res.status(200).json(cart)
  } catch (error) {
    return res.status(500).json({ error })
  }
}


export const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body

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

    const itemIndex = cart.items.findIndex((item) => item.item.toString() === itemId)

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1)
      cart.totalCost = calculateTotalCost(cart.items)

      await cart.save()

      return res.status(200).json(cart)
    } else {
      return res.status(404).json({ message: "Item not found in cart" })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}



export const makePurchase = async (req, res) => {
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

    const transaction = {
      items: cart.items,
      totalCost: cart.totalCost,
    }

    user.transaction.push(transaction)
    await user.save()

    for (const item of cart.items) {
      const itemInCart = await Item.findById(item.itemId)
      if (!itemInCart) {
        return res.status(404).json({ message: "Item not found" })
      }

      for (const color of itemInCart.colors) {
        for (const size of color.size) {
          const selectedSize = item.selectedSize
          if (color.colorName === item.selectedColor && size.sizeName === selectedSize) {
            size.stock -= item.quantity
            break
          }
        }
      }

      await itemInCart.save()
    }

    cart.items = []
    cart.totalCost = 0
    cart.notes = ""

    await cart.save()

    return res.status(200).json({ message: "Purchase completed successfully" })
  } catch (error) {
    return res.status(500).json({ error })
  }
}



const calculateTotalCost = (items) => {
  let total = 0
  for (const item of items) {
    total += item.count * item.item.price
  }
  return total
}

