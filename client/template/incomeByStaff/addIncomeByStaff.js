Template.addIncomeByStaff.onCreated(function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('staffs');
        this.subscription = Meteor.subscribe('incomeByStaff');
    }.bind(this));
});

Template.addIncomeByStaff.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        });
    } catch (e) {
        console.log(e);
    }
};

AutoForm.hooks({
    addIncomeByStaff: {//id autoform
        before: {
            insert: function (doc) {
                doc._id = idGenerator.gen(Collection.IncomeByStaff, 6);
                return doc;
            }
        },
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Add success",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: false
            });
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
        },
        onError(formType, error){
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: false
            })
        }
    }
});