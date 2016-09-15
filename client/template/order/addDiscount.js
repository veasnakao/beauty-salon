Template.addDiscount.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe("orderDetail", Router.current().params.orderId);
        this.subscription = Meteor.subscribe('order', Router.current().params.orderId);
    }.bind(this));
};
Template.addDiscount.rendered = function () {
    try {
        this.autorun(() => {
            if (!this.subscription.ready()) {
                IonLoading.show();
            } else {
                IonLoading.hide();
            }
        });
    } catch (e) {
        // console.log(e);
    }
};
Template.addDiscount.helpers({
    order(){
        let orderId = Router.current().params.orderId;
        let order = Collection.Order.findOne(orderId);
        if (order) {
            let selector = {
                _id: order._id,
                total: order.total,
                discountType: order.discountType,
                discount: order.discount,
                discountVal: order.discountVal,
                discountAmount: order.discountAmount,
                grandTotal: order.grandTotal
            };
            return selector;
        }
    }
});
Template.addDiscount.events({
    'change [name="discountType"]'(){
        discountTotal();
    },
    'keyup [name="discountVal"]'(){
        discountTotal();
    }
});

function discountTotal() {
    let discountType = $("input[name=discountType]:checked").val();
    let discountVal = $("input[name=discountVal]").val();
    let total = $("input[name=total]").val();
    if (discountType == 'c') {
        $("input[name=discountAmount]").val(discountVal);
        let grandTotal = total - discountVal;
        $("input[name=grandTotal]").val(grandTotal);
    } else if (discountType == 'p') {
        let discountAmount = (discountVal / 100) * total;
        discountAmount=numeral(discountAmount).format('00.00');
        $("input[name=discountAmount]").val(discountAmount);
        let grandTotal = total - discountAmount;
        $("input[name=grandTotal]").val(grandTotal);
    }
}

AutoForm.hooks({
    addDiscount: {
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Discount success",
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