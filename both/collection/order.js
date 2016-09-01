Collection.Order = new Mongo.Collection("order");
Schema.Order = new SimpleSchema({
    date: {
        type: Date,
        label: "Date",
        optional: true
    },
    customerId: {
        type: String,
        label: "Customer",
        optional: true,
        defaultValue:"0001",
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
        optional: true,
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
        optional: true
    },
    total: {
        type: Number,
        label: "Total",
        decimal: true,
        optional: true
    },
    paidAmount: {
        type: Number,
        decimal: true,
        optional: true

    },
    balanceAmount: {
        type: Number,
        decimal: true,
        optional: true
    },
});
Collection.Order.attachSchema(Schema.Order);