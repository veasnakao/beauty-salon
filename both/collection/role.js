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
                    {label: "Staff", value: 'staff'},
                    {label: "Setting", value: 'setting'}
                ];
            }
        }
    }
})