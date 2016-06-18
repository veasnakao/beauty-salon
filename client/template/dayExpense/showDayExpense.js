//oncreated
Template.showDayExpense.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('dayExpenses');
    }.bind(this));
};

//onrender
Template.showDayExpense.rendered = function () {
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
Template.showDayExpense.helpers({
    // dayExpenseList:()=>{
    //     return Collection.DayExpense.find({},{sort: {_id:1}});
    // }
    data: ()=> {
        // let item = '';
        let data = {};
        let content = [];
        let item ="";
        let totalPaid=0;
        var list = Collection.DayExpense.find();
        list.forEach((obj)=> {
            item = obj.expenseItem;
            let totalAmount =0;
            for (var index in item) {
                var attr = item[index];
                totalAmount += attr.price;
            }
            totalPaid +=totalAmount;
            obj.totalAmount=totalAmount;
            obj.date = moment(obj.date).format('DD/MM/YYYY');
            content.push(obj);
        });

        data.totalPaid = totalPaid;
        data.content=content;
        return data;
    }
});