//
// ietabCallback.js
//
// Copyright (C) 2012 yuoo2k
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http:www.gnu.org/licenses/>.
//

/*
Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService)
.logStringMessage('XXX: '+
	window
	.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	.getInterface(Components.interfaces.nsIWebNavigation)
	.QueryInterface(Components.interfaces.nsIDocShellTreeItem)
	.rootTreeItem
	.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	.getInterface(Components.interfaces.nsIDOMWindow)
	.document.getElementById('nav-bar')
);
*/
var mainWindow = window
	.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	.getInterface(Components.interfaces.nsIWebNavigation)
	.QueryInterface(Components.interfaces.nsIDocShellTreeItem)
	.rootTreeItem
	.QueryInterface(Components.interfaces.nsIInterfaceRequestor)
	.getInterface(Components.interfaces.nsIDOMWindow);

var gIeTab = mainWindow.gIeTab;

var IeTabCallback = {
	ready: function() {
		// FIXME: this does not work yet, not implemented.
		alert("ready!");
	},

	newTab: function(url) {
		gIeTab.addIeTab(url);
	},

	closeTab: function() {
		// this only works if 'allow_scripts_to_close_windows' is true
		window.close();
	},

	setTitle: function(title) {
		document.title = title;
	},

	getTitle: function() {
		return document.getElementById("ietab-plugin").title;
	},

	setProgress: function(progress) {
		if(progress <= 0 || progress >= 100)
			document.title = this.getTitle();
		else
			document.title = progress + "% " + this.getTitle();
	},

	setStatusText: function(text) {
		window.status = text; // this does not work if OOPP is turned on. bug of firefox?
	},

	setSecurityIcon: function(id) {
		gIeTab.updateSecureLockIcon();
	},

	setLocation: function(url) {
		gIeTab.updateUrlBar();
	},

	setCommandState: function(id, enabled) {
		// FIXME: this does not work yet
	},

	switchBackToFirefox: function() {
		// switch current IeTab back to Firefox.
		document.location = document.getElementById("ietab-plugin").url;
	},

	// check if the browser needs to handle the key press event
	filterKeyPress: function(keyCode, isAltDown, isCtrlDown, isShiftDown) {
		return gIeTab.filterKeyPress(keyCode, isAltDown, isCtrlDown, isShiftDown);
	}
};

// store the callback object in document, so later gIeTab object can get
// it from document object for each tab when needed.
document.IeTabCallback = IeTabCallback;
