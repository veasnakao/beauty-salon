Template.updateCompany.helpers({
    company() {
        let companyId = Template.instance().data.id;
        let company = Collection.Company.findOne(`${companyId}`);
        return company;
    }
});

AutoForm.hooks({
    updateCompany: {
        onSuccess(formType, id){
            swal({
                title: "Success",
                text: "Company update success",
                type: "success",
                timer: 1000,
                confirmButtonColor: "#45B1FC",
                showConfirmButton: true
            })
        },
        onError(formType, error){
            swal({
                title: "Error",
                text: error,
                type: "error",
                timer: 3000,
                showConfirmButton: true
            })
        }
    }
});
