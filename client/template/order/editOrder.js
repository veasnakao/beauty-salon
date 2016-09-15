Template.editOrder.created = function () {
    this.autorun(function () {
        let orderDetailId =
            this.subscription = Meteor.subscribe('orderDetail', Router.current().params.orderId);
    }.bind(this));
};

//onrender
Template.editOrder.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        })
    } catch (e) {
        // console.log(e);
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

//event
Template.editOrder.events({
    'click .editOrder'(){
        let params = Router.current().params;
        let orderId = params.orderId;
        Meteor.call('updateOrderDetail', orderId, (error, result)=> {
            if (error) {
                swal({
                    title: "Error",
                    text:error,
                    type:"error",
                    timer: 3000,
                    showConfirmButton: true
                })
                IonLoading.hide();
            } else {
                IonLoading.hide();
                Session.set('orderId', result);
            }
        });
    },
    'keyup .js-quantity'(){
        let quantity = $('.js-quantity').val();
        let price = $('.js-price').val();
        let discount = $('.js-discount').val();
        let amount = 0;
        amount = (quantity * price) - ((discount / 100) * quantity * price);
        $('.js-amount').val(amount);
    },
    'keypress .js-quantity' (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'keyup .js-discount'(){
        let quantity = $('.js-quantity').val();
        let price = $('.js-price').val();
        let discount = $('.js-discount').val();
        let amount = 0;
        amount = (quantity * price) - ((discount / 100) * quantity * price);
        $('.js-amount').val(amount);
    },
    'keypress .js-discount'(evt){
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    }
});

AutoForm.hooks({
    editOrder: {
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Order update success",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: true
            })
        },
        onError(formType, error){
            swal({
                title: "Error",
                text:error,
                type:"error",
                timer: 3000,
                showConfirmButton: true
            })
        }
    }
});