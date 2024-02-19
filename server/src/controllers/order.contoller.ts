import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { getAllOrders, postChefEfficiencyToHR, sendOrderChefToPOS, sendOrderUpdateToPOS } from "../services/skeleton.service";

import amqp, { Channel, Connection } from "amqplib"
import { io } from "..";

// OLD
export async function incomingOrder(req: AuthRequest, res: Response) {
  try {
    const { user } = req;
    if (!user) return res.status(401).send({ message: 'Unauthorized' });
    const data = req.body;
    console.log('order data from inside controller======' , data);
    console.log('order data from skeleton 🥳🥳🥳🥳🥳🥳🥳🥳 ======' , data);



    // Emit new order with Socket IO.
    const io = res.locals.io;
    io.to(data.restaurantId.toString()).emit('incoming-order', data);

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in creating a new order." });
  }
}
 


  const queue = "marketplaceOrder"
  let connection: Connection;
  let channel: Channel;
  
  // Connect and Create rabbit mq channel and connection
  export async function connectAndconsumeMQDataForMarketplaceOrders() {
  
    try {
      const ampqServer = "amqps://ujuxbuct:HxHHm8XNtbtohKTPHi30fSdILcP9FhGQ@armadillo.rmq.cloudamqp.com/ujuxbuct"
      connection = await amqp.connect(ampqServer)
      channel = await connection.createChannel();
  
      await channel.assertQueue(queue, { durable: false })
  
      await channel.consume(queue, (data) => {
        if (data) {
          // console.log('data has come');
          const order = JSON.parse(data.content.toString())
          console.log('Order From Queue', order);

          // Emit new order with Socket IO.
        io.to(order.restaurantId.toString()).emit('incoming-order', order);

  
        }
      }, { noAck: true }) // noAck true for now. Make it false when KDS and INVENTORY not giving any more error
  
    } catch (err) {
      console.log(err);
    } finally {
      // if (channel) await channel.close()
    }
  
  }
  
  // Close rabbitmq connection and channel
  export async function closeMQConnection() {
    try {
      if (connection) await connection.close()
      if (channel) await channel.close()
  
    } catch (error) {
      console.log(error);
    }
  }


















export async function addChefToOrder (req: AuthRequest, res: Response) {
  try {
    const user = req.user;
    const token = req.token;
    if (!user || !token) return res.status(401).send({ message: "Unauthorized." });

    const orderId = req.params.orderId;
    const chef = req.body.chef;

    const order = await sendOrderChefToPOS(token, orderId, chef);
    res.send(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error in setting chef for order." });
  }
}

export async function findOrdersByRestaurantId(
  req: AuthRequest,
  res: Response
) {
  try {
    const token = req.token;
    if (!token) return res.status(401).send({ message: "Unauthorized." });

    const orders = await getAllOrders(token);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in finding orders by restaurantId." });
  }
}

export async function changeOrderStatus(req: AuthRequest, res: Response) {
  try {
    const user = req.user;
    const token = req.token;
    if (!user || !token) return res.status(401).send({ message: "Unauthorized." });

    const { orderId, status , type } = req.body;

    if (
      !orderId ||
      (status !== "pending" &&
      status !== "preparing" &&
      status !== "ready" &&
      status !== "complete")
    ) return res.status(400).send({ message: "Invalid fields." });

    const order = await sendOrderUpdateToPOS(token, orderId, status , type);

    if (status === 'ready' || status === 'complete') {
      if (order.chef) {
        const chefId = order.chef.employeeInformation.id;
        const totalPrepTime = order.items.reduce((total, item) => item.item.itemPreparationtime + total, 0);
        const actualPrepTime = (new Date(order.readyTimestamp!).getTime() - new Date(order.preparingTimestamp!).getTime()) / 60000;
        const servedOnTime = totalPrepTime <= actualPrepTime;

        postChefEfficiencyToHR(token, { chefId, orderId: order._id, servedOnTime });
      }
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in updating order status." });
  }
}
