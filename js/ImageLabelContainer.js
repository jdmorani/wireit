/*global YAHOO,WireIt */
/**
 * Container represented by an image
 * @class ImageLabelContainer
 * @extends WireIt.Container
 * @constructor
 * @param {Object} options
 * @param {WireIt.Layer} layer
 */
WireIt.ImageLabelContainer = function(options, layer) {
   WireIt.ImageLabelContainer.superclass.constructor.call(this, options, layer);
};

YAHOO.lang.extend(WireIt.ImageLabelContainer, WireIt.ImageContainer, {
	
	/** 
    * @property xtype
    * @description String representing this class for exporting as JSON
    * @default "WireIt.ImageLabelContainer"
    * @type String
    */
   xtype: "WireIt.ImageLabelContainer",
	
	/** 
    * @property resizable
    * @description boolean that makes the container resizable
    * @default false
    * @type Boolean
    */
	resizable: false,
	
	/** 
    * @property ddHandle
    * @description (only if draggable) boolean indicating we use a handle for drag'n drop
    * @default false
    * @type Boolean
    */
	ddHandle: false,
	
	/** 
    * @property className
    * @description CSS class name for the container element
    * @default ""WireIt-Container WireIt-ImageLabelContainer"
    * @type String
    */
	className: "WireIt-Container WireIt-ImageContainer",
	
	/** 
    * @property label
    * @description Label String
    * @default "not set"
    * @type String
    */
   label: "not set",
   
 	/** 
     * @property labelTop
     * @description top position of the label
     * @default "20px"
     * @type String
    */   
   labelTop: "30px",

  	/** 
      * @property labelLeft
      * @description left position of the label
      * @default "20px"
      * @type String
    */   
   labelLeft: "70px",
   
   /**
 	 * Add the image property as a background image for the container
    * @method render
    */
   render: function() {
      WireIt.ImageLabelContainer.superclass.render.call(this);
      
  		this.labelField = new inputEx.UneditableField({parentEl: this.bodyEl});
  		this.labelField.setValue(this.label);

  		this.labelField.divEl.style.position = 'absolute';
  		this.labelField.divEl.style.top = this.labelTop;
  		this.labelField.divEl.style.left = this.labelLeft;
  		this.labelField.divEl.style.whiteSpace = 'nowrap';
   }
   
});