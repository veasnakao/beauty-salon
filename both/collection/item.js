Collection.Item = new Mongo.Collection("item");
Schema.Item = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    },
    price: {
        type: Number,
        label: "Price ($)",
        decimal: true,
        optional: true
    }
});
Collection.Item.attachSchema(Schema.Item);