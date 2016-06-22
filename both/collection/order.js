Collection.Order = new Mongo.Collection("order");
Schema.Order = new SimpleSchema({
    date: {
        type: Date,
        label: "Date"
    },
    customerId: {
        type: String,
        label: "Customer",
        defaultValue: "0001",
        // autoform: {
        //     type: 'universe-select',
        //     afFieldInput: {
        //         uniPlaceholder: 'Please search... (limit 10)',
        //         optionsMethod: 'searchCustomer'
        //     }
        // }
    }
})
;
Collection.Order.attachSchema(Schema.Order);