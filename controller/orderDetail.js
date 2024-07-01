const bcrypt = require("bcrypt");
const env = require("../config/env");
const { Sequelize } = require("sequelize");

module.exports = (db) => {
    return {
        // Save order
        createOrder: async (req, res) => {
            console.log("request body ", req.body);
            const { user_id, items } = req.body;
            try {
                // Create order first
                const orderDetails = await db.orderDetails.create({ user_id });
                // Prepare order items with the new order ID
                const orderItems = items.map(item => ({
                    ...item,
                    order_id: orderDetails.id
                }));
                // Bulk create order items
                await db.orderItems.bulkCreate(orderItems);

                res.status(201).json({
                    message: "Order and items created",
                    order: orderDetails,
                    items: orderItems,
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "Error creating order", error: err });
            }
        },        
        // Fetch order details by order ID
        getOrderDetailsById: async (req, res) => {
            console.log("orderId",req?.params)
            const { id: orderId } = req.params;
            console.log("orderId",orderId )
            try {
                const order = await db.orderDetails.findOne({
                    where: { id: orderId  },
                    include: [
                        {
                            model: db.orderItems,
                            as: 'items'
                        }
                    ]
                });
                if (!order) {
                    return res.status(404).json({ message: "Order not found" });
                }
                res.status(200).json(order);
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "Error fetching order details", error: err });
            }
        },
         // Fetch all orders by user ID
        getOrdersByUserId: async (req, res) => {
            console.log("req.params",req?.params)
            const { id } = req.params;
            console.log("orderId",id )
            try {
                const orders = await db.orderDetails.findAll({
                    where: { user_id: id},
                    include: [
                        {
                            model: db.orderItems,
                            as: 'items'
                        }
                    ]
                });
                if (!orders) {
                    return res.status(404).json({ message: " No Order found" });
                }
                res.status(200).json(orders);
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "Error fetching order details", error: err });
            }
        },       
    };
};
