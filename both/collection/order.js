Collection.Order = new Mongo.Collection("order");
Schema.Order = new SimpleSchema({
    date: {
        type: Date,
        label: "Date"
    },
    customerId: {
        type: String,
        label: "Customer"
    },
    status: {
        type: String,
        label: "Status",
        optional: true
    },
    total: {
        type: Number,
        label: "Total",
        decimal: true,
        optional: true
    }
});
Collection.Order.attachSchema(Schema.Order);