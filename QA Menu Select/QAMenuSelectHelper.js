({
    changeTrainingForYear : function(cmp,event){
    	var options = [];
        //Grabs all the batches for the year selected
    	var action = cmp.get("c.getBatchesByYear");
        var year = cmp.get("v.currentYear");
        action.setParams({"year":year});
        action.setCallback(this, function(response){
            var state = response.getState();
            //If successful, will set the trainingList attribute
            if(state === "SUCCESS"){
                console.log(response.getReturnValue());
                cmp.set("v.trainingList",response.getReturnValue());
                //Calls buildTrainingStrings to build the label and value for the combobox for trainings
                this.buildTrainingStrings(cmp);
            }
        });
        $A.enqueueAction(action);
        
	},
    
    buildTrainingStrings : function(cmp){
        var action = cmp.get("c.buildBatchStrings");
        //Grabs the list of trainers
        var trainingList = cmp.get("v.trainingList");
        var options = [];
        action.setParams({"trainings":trainingList});
        //Send the list of trainings to build the formatted list of Trainer and start date
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var allStrings = response.getReturnValue();
                var tempString =[];
                //Splits the List of Strings into a List of List of Strings
                for(var i = 0; i < allStrings.length;i++){
                    tempString.push(allStrings[i].split(","));
                    
                }
                //Sets the Combobox: Training id as the value/Formatted trainer name and training start_date as the label
                tempString.forEach(function(element){
                        options.push({value:element[0],label:element[1]});
                    })
                	//Sets the list of trainers and starts dates
                    cmp.set("v.trainingOptions",options);
                	//Sets the value for the selected training
                	cmp.set("v.trainingValue",tempString[0][0]);
            }
        });
        $A.enqueueAction(action);
    }
    
})