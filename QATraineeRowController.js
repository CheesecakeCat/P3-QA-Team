({
    /*
     * Calls the SingleTrainee function in the apex controller and populates the 
     * aura attribute with the returned value.
     * *Return value is hardcoded at present*
     */ 
	getTrainee : function(component, event, helper) {
        /*The init function needs to populate the component with existing data*/
        var action = component.get("c.GetTraineeInfo");
        action.setParams({
            Training_Assignment_Id : component.get("v.trainingAssignmentID")
        });
        action.setCallback(this, function(response){
           var state = response.getState();
            if(state === "SUCCESS") {
                component.set("v.trainingAssignment", response.getReturnValue());
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
            component.set("v.QCStatus", "Superstar");
        }
        else if(component.get("v.icon") == "fa fa-star fa-2x")
        {
            component.set("v.icon", "fa fa-smile-o fa-2x");
            component.set("v.iconLabel", "Good");
            component.set("v.QCStatus", "Good");
        }
        else if(component.get("v.icon") == "fa fa-smile-o fa-2x")
        {
            component.set("v.icon", "fa fa-meh-o fa-2x");
            component.set("v.iconLabel", "Fair");
            component.set("v.QCStatus", "Average");
        }
        else if(component.get("v.icon") == "fa fa-meh-o fa-2x")
        {
            component.set("v.icon", "fa fa-frown-o fa-2x");
            component.set("v.iconLabel", "Poor");
            component.set("v.QCStatus", "Poor");
        }
        else
        {
  			component.set("v.icon", "fa fa-question-circle fa-2x");
            component.set("v.iconLabel", "Click to update your feedback.");
            component.set("v.QCStatus", "Undefined");
        }
        //Call recalcuateBatch to refresh the overall feedback.
    },
    /*
     * Whenever the user blurs away from the trainee note section, this function saves
     * the user's final result to the database, passing the following variables to the
     * apex controller; 
     * 		-The trainee's training assignment ID.
     * 		-The contents of the note section.
     * 		-The week number of the quality audit.
     */ 
    handleBlurOnNote : function(component, event, helper) {
        var action = component.get("c.SaveTraineeNote");
        action.setParams({
           Training_Assignment_Id : component.get("v.trainingAssignmentID"),
            Note : component.get(("v.NoteContent")),
            Week_Number : component.get("v.WeekNumber")
        });
        action.setCallback(this, function(response) {
           var state = response.getState();
            if(state === "SUCCESS")
            {
                console.log('Save was successful');
            }
        });
        $A.enqueueAction(action);
        alert(component.get("v.NoteContent"));
    },
    
    /*
     * Whenever the user blurs away from the QC assessment icon, this function
     * saves the user's final selection to the database, passing the following variables
     * to the apex controller;
     * 		-The trainee's training assessment ID.
     * 		-The trainee's QC assessment value.
     * 		-The week number for the quality audit.
     */ 
    handleBlurOnQC : function(component, event, helper) {
        var action = component.get("c.SaveTraineeQC");
        action.setParams({
            Training_Assignment_Id : component.get("v.trainingAssignmentID"),
            Assessment : component.get("v.QCStatus"),
            Week_Number : component.get("v.WeekNumber")
        });
        action.setCallback(this, function(response) {
           var state = response.getState();
            if(state === "SUCCESS")
            {
                console.log('Save was successful');
            }
        });
        $A.enqueueAction(action);
        alert(component.get("v.QCStatus"));
    }
})