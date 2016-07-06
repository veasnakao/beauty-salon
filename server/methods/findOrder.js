Meteor.methods({
    findOrder: function (status) {
        let data = {};
        let content = [];
        let orders = Collection.Order.aggregate([
            {
                $match: {"status":"true"}
            },
            {
                $lookup: {
                    from: "customer",
                    localField: "customerId",
                    foreignField: "_id",
                    as: "_customer"
                }
            }
        ]);
        orders.forEach((obj)=> {
            for (let key in obj._customer) {
                let customer = obj._customer[key];
                obj.customerId = customer._id;
                obj.customerName = customer.name;
                content.push(obj);
            }
        });
        data.content = content;
        return data;
    }
});