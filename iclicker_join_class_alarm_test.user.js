// ==UserScript==
// @name         iClicker Class Join Alarm Test
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Find the keyword "course-join-container" in iClicker source HTML, play an alarm, and show notification when found. Refresh page if not found after 30s. Includes Stop button to mute alarm and stop monitoring.
// @author       zPatronus
// @match        https://student.iclicker.com/*
// @grant        GM_notification
// @grant        GM_openInTab
// ==/UserScript==

(function () {
  'use strict';

  const keyword = "course-join-container";
  const checkInterval = 1000; // 1 second check interval
  const refreshInterval = 30000; // 30 seconds refresh interval
  let elapsed = 0;
  let alarmTriggered = false;
  let audio;

  // Switch settings
  const localStorageKeyMonitoring = "iClickerMonitoringEnabled";
  const localStorageKeyMute = "iClickerMuteEnabled";

  // Load monitoring and mute status from local storage, defaulting to false
  let monitoringEnabled = localStorage.getItem(localStorageKeyMonitoring) === 'true';
  let muteEnabled = localStorage.getItem(localStorageKeyMute) === 'true';

  // Create the toggle switches in the page for enabling/disabling monitoring and mute
  function createToggleSwitches () {
    const toggleContainer = document.createElement('div');
    toggleContainer.style.position = 'fixed';
    toggleContainer.style.bottom = '10px';
    toggleContainer.style.right = '10px';
    toggleContainer.style.backgroundColor = '#fff';
    toggleContainer.style.padding = '10px';
    toggleContainer.style.border = '1px solid #ccc';
    toggleContainer.style.zIndex = '9999';

    // Monitor toggle
    const monitorLabel = document.createElement('label');
    monitorLabel.innerText = 'Monitor Attendance: ';
    monitorLabel.style.marginRight = '5px';

    const monitorSwitch = document.createElement('input');
    monitorSwitch.type = 'checkbox';
    monitorSwitch.checked = monitoringEnabled;

    // Monitor toggle event
    monitorSwitch.addEventListener('change', function () {
      monitoringEnabled = monitorSwitch.checked;
      localStorage.setItem(localStorageKeyMonitoring, monitoringEnabled);

      // Start or stop monitoring based on switch state
      if (monitoringEnabled) {
        startMonitoring();
      } else {
        stopMonitoring();
      }
    });

    // Mute toggle
    const muteLabel = document.createElement('label');
    muteLabel.innerText = 'No Alarm & Notification Only: ';
    muteLabel.style.marginRight = '5px';
    muteLabel.style.marginLeft = '10px'; // Add some margin for separation from the monitor toggle

    const muteSwitch = document.createElement('input');
    muteSwitch.type = 'checkbox';
    muteSwitch.checked = muteEnabled;

    // Mute toggle event
    muteSwitch.addEventListener('change', function () {
      muteEnabled = muteSwitch.checked;
      localStorage.setItem(localStorageKeyMute, muteEnabled);
    });

    toggleContainer.appendChild(monitorLabel);
    toggleContainer.appendChild(monitorSwitch);
    toggleContainer.appendChild(muteLabel);
    toggleContainer.appendChild(muteSwitch);
    document.body.appendChild(toggleContainer);
  }

  // Play alarm function, respects mute setting
  function playAlarm () {
    if (!muteEnabled) {
      audio = new Audio('https://github.com/zijunhz/EECS496_quiz_alarm/raw/main/oversimplified-alarm-clock-113180.mp3');
      audio.loop = true; // Make the alarm repeat
      audio.play().then(() => {
        showNotification(false);
        showStopButton();
      }).catch((error) => {
        showNotification(true);
      });
    } else {
      showNotification(false);
    }
  }

  // Notification function
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

  // Display the Stop button to stop the alarm
  function showStopButton () {
    const stopButton = document.createElement('button');
    stopButton.innerText = 'Stop Alarm';
    stopButton.style.position = 'fixed';
    stopButton.style.top = '50%';
    stopButton.style.left = '50%';
    stopButton.style.transform = 'translate(-50%, -50%)';
    stopButton.style.padding = '20px';
    stopButton.style.fontSize = '24px';
    stopButton.style.color = '#fff';
    stopButton.style.backgroundColor = 'red';
    stopButton.style.border = 'none';
    stopButton.style.cursor = 'pointer';
    stopButton.style.zIndex = '10000';

    stopButton.addEventListener('click', function () {
      // Stop the alarm sound
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Remove the Stop button
      stopButton.remove();
    });

    document.body.appendChild(stopButton);
  }

  // Stop monitoring
  function stopMonitoring () {
    console.log('Stop monitoring')
    // Stop monitoring and update the checkbox state
    monitoringEnabled = false;
    localStorage.setItem(localStorageKeyMonitoring, monitoringEnabled);
    document.querySelector('input[type="checkbox"]').checked = false; // Uncheck the monitor switch
    clearInterval(checkIntervalId);
  }

  // Check for keyword in the page source
  function checkForKeyword () {
    let pageSource = document.documentElement.innerHTML;
    if (pageSource.includes(keyword)) {
      if (!alarmTriggered) {
        stopMonitoring();
        playAlarm();
        alarmTriggered = true;
      }
    } else {
      elapsed += checkInterval;
      if (elapsed >= refreshInterval) {
        location.reload();
      }
    }
  }

  // Start monitoring if enabled
  function startMonitoring () {
    console.log('Start monitoring');
    clearInterval(checkIntervalId);
    alarmTriggered = false;
    elapsed = 0;
    checkIntervalId = setInterval(checkForKeyword, checkInterval);
  }

  let checkIntervalId;

  // Initialize switches and monitoring
  createToggleSwitches();
  if (monitoringEnabled) {
    startMonitoring();
  }
})();
