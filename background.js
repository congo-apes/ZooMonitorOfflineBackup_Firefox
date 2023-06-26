// Set the interval for autosaving data to 2 minutes.
var saveInterval = 2;

// Define a function to create an alarm that triggers every 'saveInterval' minutes.
function updateAlarm() {
  // The 'create' method is used to create a new alarm. 
  // The first parameter is the name of the alarm and the second parameter is an object defining when the alarm should fire.
  // Here, the 'periodInMinutes' property is used to set an interval for the alarm.
  browser.alarms.create('saveData', { periodInMinutes: saveInterval });
}

// Call the 'updateAlarm' function to create the alarm.
updateAlarm();

// Add an event listener for alarms. This function will be called whenever an alarm has elapsed.
browser.alarms.onAlarm.addListener(function (alarm) {

  // Check if the elapsed alarm is the 'saveData' alarm.
  if (alarm.name === 'saveData') {

    // Query the browser to get the current active tab in the current window.
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {

      // Check if there is an active tab.
      if (tabs[0]) {
        const tab = tabs[0];

        // Check if the URL of the tab starts with 'http' (i.e., it is a web page).
        if (tab.url.startsWith('http')) {

          // Execute a script in the context of the web page currently loaded in the selected tab.
          // The code is similar to the code from the previous script, but now it is triggered by the alarm.
          browser.tabs.executeScript(tab.id, {
            code: `
              (function() {
                var output = {};
                for (var i = 0; i < localStorage.length; i++) {
                  var key = localStorage.key(i);
                  var value = localStorage.getItem(key);
                  try {
                    value = JSON.parse(value);
                  } catch (e) {
                    // The value is not a JSON string, no need to do anything
                  }
                  output[key] = value;
                }
                return { data: JSON.stringify(output, null, 4), siteName: document.title };
              })();
            `
          }).then((results) => {
            // If there are results from the executed script, then proceed to create a Blob object and download it.
            if (results && results[0]) {
              var blob = new Blob([results[0].data], { type: 'text/plain' });
              var url = URL.createObjectURL(blob);
              var timestamp = new Date().toISOString().replace(/[:.-]/g, '');
              var siteName = results[0].siteName;
              // The downloaded file is marked as 'autosave' in the filename.
              browser.downloads.download({
                url: url,
                filename: `localStorageDump_${timestamp}_${siteName}_autosave.txt`
              });
            }
          });
        }
      }
    });
  }
});

// Add a message listener for messages sent from other parts of the extension.
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received");  // Log message reception for debugging

  // If the received message is 'checkAlarm', then get the 'saveData' alarm.
  if (request.message === 'checkAlarm') {
    browser.alarms.get('saveData').then((alarm) => {
      // Send a response indicating whether the 'saveData' alarm exists.
      sendResponse({ alarmExists: !!alarm });
    });
    // Return true to indicate that the response is asynchronous.
    return true;
  }
});
