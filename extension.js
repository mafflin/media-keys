/*jshint esversion: 6 */

const St = imports.gi.St;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const Util = imports.misc.util;

const iconPrev = new St.Icon({
  icon_name: 'media-skip-backward-symbolic',
  style_class: 'system-status-icon'
});
const iconPause = new St.Icon({
  icon_name: 'media-playback-pause-symbolic',
  style_class: 'system-status-icon'
});
const iconNext = new St.Icon({
  icon_name: 'media-skip-forward-symbolic',
  style_class: 'system-status-icon'
});

let buttonPrev = new St.Button({ style_class: 'panel-button'});
let buttonPause = new St.Button({ style_class: 'panel-button'});
let buttonNext = new St.Button({ style_class: 'panel-button'});

function _pause() {
  Util.spawn(['xdotool', 'key', 'XF86AudioPlay']);
}

function _prev() {
  Util.spawn(['xdotool', 'key', 'XF86AudioPrev']);
}

function _next() {
  Util.spawn(['xdotool', 'key', 'XF86AudioNext']);
}

function init() {
  buttonPrev.set_child(iconPrev);
  buttonPrev.connect('button-press-event', _prev);

  buttonPause.set_child(iconPause);
  buttonPause.connect('button-press-event', _pause);

  buttonNext.set_child(iconNext);
  buttonNext.connect('button-press-event', _next);
}

function enable() {
  Main.panel._rightBox.insert_child_at_index(buttonNext, 2);
  Main.panel._rightBox.insert_child_at_index(buttonPause, 2);
  Main.panel._rightBox.insert_child_at_index(buttonPrev, 2);
}

function disable() {
  Main.panel._rightBox.remove_child(buttonPrev);
  Main.panel._rightBox.remove_child(buttonPause);
  Main.panel._rightBox.remove_child(buttonNext);
}
