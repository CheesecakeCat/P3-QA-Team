({
    
    //load default data upon opening reports page
    doInitYears : function(component, event, helper){
        var actionInit = component.get("c.GetAllYearsWithBatches");
        actionInit.setCallback(this, function(response){
            
        //creates an empty list to store integers.
        var options = [
        ];
            
        var state = response.getState();
        if (state === "SUCCESS"){
                
                //takes the returned integer values from the function "GetAllYearsWithBatches"
                var arr = response.getReturnValue() ; 
                console.log(arr);
                //Pushes the data into our empty list "options".
                arr.forEach(function(element) {
                    options.push({ value: element, label: element});
                });
                
                component.set("v.allYears", options);
            }
        });
        $A.enqueueAction(actionInit);
        helper.changeBatchesForYear(component);
    },
    //update the year label when user chooses a year
	updateYearLabel : function(component, event, helper) {
		var menuItemLabel = event.getSource().get("v.placeholder"); 
        component.set("v.yearLabel", menuItemLabel);
        helper.changeBatchesForYear(component);
	},
    //update the batch label when user chooses a batch
    updateBatchLabel : function(component, event, helper) {
    	var menuItemLabel = event.getSource().get("v.label"); 
        component.set("v.batchLabel", menuItemLabel);
        helper.setCurrentBatch(component);
	},
    
    
    
    
    //Function that loads the options. Called from the component.
    loadOptions: function (cmp, event, helper) {
        
        //creates an empty list to store strings.
        var options = [
        ];
        
        //calls the function that queries for names inside the apex controller.
        var action = cmp.get("c.getDepartment");
        
        //Sets up the callback that fires upon interacting with the component on the screen.
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //takes the returned string values from the function "getDepartment"
                var arr = response.getReturnValue() ;
                
                //Pushes the data into our empty list "options".
                arr.forEach(function(element) {
                    options.push({ value: element, label: element });
                });
                
                /*This right here does the magic! It returns the list of Strings needed to appear 
                in the dropdown back in the component. */
                cmp.set("v.statusOptions", options);
                
            }
            
            
        });
        $A.enqueueAction(action);
        
    },
    
    /*Ignore the rest. This logic was used for the table info in the example, but keeping
      it because it'll be the key to linking the information pages on click. */
    handleOptionSelected: function (cmp, event) {
        var action = cmp.get("c.getContactsByDept");
        action.setParams({deptName:event.getParam("value")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.contacts" ,  response.getReturnValue() ) ; 
            }
        });
        $A.enqueueAction(action); 
        
    }
})