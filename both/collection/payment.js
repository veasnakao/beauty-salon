Collection.Payment = new Mongo.Collection("payment");
Schema.Payment = new SimpleSchema({
    orderId: {
        type: String,
        label: "Order"
    },
    paymentDate: {
        type: Date,
        label: "Payment Date"
    },
    discount: {
        type: Number,
        label: "Discount (%)",
        decimal: true,
        optional: true,
        defaultValue: 0,
        min: 0
    },
    dueAmount: {
        type: Number,
        label: "Due Amount ($)",
        decimal: true,
        min: 0
    },
    paidAmount: {
        type: Number,
        label: "Paid Amount ($)",
        decimal: true,
        min: 0
    },
    balance: {
        type: Number,
        label: "Balance ($)",
        decimal: true,
        defaultValue: 0
    },
    change: {
        type: Number,
        decimal: true,
        optional: true
    },
    status: {
        type: String,
        label: "Status",
        optional: true,
        defaultValue: "unpaid"
    }
});
Collection.Payment.attachSchema(Schema.Payment);