// ==UserScript==
// @name         iClicker Course Join Keyword Finder
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Find the keyword "course-join-container expanded" in iClicker source HTML, play an alarm, and show notification when found. Refresh page if not found after 15s.
// @author       zPatronus
// @match        https://student.iclicker.com/*
// @grant        GM_notification
// @grant        GM_openInTab
// ==/UserScript==

(function () {
  'use strict';

  const keyword = "course-join-container expanded";
  const checkInterval = 1000; // 1 second check interval
  const refreshInterval = 15000; // 15 seconds refresh interval
  let elapsed = 0;
  let alarmTriggered = false;

  function playAlarm () {
    let audio = new Audio('https://github.com/zijunhz/EECS496_quiz_alarm/raw/main/oversimplified-alarm-clock-113180.mp3'); // Updated sound URL
    audio.play();
  }

  function showNotification () {
    GM_notification({
      title: "Keyword Found!",
      text: `The keyword "${keyword}" was found.`,
      timeout: 20000,
      onclick: function () {
        GM_openInTab(window.location.href);
      }
    });
  }

  function stopRefresh () {
    clearInterval(checkIntervalId);
  }

  function checkForKeyword () {
    let pageSource = document.documentElement.innerHTML;
    if (pageSource.includes(keyword)) {
      if (!alarmTriggered) {
        playAlarm();
        showNotification();
        stopRefresh();
        alarmTriggered = true;
      }
    } else {
      elapsed += checkInterval;
      if (elapsed >= refreshInterval) {
        location.reload();
      }
    }
  }

  let checkIntervalId = setInterval(checkForKeyword, checkInterval); // Check every 1 second
})();
