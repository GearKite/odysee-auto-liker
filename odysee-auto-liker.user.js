// ==UserScript==
// @name           Odysee Auto-Liker
// @namespace      https://github.com/Jekabs123/odysee-auto-liker
// @version        1.0.3.1
// @description    Automatically likes Odysee videos
// @author         Jekabs123 (fork from https://github.com/HatScripts/youtube-auto-liker)
// @license        MIT
// @icon           https://raw.githubusercontent.com/Jekabs123/odysee-auto-liker/master/logo.svg
// @match          http*://odysee.com/*
// @require        https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @run-at         document-idle
// @noframes
// @supportURL     https://github.com/Jekabs123/odysee-auto-liker/issues/
// @updateURL      https://github.com/Jekabs123/odysee-auto-liker/blob/master/odysee-auto-liker.user.js
// @downloadURL    https://github.com/Jekabs123/odysee-auto-liker/blob/master/odysee-auto-liker.user.js
// ==/UserScript==

/* global GM_config, GM_info, GM_registerMenuCommand */

(() => {
  'use strict'

  GM_config.init({
    id: 'ytal_config',
    title: GM_info.script.name + ' Settings',
    fields: {
      DEBUG_MODE: {
        label: 'Debug mode',
        type: 'checkbox',
        default: false,
        title: 'Log debug messages to the console'
      },
      CHECK_FREQUENCY: {
        label: 'Check frequency (ms)',
        type: 'number',
        min: 1,
        default: 5000,
        title: 'The number of milliseconds to wait between checking if video should be liked'
      },
      WATCH_THRESHOLD: {
        label: 'Watch threshold %',
        type: 'number',
        min: 0,
        max: 100,
        default: 50,
        title: 'The percentage watched to like the video at'
      },
      LIKE_IF_NOT_SUBSCRIBED: {
        label: 'Like if not subscribed',
        type: 'checkbox',
        default: false,
        title: 'Like videos from channels you are not subscribed to'
      }
    }
  })

  GM_registerMenuCommand('Settings', () => {
    GM_config.open()
  })

  function Debugger (name, enabled) {
    this.debug = {}
    if (!window.console) {
      return () => {}
    }
    for (const m in console) {
      if (typeof console[m] === 'function') {
        if (enabled) {
          this.debug[m] = console[m].bind(window.console, name + ': ')
        } else {
          this.debug[m] = () => {}
        }
      }
    }
    return this.debug
  }

  const DEBUG = new Debugger(GM_info.script.name, GM_config.get('DEBUG_MODE'))

  const SELECTORS = {
    PLAYER: 'video',
  }
  const LIKE_BUTTON_CLICKED_CLASS = 'icon--FireActive'

  const autoLikedVideoIds = []

  setTimeout(wait, GM_config.get('CHECK_FREQUENCY'))
  
  function getVideoId () {
    return location.pathname
  }

  function watchThresholdReached () {
    const player = document.querySelector(SELECTORS.PLAYER)
    if (player && player.clientHeight > 288) {
      return player.currentTime / player.duration >= (GM_config.get('WATCH_THRESHOLD') / 100)
    }
    return false
  }

  function isSubscribed () {
    return document.getElementsByClassName("icon icon--HeartSolid color-override").length == 1
  }

  function wait () {
    if (watchThresholdReached()) {
      try {
        if (GM_config.get('LIKE_IF_NOT_SUBSCRIBED') || isSubscribed()) {
          like()
        }
      } catch (e) {
        DEBUG.info(`Failed to like video: ${e}. Will try again in ${GM_config.get('CHECK_FREQUENCY')} ms...`)
      }
    }
    setTimeout(wait, GM_config.get('CHECK_FREQUENCY'))
  }

  function like () {
    DEBUG.info('Trying to like video...')
    const likeButton = document.getElementsByClassName("button button--no-style button--file-action")[1].children[0]
    if (!likeButton) {
      throw Error('Couldn\'t find like button')
    }
    const videoId = getVideoId()
    if (likeButton.children[0].classList.contains(LIKE_BUTTON_CLICKED_CLASS)) {
      DEBUG.info('Like button has already been clicked')
      autoLikedVideoIds.push(videoId)
    } else if (autoLikedVideoIds.includes(videoId)) {
      DEBUG.info('Video has already been auto-liked. User must ' +
        'have un-liked it, so we won\'t like it again')
    } else {
      DEBUG.info('Found like button')
      DEBUG.info('It\'s unclicked. Clicking it...')
      likeButton.click()
      autoLikedVideoIds.push(videoId)
      DEBUG.info('Successfully liked video')
    }
  }
})()
