/*
 * File:   ui-color-bar.js
 * Author: Li XianJing <xianjimli@hotmail.com>
 * Brief:  Color Bar
 * 
 * Copyright (c) 2011 - 2014  Li XianJing <xianjimli@hotmail.com>
 * 
 */

function UIColorBar() {
	return;
}

UIColorBar.prototype = new UIElement();
UIColorBar.prototype.isUIButton = false;
UIColorBar.prototype.isUIColorBar = true;

UIColorBar.prototype.initUIColorBar = function(type, w, h) {
	this.initUIElement(type);	

	this.setBarPosition(0);
	this.setDefSize(w, h);
	this.setTextType(C_SHAPE_TEXT_NONE);
	this.setCanRectSelectable(false, false);
	this.barDierction = 0;

	return this;
}

UIColorBar.prototype.setBarDirection = function(direction) {
	this.barDirection = direction;

	return;
}

UIColorBar.prototype.getBarDirection = function() {
	return this.barDirection;
}


UIColorBar.prototype.setBarPosition = function(position) {
	this.barPosition = position;

	return;
}

UIColorBar.prototype.getBarPosition = function() {
	return this.barPosition;
}

UIColorBar.prototype.shapeCanBeChild = function(shape) {

	return shape.isUIImage || shape.isUIColorTile || shape.isUILabel;
}

UIColorBar.prototype.paintSelfOnly =function(canvas) {
	var ox = 0;
	var oy = 0;
	var v = this.barDirection;
	var n = this.style.lineWidth;
	switch(this.barPosition) {
		case -1:	{
			break;
		}
		case 1:	{
			if(v) {
				ox = this.w - n;
			}
			else {
				oy = this.h - n;
			}
			break;
		}
		default: {
			if(v) {
				ox = Math.floor((this.w - n)>>1);
			}
			else {
				oy = Math.floor((this.h - n)>>1);
			}
		}
	}

	if(v) {
		canvas.moveTo(ox, 0);
		canvas.lineTo(ox, this.h);
	}
	else {
		canvas.moveTo(0, oy);
		canvas.lineTo(this.w, oy);
	}
	
	canvas.lineWidth = this.style.lineWidth;
	canvas.strokeStyle = this.style.lineColor;
	canvas.stroke();

	return;
}

function UIColorBarCreator(w, h) {
	var args = ["ui-color-bar", "ui-color-bar", null, 1];
	
	ShapeCreator.apply(this, args);
	this.createShape = function(createReason) {
		var g = new UIColorBar();

		return g.initUIColorBar(this.type, w, h);
	}
	
	return;
}

