({
	//updates the batches for a year when a new year is chosen
    //defaults to all weeks and all trainees for first batch
    changeBatchesForYear : function(component){
        var actionChangeBatches = component.get("c.getBatchesByYear");
        var yearParam = component.get("v.yearLabel");
        actionChangeBatches.setParams({"year" : yearParam});
        actionChangeBatches.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS"){
                //set batch attributes in component
                component.set("v.allBatches", response.getReturnValue());
                component.set("v.currentBatch", response.getReturnValue()[0]);
                this.buildBatchStrings(component);
            }
        });
        $A.enqueueAction(actionChangeBatches);
    },
    //build strings for the batches to represent them in UI
	buildBatchStrings : function(component) {
		var actionBuildBatchString = component.get("c.buildBatchStrings");
        var trainingsParam = component.get("v.allBatches");       
        actionBuildBatchString.setParams({"trainings" : trainingsParam});
        actionBuildBatchString.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS"){
                component.set("v.allBatchLabels", response.getReturnValue());
                component.set("v.batchLabel", response.getReturnValue()[0]);
            }
        });
        $A.enqueueAction(actionBuildBatchString);
	},
    
    //fires event when any aspect of the report filter changes
    //if all weeks or all trainees is selected passes in -1 for them
    //if batch is null passes in -1
    fireReportFilterChange : function(component){
        var reportFilterEvent = component.getEvent("reportFilterChange");
        var batch = component.get("v.currentBatch");
        var batchId = batch == null ? null : batch.Id;
        var trainee = component.get("v.currentTrainee");
        var traineeId = trainee == null ? null : trainee.Id;
        console.log("batch id: " + batchId);
        console.log("trainee id: " + traineeId);
        reportFilterEvent.setParams({"batchId" : batchId, "traineeId" : traineeId});
        reportFilterEvent.fire();
    }
})