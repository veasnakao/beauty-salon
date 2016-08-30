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
        defaultValue: 0
    },
    dueAmount: {
        type: Number,
        label: "Due Amount ($)",
        decimal: true
    },
    paidAmount: {
        type: Number,
        label: "Paid Amount ($)",
        decimal: true
    },
    return: {
        type: Number,
        label: "Return ($)",
        decimal: true,
        optional: true,
        defaultValue: 0
    },
    customerId: {
        type: String,
        label: "Customer",
        autoform: {
            type: "select",
            options: function () {
                let customer = Collection.Customer.find();
                let list = [];
                customer.forEach(function (obj) {
                    list.push({label: obj.name, value: obj._id})
                });
                return list;
            }
        }
    },
    staffId: {
        type: String,
        label: "Staff",
        autoform: {
            type: "select",
            options: function () {
                let staff = Collection.Staff.find();
                let list = [];
                staff.forEach(function (obj) {
                    list.push({label: obj.name, value: obj._id})
                });
                return list;
            }
        }
    },
    status: {
        type: String,
        label: "Status",
        optional: true,
        defaultValue:"unpaid"
    }
});
Collection.Payment.attachSchema(Schema.Payment);