Collection.OrderDetail = new Mongo.Collection("orderDetail");
Schema.OrderDetail = new SimpleSchema({
    orderId: {
        type: String,
        label: "Order"
    },
    itemId: {
        type: String,
        label: "ItemId"
    },
    itemName: {
        type: String,
        label: "Item Name"
    },
    price: {
        type: Number,
        label: "Price",
        decimal: true
    },
    discount: {
        type: Number,
        label: "Discount",
        decimal: true,
        defaultValue(){
            return 0;
        }
    },
    quantity: {
        type: Number,
        label: "Quantity"
    },
    customerId: {
        type: String,
        label: "CustomerId",
        defaultValue: "0001"
    },
    customerName: {
        type: String,
        label: "Customer Name"
    }
});
Collection.OrderDetail.attachSchema(Schema.OrderDetail);