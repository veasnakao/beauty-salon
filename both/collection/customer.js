Collection.Customer = new Mongo.Collection("customer");
Schema.Customer = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        // defaultValue: "General",
        max: 200
    },
    customerType: {
        type: String,
        label: "Customer Type",
        autoform: {
            type: "select",
            options: function () {
                return [
                    {label: 'Normal', value: 'Normal'},
                    {label: 'VIP', value: 'VIP'}
                ];
            }
        }
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select",
            options: function () {
                return [
                    {label: 'Male', value: 'Male'},
                    {label: 'Female', value: 'Female'}
                ];
            }
        }
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
Collection.Customer.attachSchema(Schema.Customer);

//customerSearch
Collection.Customer.search = function (query, limit) {
    let limitAmount = limit || 10;
    if (!query) {
        return;
    }
    let regPattern = `${query}`;
    // console.log(`${query}`);
    // let trimRegPattern = regPattern.trim();
    // console.log(trimRegPattern);
    let reg = new RegExp(regPattern, 'i');//match all case
    let selector = {};
    selector.$or = [{
        name: {
            $regex: reg
        }
    }];
    let customers = Collection.Customer.find(selector, {
        sort: {
            name: 1
        },
        limit: limitAmount
    });
    return customers;
};