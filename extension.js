'use strict'

const St = imports.gi.St
const Main = imports.ui.main
const GLib = imports.gi.GLib
const Util = imports.misc.util

const executeAction = (action) => Util.spawn(['playerctl', action])

const PANEL_POSITON = 2
const ICON_STYLE_CLASS = 'system-status-icon'
const BUTTON_STYLE_CLASS = 'panel-button'
const BUTTONS = [
  {
    icon: 'media-skip-forward-symbolic',
    action: 'next',
  },
  {
    icon: 'media-playback-pause-symbolic',
    action: 'play-pause',
  },
  {
    icon: 'media-skip-backward-symbolic',
    action: 'previous',
  },
]

const buttons = BUTTONS.map(({ action, icon }) => ({
  action,
  element: new St.Button({ style_class: BUTTON_STYLE_CLASS }),
  icon: new St.Icon({
    style_class: ICON_STYLE_CLASS,
    icon_name: icon,
  }),
}))

function init() {
  buttons.forEach((button) => {
    button.element.set_child(button.icon)
    button.element.connect('button-press-event', () => executeAction(button.action))
  })
}

function enable() {
  buttons.forEach(({ element }) =>
    Main.panel._rightBox.insert_child_at_index(element, PANEL_POSITON),
  )
}

function disable() {
  buttons.forEach(({ element }) => Main.panel._rightBox.remove_child(element))
}
