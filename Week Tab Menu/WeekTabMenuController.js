({
    // Use handleActive to set the active content, see details in the helper
    handleActive: function (cmp, event, helper) {
        helper.handleActive(cmp, event);
    },
    // Creates a new tab
     addTab: function(component, event) {
         // Find how many 'extra' tabs exist already, then adjust the number to
         // match what the new tab's label and Id will be
         var i = component.get("v.moretabs").length;
         i = i+2; // if there are no extra tabs, i starts at 0, so first created tab should be Week 2
        $A.createComponent("lightning:tab", {
            // first create the new tab component, give it the same format as the other tabs
            "label": "Week "+i,
            "id": "Week"+i,
            "class": "slds-m-left_large, weekly-tab",
            "onactive": component.getReference("c.addContent")
        }, function (newTab, status, error) {
            // add that tab!
            if (status === "SUCCESS") {
                // this way, the new tab is appened to moretabs, instead of just overriding. 
                var body = component.get("v.moretabs");
                body.push(newTab)
                component.set("v.moretabs", body);
            } else {
                throw new Error(error);
            }
        });
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
    }
})