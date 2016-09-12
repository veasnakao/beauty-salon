Meteor.methods({
    removePayment(orderId){
        let deletePayment = Collection.Payment.remove({orderId: orderId});
        if (deletePayment) {
            return deletePayment;
        }
    }
});