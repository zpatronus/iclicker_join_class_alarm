# iClicker Class Join Alarm

This is a Tampermonkey userscript designed to automatically detect when the instructor starts taking attendance on the iClicker student page by identifying the keyword ("course-join-container expanded") in the HTML source. When the keyword is found, the script plays an alarm and sends a notification. If the keyword is not found after 15 seconds, the page will automatically refresh to ensure you don't miss any updates.

## Features

- Automatically checks the page every second for the keyword indicating attendance has started.
- Plays an alarm and shows a notification when the keyword is found.
- Stops the page from refreshing once the keyword is detected.
- If the keyword isn't found within 15 seconds, the page will refresh to keep it up-to-date.

## Known Limitations

- Due to modern browser restrictions, the alarm **may not play automatically**.

## How to Install and Use with Tampermonkey

1. **Install the Tampermonkey extension**:
   - If you haven't installed Tampermonkey yet, you can download it from the official Tampermonkey website:
     - [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
     - [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
     - [Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/ldjamemegdicckonechpmclldcipjlld)
     - [Tampermonkey for Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089)
  
2. **Install the script**:
   - Click [here to install the script](https://github.com/zpatronus/iclicker_join_class_alarm/raw/main/iClickerCourseJoinAlarm.user.js) or copy and paste the following URL into your browser:

     ```
     https://github.com/zpatronus/iclicker_join_class_alarm/raw/main/iClickerCourseJoinAlarm.user.js
     ```

   - Tampermonkey will prompt you to install the script. Click **Install**.

3. **Use the script**:
   - Once installed, the script will automatically run on the iClicker student page (`https://student.iclicker.com/*`).
   - It will check for the keyword every second, and if found, will stop refreshing the page and trigger an alarm and notification.

4. **Audio Autoplay Restriction**:
   - Due to browser restrictions on autoplay, the alarm may not play automatically.
   - If autoplay fails, a message will be logged in the browser console (`F12` > "Console").

## License

This project is licensed under the MIT License.
