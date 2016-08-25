//oncreated
Template.journalEntryDetail.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('journalEntry', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.journalEntryDetail.rendered = function () {
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
Template.journalEntryDetail.helpers({
    dayExpenseDetail: ()=> {
        let data = {};
        let content = [];
        var list = Collection.DayExpense.find();
        list.forEach((obj)=> {
            for (let key in obj.expenseItem) {
                content.push(obj.expenseItem[key]);
            }
        });
        data.content = content;
        return data;
    },
    totalDayExpense: ()=> {
        let data = {};
        let content = [];
        let totalPaid = 0;
        var list = Collection.DayExpense.find();
        list.forEach((obj)=> {
            let totalAmount = 0;
            for (let key in obj.expenseItem) {
                let getItemExpense = obj.expenseItem[key];
                totalAmount += getItemExpense.price;
            }
            obj.totalPaid = totalAmount;
            obj.date = moment(obj.date).format('DD/MM/YYYY');
            content.push(obj);
        });
        data.content = content;
        return data;
    }
});