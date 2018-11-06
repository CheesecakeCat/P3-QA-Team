({
	getTrainee : function(component, event, helper) {
        var action = component.get("c.SingleTrainee");
        action.setCallback(this, function(response){
           var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.trainee", response.getReturnValue());
                console.log(response.getReturnValue());
            }
            else
            {
                console.log("Response was: " + state);
            }
        });
        $A.enqueueAction(action);
	},
    
    getTrainees : function(component, event, helper) {
        var action = component.get("c.MultipleTrainees");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS")
            {
                component.set("v.trainees", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    handleClick : function(component, event, helper) {
        //In each block, the corresponding QC score should be passed to the database to be saved.
        if(component.get("v.icon") == "utility:question")
        {
            component.set("v.icon", "utility:favorite");
            component.set("v.iconLabel", "Excellent");
        }
        else if(component.get("v.icon") == "utility:favorite")
        {
            component.set("v.icon", "utility:smiley_and_people");
            component.set("v.iconLabel", "Good");
        }
        else if(component.get("v.icon") == "utility:smiley_and_people")
        {
            component.set("v.icon", "utility:sentiment_neutral");
            component.set("v.iconLabel", "Fair");
        }
        else if(component.get("v.icon") == "utility:sentiment_neutral")
        {
            component.set("v.icon", "utility:sentiment_negative");
            component.set("v.iconLabel", "Poor");
        }
        else
        {
  			component.set("v.icon", "utility:question");
            component.set("v.iconLabel", "Click to change Trainee Assessment");
        }
        //Call recalcuateBatch and refresh the overall feedback.
    }
})