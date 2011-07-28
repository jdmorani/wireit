(function() {

   var lang = YAHOO.lang;
   var Dom = YAHOO.util.Dom;

/**
 * Copy of the original inputEx.Field class that we're gonna override to extend it.
 * @class BaseField
 * @namespace inputEx
 */
inputEx.BaseField = inputEx.Field;

/**
 * Class to make inputEx Fields "wirable".Re-create inputEx.Field adding the wirable properties
 * @class Field
 * @namespace inputEx
 * @extends inputEx.BaseField
 */
inputEx.Field = function(options) {
   inputEx.Field.superclass.constructor.call(this,options);
};

lang.extend(inputEx.Field, inputEx.BaseField, {

   /**
    * Adds a wirable option to every field
    * @method setOptions
    */
   setOptions: function(options) {
      inputEx.Field.superclass.setOptions.call(this, options);
      
      this.options.wirable = lang.isUndefined(options.wirable) ? false : options.wirable;
      this.options.container = options.container;
      //options.container = null;
   },
   
   /**
    * Adds a terminal to each field
    * @method render
    */
   render: function() {
      inputEx.Field.superclass.render.call(this);
      
      if(this.options.wirable) {
         this.renderTerminal();
      }
   },
   
   /**
    * Render the associated input terminal
    * @method renderTerminal
    */
   renderTerminal: function() {

      var wrapper = inputEx.cn('div', {className: 'WireIt-InputExTerminal'});
        
      this.fieldContainer.appendChild(wrapper);

      //align the terminal to the left
      divs = Dom.getChildren(this.fieldContainer);
      for(i in divs){
        Dom.setStyle(divs[i], 'float', 'left');  
      }

      this.terminal = new WireIt.Terminal(wrapper, {
         name: this.options.name, 
         direction: [0, 0],
         fakeDirection: [0, 0],
         ddConfig: {
            type: "output",
            allowedTypes: ["input"]
         },
      nMaxWires: 1 }, this.options.container);

      // Reference to the container
      if(this.options.container) {
         this.options.container.terminals.push(this.terminal);
      }
      
      //hide the terminal initially
      if(this.getValue() == '')
        this.terminal.el.style.display="none";

      // Register the events
      this.terminal.eventAddWire.subscribe(this.onAddWire, this, true);
      this.terminal.eventRemoveWire.subscribe(this.onRemoveWire, this, true);
      YAHOO.util.Event.addListener(this.terminal.el, "mousedown", this.onMouseDown, this, true);    
    },    

  onMouseDown: function(e){
    this.preventNameDuplication(this);
    return true;
  },

  onChange: function(e) { 
    if(this.options.wirable){            
      this.setValue(this.el.value);      
    }
    inputEx.Field.superclass.onChange.call(this,e);    
  },
  
  onBlur: function(e){
    //make sure the name is not already used by another terminal
    this.preventNameDuplication(this);
    inputEx.Field.superclass.onBlur.call(this,e);
  },

  /**
   * Set the container for this field
   */
  setContainer: function(container) {
    this.options.container = container;
    if(this.terminal && container) {
      this.terminal.container = container;
      if( WireIt.indexOf(this.terminal, container.terminals) == -1 ) {
        container.terminals.push(this.terminal);
      }
    }   
  },

  /**
   * Set the value to be the fieldname which will be used
   * as a terminal.
   * We need to do this because in case of a field nested into a list
   * the field name will be the same and terminals will overlap.
   */ 
  setValue: function(value){         
    inputEx.Field.superclass.setValue.call(this,value);              
    
    if(this.options.wirable){
            
      if(value == ''){
        this.terminal.el.style.display="none";
        this.setFieldName(value)
      }else{
        this.terminal.el.style.display="block";
        this.setFieldName(value)
      }      
    }
  },

  /**
   * also change the terminal name when changing the field name
   */
  setFieldName: function(name) {    
    if(this.terminal) {
      this.options.name = name;
      this.terminal.name = name;
      this.terminal.el.title = name;
    }
  },

    /**
     * Remove the input wired state on the 
     * @method onAddWire
     */
    onAddWire: function(e, params) {
      if(this.options.wirable){
        this.setValue(this.el.value);
      }
      this.options.container.onAddWire(e,params);
      this.disable();
    },

    /**
     * Remove the input wired state on the 
     * @method onRemoveWire
     */
    onRemoveWire: function(e, params) { 
       this.options.container.onRemoveWire(e,params);
       this.enable();
    },

    preventNameDuplication: function(field){
      //make sure the name is not already used by another terminal
      if(typeof field.options.container !== 'undefined' && field.options.container != null){
        for(var i=0;i<field.options.container.terminals.length;i++){
          if(field.terminal != field.options.container.terminals[i] && field.getValue() == field.options.container.terminals[i].name ){
            field.setValue('');
            field.terminal.editable = false;
            return;
          }
        }
        field.terminal.editable = true;
      }      
    }


});

inputEx.Field.groupOptions = inputEx.BaseField.groupOptions.concat([
  { type: 'boolean', label: 'Wirable', name: 'wirable', value: false}
]);

})();