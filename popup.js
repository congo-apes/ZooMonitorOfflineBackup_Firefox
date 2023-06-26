// This event listener waits for the DOM (Document Object Model) to be fully loaded before executing the code inside.
document.addEventListener('DOMContentLoaded', (event) => {

  // Once the DOM is fully loaded, add an event listener to the button (or other HTML element) with the ID 'dump'.
  // When the 'dump' button is clicked, it triggers a function.
  document.getElementById('dump').addEventListener('click', () => {

    // The function first queries the browser to get the current active tab in the active window.
    browser.tabs.query({ active: true, currentWindow: true }).then(tabs => {

      // Selects the first tab from the returned tab list (as there should only be one active tab).
      const tab = tabs[0];

      // Executes a script in the context of the web page currently loaded in the selected tab.
      browser.tabs.executeScript(tab.id, {
        code: `
          (function() {
            // Initialize an empty object to store the localStorage data.
            var output = {};
            // Loop over all keys in localStorage.
            for (var i = 0; i < localStorage.length; i++) {
              // Get the key and corresponding value.
              var key = localStorage.key(i);
              var value = localStorage.getItem(key);
              
              try {
                // Attempt to parse the value as JSON.
                value = JSON.parse(value);
              } catch (e) {
                // If the value is not JSON, it can just be stored as is.
              }
              // Store the key-value pair in the output object.
              output[key] = value;
            }
            // Return a JSON string representation of the output object and the current page's title.
            return { data: JSON.stringify(output, null, 4), siteName: document.title };
          })();
        `
      }).then((results) => {

        // Convert the result string into a Blob object of type 'text/plain'.
        const blob = new Blob([results[0].data], { type: 'text/plain' });
        // Create a URL for the Blob object.
        const url = URL.createObjectURL(blob);
        // Get the current time in ISO format and remove any punctuation.
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        // Get the site name from the result.
        const siteName = results[0].siteName;
        // Trigger a download of the Blob object with a filename containing the current time and the site name.
        browser.downloads.download({
          url: url,
          filename: `localStorageDump_${timestamp}_${siteName}.txt`
        });
      });
    });
  });

  // Send a message to the runtime to check if the autosave alarm is active.
  browser.runtime.sendMessage({ message: 'checkAlarm' })
    .then((response) => {
      // Update the 'status' HTML element text content depending on the alarm status.
      if (response.alarmExists) {
        document.getElementById('status').textContent = 'Autosave is active';
      } else {
        document.getElementById('status').textContent = 'Autosave is not active';
      }
    });
});
