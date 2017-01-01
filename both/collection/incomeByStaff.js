Collection.IncomeByStaff = new Mongo.Collection("incomeByStaff");
Schema.IncomeByStaff = new SimpleSchema({
    date: {
        type: Date
    },
    type: {
        type: String,
        label: "Journal",
        defaultValue: "income"
    },
    incomeByStaff: {
        type: [Object],
        custom() {
            if (!this.isSet && (!this.operator || (this.value === null || this.value === ""))) {
                return "required";
            }
        }
    },
    'incomeByStaff.$.staffId': {
        type: String,
        label: "Staff",
        autoform: {
            type: "select",
            options: function () {
                let staffs = Collection.Staff.find({status: 'active'});
                if (staffs) {
                    let list = [];
                    staffs.forEach(function (obj) {
                        list.push({label: obj.name, value: obj._id});
                    });
                    return list;
                }
            }
        }
    },
    'incomeByStaff.$.amount': {
        type: Number,
        label: "Amount ($)",
        decimal: true,
        autoform: {
            placeholder: "amount"
        }
    }
});
Collection.IncomeByStaff.attachSchema(Schema.IncomeByStaff);