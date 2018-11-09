({
	populateCategories : function(component, event, helper) {
		var action = component.get("c.getCategories");
        action.setParams({
            Training_Id : component.get("v.TrainingID"),
            Week_Number : component.get("v.WeekNumber")
        });
        action.setCallback(this, function(response) {
           var state = response.getState();
            if(state === "SUCCESS")
            {
            	component.set("v.categories", response.getReturnValue());
            }
        });
	}
})