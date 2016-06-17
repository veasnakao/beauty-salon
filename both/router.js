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

    //expense
    this.route('showExpense');
    this.route('expenseInfo',{
        path:'/expenseInfo/:_id'
    });
});