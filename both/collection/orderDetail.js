Collection.OrderDetail = new Mongo.Collection("orderDetail");
Schema.OrderDetail = new SimpleSchema({
    orderId:{
        type:String,
        label:"Order"
    },
    itemId:{
        type:String,
        label:"Item"
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
        label: "Customer",
        defaultValue: "0001"
    }
});
Collection.OrderDetail.attachSchema(Schema.OrderDetail);