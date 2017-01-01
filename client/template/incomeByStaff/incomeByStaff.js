Tracker.autorun(function () {
    if (Session.get('limitShowIncomeByStaff')) {
        Meteor.call('showIncomeByStaff', Session.get('limitShowIncomeByStaff'), (error, result) => {
            if (error) {
                swal({
                    title: "Error",
                    text: error,
                    type: "error",
                    timer: 3000,
                    showConfirmButton: false
                })
            } else {
                Session.set('showIncomeByStaff', result);
            }
        });
    }
});

//onCreated
Template.showIncomeByStaff.onCreated(function () {
    Session.set('limitShowIncomeByStaff', 10);
    this.subscription = Meteor.subscribe('staffs');
    this.subscription = Meteor.subscribe('incomeByStaff');
});

//onRendered
Template.showIncomeByStaff.onRendered(function () {
    if (Session.get('limitShowIncomeByStaff')) {
        Meteor.call('showIncomeByStaff', Session.get('limitShowIncomeByStaff'), (error, result) => {
            if (error) {
                swal({
                    title: "Error",
                    text: error,
                    type: "error",
                    timer: 3000,
                    showConfirmButton: false
                })
            } else {
                Session.set('showIncomeByStaff', result);
            }
        });
    }
});


//helper
Template.showIncomeByStaff.helpers({
    showIncomeByStaff(){
        if (Session.get('showIncomeByStaff')) {
            return Session.get('showIncomeByStaff');
        }
    },
    countIncomeByStaff(){
        let count = Collection.IncomeByStaff.find().count();
        let limit;
        if(Session.get('limitShowIncomeByStaff')) {
            limit = Session.get('limitShowIncomeByStaff');
        }
        if (count >= 10 && count > limit) {
            return true
        }
    }
});

//event
Template.showIncomeByStaff.events({
    'click .js-incomeByStaff'(){
        let id = this._id;
        Router.go(`/incomeByStaffDetail/${id}`);
    },
    'click .js-load-more'(){
        let limit = Session.get('limitShowIncomeByStaff') + 5;
        Session.set('limitShowIncomeByStaff', limit);
    },
});

//onDestroyed
Template.showIncomeByStaff.onDestroyed(function () {
    Session.set('limitShowIncomeByStaff', undefined);
    Session.set('showIncomeByStaff', undefined);
});
