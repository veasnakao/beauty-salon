Collection.Payment.before.insert((userId, doc) => {
    let orderId = doc.orderId;
    console.log(`orderId ${orderId}`);
    let prefix = orderId + '-';

    doc.change = doc.balance;
    if (doc.paidAmount >= doc.dueAmount) {
        doc.status = 'close'
        doc.balance = 0
    } else {
        doc.status = 'partial'
    }
    doc._id = idGenerator.genWithPrefix(Collection.Payment, prefix, 3);
});

Collection.Payment.after.insert((userId, doc) => {
    Meteor.defer(() => {
        let orderId = doc.orderId;
        let status;
        let selector = {};
        if (doc.balance == 0) {
            // status = doc.status = 'close'
            selector = {
                $set: {
                    status: 'close'
                }
            }
        } else {
            selector = {
                $set: {
                    status: 'partial'
                }
            }
        }
        return Collection.Order.update({
            _id: orderId
        }, selector);
        // updateSale(doc);
    });
})