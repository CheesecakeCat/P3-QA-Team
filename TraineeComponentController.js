({
    /*
     * Calls the SingleTrainee function in the apex controller and populates the 
     * aura attribute with the returned value.
     * *Return value is hardcoded at present*
     */ 
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
    
    /*
     * Not in use, intended to call the MultipleTrainees function from the apex controller
     * *Will no be used for the trainee component, but may be used for the overall page*
     */ 
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
    
    /*
    * Whenever the QC assessment icon is clicked, this function checks the current
    * value of the icon attribute and adjusts the value accordingly to update the 
    * icon.
    * This will eventually need to update the database from within the if statement.
    */
    handleClick : function(component, event, helper) {
        
        if(component.get("v.icon") == "fa fa-question-circle fa-2x")
        {
            component.set("v.icon", "fa fa-star fa-2x");
            component.set("v.iconLabel", "Excellent");
        }
        else if(component.get("v.icon") == "fa fa-star fa-2x")
        {
            component.set("v.icon", "fa fa-smile-o fa-2x");
            component.set("v.iconLabel", "Good");
        }
        else if(component.get("v.icon") == "fa fa-smile-o fa-2x")
        {
            component.set("v.icon", "fa fa-meh-o fa-2x");
            component.set("v.iconLabel", "Fair");
        }
        else if(component.get("v.icon") == "fa fa-meh-o fa-2x")
        {
            component.set("v.icon", "fa fa-frown-o fa-2x");
            component.set("v.iconLabel", "Poor");
        }
        else
        {
  			component.set("v.icon", "fa fa-question-circle fa-2x");
            component.set("v.iconLabel", "Click to change Trainee Assessment");
        }
        //Call recalcuateBatch to refresh the overall feedback.
    }
})