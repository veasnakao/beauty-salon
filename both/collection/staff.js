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