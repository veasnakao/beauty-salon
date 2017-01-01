//oncreate
Template.editIncomeByStaff.created = function () {
    this.autorun(function () {
        let id = Router.current().params._id;
        this.subscription = Meteor.subscribe('staffs');
        this.subscription = Meteor.subscribe('incomeByStaff', Router.current().params._id);
    }.bind(this));
};

//onrender
Template.editIncomeByStaff.rendered = function() {
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

Template.editIncomeByStaff.helpers({
    data() {
        let id = Router.current().params._id;
        return Collection.IncomeByStaff.findOne({
            _id: id
        });
    }
});

Template.editIncomeByStaff.events({
});

AutoForm.hooks({
    editIncomeByStaff: {
        onSuccess(formType, id){
            // debugger;
            swal({
                title: "Success",
                text: "Update success",
                type: "success",
                timer: 1000,
                showConfirmButton: false,
            });
            let incomeId = Router.current().params._id;
            Meteor.call('showIncomeByStaffDetail', incomeId, (error, result) => {
                if (error) {
                    swal({
                        title: "Error",
                        text: error,
                        type: "error",
                        timer: 3000,
                        showConfirmButton: false
                    });
                } else {
                    Session.set('incomeByStaffDetail', result);
                }
            });
            $("[name='close']").trigger("click");
        },
        onError(formType, error){
            swal({
                title: "Error",
                text:error,
                type:"error",
                timer: 2000
            })
        }
    }
});