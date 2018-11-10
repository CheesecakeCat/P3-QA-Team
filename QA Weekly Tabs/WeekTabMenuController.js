({
    
    doInit : function(cmp, evnt, hlpr){
        var action = cmp.get('c.getCurrentBatch');
        action.setCallback(this, function(response){
            // this will pre-load all of the weeks from week 1 to the training's
            // current 'Caliber Number of Weeks' field
            if(response.getState()==='SUCCESS'){
                cmp.set('v.currentBatch',response.getReturnValue());
                console.log(cmp.get('v.currentBatch.Caliber_Number_of_Weeks__c'));
                console.log(cmp.get('v.currentBatch'));
                for(let i=0;i<cmp.get('v.currentBatch.Caliber_Number_of_Weeks__c')-1;i++){
                    hlpr.addTab(cmp,evnt);
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    // Use handleActive to set the active content, see details in the helper
    handleActive: function (cmp, event, helper) {
        helper.handleActive(cmp, event);
    },
    // Creates a new tab
    handleAddTab: function(component, event,helper) {
        console.log(document.getElementById('addTab').innerHTML);
        helper.addTab(component,event);
        var action = component.get('c.incrementWeek');
        action.setParams({'currentBatch':component.get('v.currentBatch')});
        action.setCallback(this, function(response){
            if(response.getState()==='SUCCESS'){
                component.set('v.currentBatch',response.getReturnValue());
                
            }
        });
        $A.enqueueAction(action);
        
    },
    addContent : function(component, event) {
        var tab = event.getSource();
        // replace the bellow section with what we wish to add in the tab
        /*  switch (tab.get('v.id')){
            case 'new':
                // Display a badge in the tab content.
                // You can replace lightning:badge with a custom component.
                $A.createComponent("lightning:badge", {
                    "label": "NEW"
                }, function (newContent, status, error) {
                    if (status === "SUCCESS") {
                        tab.set('v.body', newContent);
                    } else {
                        throw new Error(error);
                    }
                });
                break;
        } */
    },
    testFocus : function(component,event,helper){
        console.log('focus');
    }
})