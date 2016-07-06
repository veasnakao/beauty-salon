Template.editOrder.created = function () {
    this.autorun(function () {
        let orderDetailId = 
        this.subscription = Meteor.subscribe('orderDetail', Router.current().params.orderId);
    }.bind(this));
};

//onrender
Template.editOrder.rendered = function() {
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

Template.editOrder.helpers({
    itemOrder() {
        var template = Template.instance();
        return Collection.OrderDetail.findOne({
            _id: template.data.id
        });
    }
});

AutoForm.hooks({
    editOrder: {
        before: {
            update(doc) {
                doc.$set.quantity = 10;
                return doc;
            }
        },
        onSuccess(formType, id){
            sAlert.success('Order Edit Success');
        },
        onError(formType, error){
            sAlert.error(error.message);
        }
    }
});