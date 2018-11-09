({
    init: function (cmp,event,helper) {
        var options = [];
        var action = cmp.get("c.GetAllYearsWithBatches");
        cmp.set("v.currentYear",new Date().getFullYear().toString());
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var arr = response.getReturnValue();
                arr.forEach(function(element){
                    options.push({value: element.toString(), label:element});
                });
                cmp.set("v.yearOptions",options);
            }
            
        });
        $A.enqueueAction(action);
        helper.changeTrainingForYear(cmp);
        
    },
    updateYearLabel: function (cmp, event,helper) {
        // This will contain the string of the "value" attribute of the selected option
        //var selectedOptionValue = event.getParam("value");
        //alert("Option selected with value: '" + selectedOptionValue + "'");
        //Refreshes the training list to the selected year
        helper.changeTrainingForYear(cmp);
        var yearLabel = event.getSource().get("v.value");
        console.log(event.getParam("value"));
        cmp.set("v.currentYear", yearLabel);


    },
    
    updateTraining: function(cmp,event,helper){
    	var selectedOptionValue = event.getParam("value");
        alert("Option selected with value: '" + selectedOptionValue + "'");
	}
})