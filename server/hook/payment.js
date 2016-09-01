Collection.Payment.before.insert((userId, doc) => {
    let orderId = doc.orderId;
    let prefix = orderId + '-';
    doc._id = idGenerator.genWithPrefix(Collection.Payment, prefix, 3);
    doc.change = doc.balance;
    if (doc.paidAmount >= doc.dueAmount) {
        doc.status = 'close'
        doc.balance = 0
    } else {
        doc.status = 'partial'
    }


    // if (doc.paidAmount >= doc.dueAmount) {
    //     doc.status = 'closed';
    //     doc.truelyPaid = doc.dueAmount
    //     doc.balanceAmount = 0
    // } else {
    //     doc.status = 'partial';
    //     doc.truelyPaid = doc.paidAmount;
    // }

});

Collection.Payment.after.insert((userId, doc) => {
    Meteor.defer(() => {
        let orderId = doc.orderId;
        let status;
        let selector = {};
        if (doc.balance==0) {
            // status = doc.status = 'close'
            selector={
                $set:{
                    status:'close'
                }
            }
        }else{
            // status=doc.status='partial'
            selector={
                $set:{
                    status:'partial'
                }
            }
        }
        return Collection.Order.update({
            _id: orderId
        }, selector);
        // updateSale(doc);
    });
})