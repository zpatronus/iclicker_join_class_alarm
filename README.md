# iClicker Class Join Alarm

**Disclaimer**: This script is for coding and automation practice with Tampermonkey. Use responsibly and comply with your institution's attendance policies.

A Tampermonkey script to detect and auto-join iClicker classes when attendance starts, identified by the keyword "course-join-container expanded." It plays an alarm and sends a notification upon detection, refreshing every 30 seconds if not found.

## Features

- Checks for attendance keyword every second.
- Plays an alarm and shows a notification when detected.
- Stops refreshing when the keyword is found and auto joins the class.
- Refreshes every 30 seconds to stay updated.

## Version Checking

The script auto-checks for updates on GitHub. Your browser may request cross-site permission for version retrieval; it's safe and ensures stability.

## Test Script

`iclicker_join_class_alarm_test.user.js` tests alarm functionality regardless of attendance status.

## Limitations

- Alarm may not autoplay due to browser restrictions; interact with the page first to enable.
- Turn off focus mode to receive notifications.

## Installation

1. **Install Tampermonkey**: Get the extension for [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/), [Edge](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd), or [Safari](https://apps.apple.com/us/app/tampermonkey/id1482490089). You may need to enable developer mode: [For users of the Tampermonkey extension in a Chrome-based browser, enabling Developer Mode is a requirement introduced with Manifest V3 updates.](https://www.tampermonkey.net/faq.php?locale=en#Q209)
2. **Install Main Script**: [Click to install](https://github.com/zpatronus/iclicker_join_class_alarm/raw/refs/heads/main/iclicker_join_class_alarm.user.js).
3. **Install Test Script** if you want to make sure the main script works (optional): [Click to install](https://github.com/zpatronus/iclicker_join_class_alarm/raw/refs/heads/main/iclicker_join_class_alarm_test.user.js). Please turn it off after testing or it might interfere with the main script.
4. **Usage**: On the course page, enable "Monitor Attendance." If testing, you'll see a notification immediately. Once attendance is detected, it will auto join into the class. Turn the monitor off during quizzes to prevent page refresh.

## Compatibility

Tested on:

- Ubuntu 20.04: Chrome, Edge
- Windows: Edge
- MacOS: Chrome

## Changelog

- **2.0**: Auto-joins class.
- **1.9**: Metadata for auto-update.
- **1.8**: Added auto-update.
- **1.7**: Fixed toggle logic.
- **1.6**: Added monitor and alarm toggle.

## License

Licensed under the MIT License.
