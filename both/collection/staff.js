Collection.Staff = new Mongo.Collection("staff");
Schema.Staff = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select",
            options: function () {
                return [
                    // {label: '(Select One)', value: ''},
                    {label: 'Male', value: 'Male'},
                    {label: 'Female', value: 'Female'}
                ];
            }
        }
    },
    fee: {
        type: Number,
        label: "Fee (%)",
        decimal: true,
        optional: true
    },
    baseSalary: {
        type: Number,
        label: "Base Salary ($)",
        decimal: true,
        optional: true
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
Collection.Staff.attachSchema(Schema.Staff);

//search staff
Collection.Staff.search = function (query, limit) {
    let limitAmount = limit || 10;
    if (!query) {
        return;
    }
    let regPattern = `${query}`;
    let reg = new RegExp(regPattern, 'i');//match all case
    let selector = {};
    selector.$or = [{
        name: {
            $regex: reg
        }
    }];
    let staffs = Collection.Staff.find(selector, {
        sort: {
            _id: 1
        },
        limit: limitAmount
    });
    return staffs;
};