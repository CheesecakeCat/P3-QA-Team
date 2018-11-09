({
	myAction : function(component, event, helper) {
		
	},
    changeIcon : function(component, event, helper) {
        //var action = component.find("icon");
        //Creates a map to hold all the correct image according to the value
        var iconMap = new Map();
        iconMap.set(0,"fa fa-question-circle fa-2x");
        iconMap.set(1,"fa fa-frown-o fa-2x");
        iconMap.set(2,"fa fa-meh-o fa-2x");
        iconMap.set(3,"fa fa-smile-o fa-2x");
        iconMap.set(4,"fa fa-star fa-2x");
        
        //var test = "utility:event";
        var iconValue = component.get("v.qcValue");
        component.set("v.iconType",iconMap.get(iconValue));
        
        if(iconValue < 4){
        	iconValue++;
        }else{
            iconValue = 0;
        }
        component.set("v.qcValue",iconValue);
        
    }
})