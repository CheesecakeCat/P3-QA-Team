({
	doBurrito : function(component, event, helper) {
        component.set("v.hidden", "display:none");
        component.set("v.icon", "fa fa-spinner fa-spin");
        setTimeout(function(){
            component.set("v.icon", "fa fa-check");
            setTimeout(function(){
        	component.set("v.icon", "");
            component.set("v.hidden", "display:block");
        	},2000);
        },2000);   
	}
})