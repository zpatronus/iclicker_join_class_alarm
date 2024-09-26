// ==UserScript==
// @name         iClicker Class Join Alarm
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Find the keyword "course-join-container expanded" in iClicker source HTML, play an alarm, and show notification when found. Refresh page if not found after 30s.
// @author       zPatronus
// @match        https://student.iclicker.com/*
// @grant        GM_notification
// @grant        GM_openInTab
// ==/UserScript==

(function () {
  'use strict';

  const keyword = "course-join-container expanded";
  const checkInterval = 1000; // 1 second check interval
  const refreshInterval = 30000; // 30 seconds refresh interval
  let elapsed = 0;
  let alarmTriggered = false;

  function playAlarm () {
    let audio = new Audio('https://github.com/zijunhz/EECS496_quiz_alarm/raw/main/oversimplified-alarm-clock-113180.mp3'); // Updated sound URL

    // Try to play the alarm
    audio.play().then(() => {
      // If playback succeeds, show normal notification
      showNotification(false);
    }).catch((error) => {
      // If playback fails (possibly due to autoplay restrictions), show notification with additional info
      showNotification(true);
    });
  }

  function showNotification (isAutoplayBlocked) {
    let notificationText = isAutoplayBlocked
      ? `The instructor has started taking attendance, but the alarm was blocked due to autoplay restrictions.`
      : `The instructor has started taking attendance.`;

    GM_notification({
      title: "Attendance Started!",
      text: notificationText,
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
