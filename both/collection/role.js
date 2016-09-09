Schema.Roles = new SimpleSchema({
    _id: {
        type: String
    },
    roles: {
        type: [String],
        autoform: {
            type: "select-checkbox",
            options: function () {
                return [
                    {label: "Cashier", value: 'cashier'},
                    {label: "Setting", value: 'setting'},
                ];
            }
        }
    }
})