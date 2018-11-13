({
	populateCategories : function(component, event, helper) {
        console.log('Inside QACategoriesCovered init. ');
        var burritoAction = component.get("c.doBurrito");
        burritoAction.setParams({ myTrainingID : component.get("v.TrainingID") });
        burritoAction.setCallback(this, function(response) {
           var state = response.getState();
            if(state === "SUCCESS")
            { console.log('you have been burritoed');
        	}
        });
        $A.enqueueAction(burritoAction);
        
		var action = component.get("c.getCategories");
         console.log(component.get("v.TrainingID"));
        var daID = component.get("v.TrainingID");
        action.setParams({ 
            myTrainingID : daID,
            Week_Number : component.get("v.WeekNumber")
        });
        action.setCallback(this, function(response) {
           var state = response.getState();
            if(state === "SUCCESS")
            {
            	component.set("v.categories", response.getReturnValue());
                console.log('categories have been fetched: '+response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	},
    
    WeeksChange: function(cmp, evt) {
        console.log("# weeks has changed");
        console.log("old value: " + evt.getParam("oldValue"));
        console.log("current value: " + evt.getParam("value"));
    }, 
    
    BatchChange: function(cmp, evt) {
        console.log("BatchID has changed");
        console.log("old value: " + evt.getParam("oldValue"));
        console.log("current value: " + evt.getParam("value"));
        //cmp.set("v.TrainingID",evt.getParam("value"));
    }, 

})