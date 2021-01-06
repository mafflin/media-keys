'use strict';

const St = imports.gi.St
const Main = imports.ui.main
const GLib = imports.gi.GLib
const Util = imports.misc.util

const executeAction = (action) => Util.spawn(['playerctl', action])

const PANEL_POSITON = 2
const BUTTONS = {
  next: {
    icon: 'media-skip-forward-symbolic',
    action: () => executeAction('next'),
  },
  pause: {
    icon: 'media-playback-pause-symbolic',
    action: () => executeAction('play-pause'),
  },
  prev: {
    icon: 'media-skip-backward-symbolic',
    action: () => executeAction('previous'),
  },
}

const buttons = Object.keys(BUTTONS).map((key) => {
  const button = BUTTONS[key]
  return {
    ...button,
    element: new St.Button({ style_class: 'panel-button' }),
    icon: new St.Icon({
      style_class: 'system-status-icon',
      icon_name: button.icon,
    }),
  }
})

function init() {
  buttons.forEach((button) => {
    button.element.set_child(button.icon)
    button.element.connect('button-press-event', button.action)
  })
}

function enable() {
  buttons.forEach(({ element }) => Main.panel._rightBox.insert_child_at_index(element, PANEL_POSITON))
}

function disable() {
  buttons.forEach(({ element }) => Main.panel._rightBox.remove_child(element))
}
