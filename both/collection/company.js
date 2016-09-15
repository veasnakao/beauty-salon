Collection.Company = new Mongo.Collection("company");
Schema.Company = new SimpleSchema({
    companyName: {
        type: String,
        label: "Company Name",
    },
    address:{
        type:String,
        label:"Address"
    },
    tel: {
        type: String,
        label: "Tel",
        optional: true,
        autoform: {
            type: "tel"
        }
    }
});
Collection.Company.attachSchema(Schema.Company);
