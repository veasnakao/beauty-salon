Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function () {
    this.route('index', {path: '/'});
    
    //staff
    this.route('showStaff');
    this.route('staffInfo', {
        path: '/staffInfo/:_id'
    });
    
    //item
    this.route('showItem');
    this.route('itemInfo',{
        path:'/itemInfo/:_id'
    });
    
    //customer
    this.route('showCustomer');
    this.route('customerInfo',{
        path:'/customerInfo/:_id'
    });

    //expenseItem
    this.route('showExpenseItem');
    this.route('expenseItemInfo',{
        path:'/expenseItemInfo/:_id'
    });

    //dayExpense
    this.route('showDayExpense');
    this.route('dayExpenseDetail',{
        path:'/dayExpenseDetail/:_id'
    });

    //order
    this.route('showOrder');
    this.route('orderDetail',{
        path:'/orderDetail/:_id'
    });
    this.route('itemOrder',{
        path:'/itemOrder/customerId/:_id'
    });
});