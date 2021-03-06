/*
 * File:   ui-button-group.js
 * Author: Li XianJing <xianjimli@hotmail.com>
 * Brief:  Button Group
 * 
 * Copyright (c) 2011 - 2014  Li XianJing <xianjimli@hotmail.com>
 * 
 */

function UIButtonGroup() {
	return;
}

UIButtonGroup.prototype = new UIElement();
UIButtonGroup.prototype.isUIButtonGroup = true;

UIButtonGroup.prototype.initUIButtonGroup = function(type, border, buttonMaxWidth, bg) {
	this.initUIElement(type);	

	this.setMargin(border, border);
	this.setDefSize(300, 60);
	this.setSizeLimit(100, 40, 1000, 120);

	this.buttonMaxWidth = buttonMaxWidth;
	this.widthAttr = C_WIDTH_FILL_PARENT; 
	this.setTextType(C_SHAPE_TEXT_NONE);
	this.setImage(CANTK_IMAGE_DEFAULT, bg);
	this.rectSelectable = false;
	this.addEventNames(["onInit"]);

	if(!bg) {
		this.style.setFillColor("White");
	}

	return this;
}

UIButtonGroup.prototype.shapeCanBeChild = function(shape) {
	if(shape.isUILabel || shape.isUIImage || shape.isUIButton || shape.isUIGroup || shape.isUIRadioBox || shape.isUICheckBox) {
		return true;
	}

	return false;
}

UIButtonGroup.prototype.paintSelfOnly =function(canvas) {
	var image = this.getHtmlImageByType(CANTK_IMAGE_DEFAULT);

	if(!image && !this.isFillColorTransparent()) {
		canvas.beginPath();
		canvas.fillRect(0, 0, this.w, this.h);
	}

	return;
}

UIButtonGroup.prototype.relayoutChildren = function() {
	var border = this.getHMargin();
	var n = this.children.length;

	if(n === 0 || this.disableRelayout) {
		return;
	}

	var x = border;
	var y = border;

	var h = this.h - 2 * border;
	var maxWidth = this.buttonMaxWidth;
	var defaultWidth = Math.floor((this.w - 2 * border)/n);
	var w = Math.min(defaultWidth, maxWidth);

	for(var i = 0; i < n; i++) {
		var child = this.children[i];
		
		x = i * defaultWidth + (defaultWidth - w)/2 + border;

		child.setPosition(x, y);
		child.setSize(w, h);
		child.setUserMovable(false);
		child.setUserResizable(false);
		child.relayoutChildren();
	}
	
	this.w = defaultWidth * n + 2 * border;

	return;
}

UIButtonGroup.prototype.afterChildAppended = function(shape) {
	shape.yAttr = C_Y_MIDDLE_IN_PARENT;

	return true;
}

function UIButtonGroupCreator(border, buttonMaxWidth, bg) {
	var args = ["ui-button-group", "ui-button-group", null, 1];
	
	ShapeCreator.apply(this, args);
	this.createShape = function(createReason) {
		var g = new UIButtonGroup();
		return g.initUIButtonGroup(this.type, border, buttonMaxWidth, bg);
	}
	
	return;
}

