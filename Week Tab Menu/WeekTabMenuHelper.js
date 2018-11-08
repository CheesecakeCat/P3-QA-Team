({
    handleActive: function (cmp, event) {
        var tab = event.getSource();
        // When the tab becomes active, find the tab by the id and inject the corresponding content.
        // See this example for how this will need to be done. 
        /*switch (tab.get('v.id')) {
            case 'badge' :
                this.injectComponent('lightningcomponentdemo:exampleBadge', tab);
                break;
        }*/
    },
    injectComponent: function (name, target) {
        // inserts the content into the tab
        $A.createComponent(name, {
            // no attrs
        }, function (contentComponent, status, error) {
            if (status === "SUCCESS") {
                target.set('v.body', contentComponent);
            } else {
                throw new Error(error);
            }
        });
    }
})