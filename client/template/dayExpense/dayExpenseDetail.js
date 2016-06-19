//oncreated
Template.dayExpenseDetail.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('dayExpense', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.dayExpenseDetail.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        })
    } catch (e) {
        console.log(e);
    }
};

//helper
Template.dayExpenseDetail.helpers({
    dayExpenseDetail: ()=> {
        let data = {};
        let content = [];
        // let expenseItem ="";
        // let totalPaid=0;
        // let itemName = "";
        // let itemPrice = "";
        var list = Collection.DayExpense.find();
        list.forEach((obj)=> {
            // expenseItem = obj.expenseItem;
            // let totalAmount =0;
            for (var key in obj.expenseItem) {
                content.push(obj.expenseItem[key]);
            }
            // obj.date = moment(obj.date).format('DD/MM/YYYY');
            // content.push(obj);
        });
        // data.totalPaid = totalPaid;

        data.content=content;
        return data;
    }
});