Meteor.methods({
    insertOrder(selector){
        var todayDate = moment().format('YYYYMMDD');
        var prefix = todayDate + '-';
        selector._id = idGenerator.genWithPrefix(Collection.Order, prefix, 4);
        selector.total = 0;
        let orderId = Collection.Order.insert(selector);
        return orderId;
    },
    removeSaleIfNoSaleDetailExist(orderId) {
        Meteor.defer(() => {
            Meteor._sleepForMs(500);
            let orderDetail = Collection.OrderDetail.find({
                orderId: orderId
            });
            console.log(orderId);
            if (orderDetail.count() <= 0) {
                Collection.Order.remove(orderId);
            }
        });
    },
    insertStaff(staffId, orderId){
        let staffs = Collection.Staff.find({_id: staffId});
        // orderDetails.forEach((objOrderDetail)=> {
        //     subTotal += objOrderDetail.amount;
        // });
        // let getStaffId = '';
        staffs.forEach((objStaffs)=> {
            staffId = objStaffs._id;
        });
        console.log(`staffId : ${staffId}`);
        Collection.Order.update(orderId, {
            $set: {
                staffId: staffId
            }
        })
    },
    updateOrderStatus(orderId, status){
        let order = Collection.Order.findOne(orderId);
        if (order) {
            Collection.Order.update(orderId, {
                $set: {
                    status: status
                }
            });
        }
    },
    deleteOrder(orderId){
        let deleteOrder = Collection.Order.remove(orderId);
        if (deleteOrder) {
            return deleteOrder;
        }
    }
});
