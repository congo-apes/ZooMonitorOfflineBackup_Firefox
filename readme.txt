This readme.txt file was generated on 20230621 by Hussein Aljorani and Jake Funkhouser with essential feedback and supervision by Crickette Sanz and David Morgan.


-------------------
GENERAL INFORMATION
-------------------


1. Title of Dataset: Browser Extensions for Zoo Monitor Offline jStorage Backup


2. Author Information


  Principal Investigator Contact Information
        Name: Hussein Aljorani 
	  Institution: Washington University in St. Louis, Congo Apes
	  Email: a.hussein@wustl.edu


  Associate or Co-investigator Contact Information
        Name: Jake Funkhouser
          Institution: Washington University in St. Louis; Goualougo Triangle Ape Project; University of Zurich
	  Email: jakefunkhouser@wustl.edu; jake.funkhouser@uzh.ch


  Associate or Co-investigator Contact Information
        Name: David Morgan
          Institution: Lincoln Park Zoo; Goualougo Triangle Ape Project


  Associate or Co-investigator Contact Information
        Name: Crickette Sanz
          Institution: Washington University in St. Louis; Wildlife Conservation Society; Goualougo Triangle Ape Project


3. Web broswer extensions designed to work with ZooMonitor.org 

Ross, M.R., Niemann, T., Wark, J.D., Heintz, M.R., Horrigan, A., Cronin, K.A., Shender, M.A., Gillespie, K. (2016). ZooMonitor (Version 1) [Mobile application software].


4. Zoo Monitor Support Contact
        Name: Jason Wark
          Institution: Lincoln Park Zoo: Animal Welfare Science Program
	  Email: jwark@lpzoo.org


5. Contextual description of the data: 

Google Chrome and Firefox web extensions that work to download browser web storage (jStorage) to backup collected data when offline without cloud access. 



--------------------------
SHARING/ACCESS INFORMATION
-------------------------- 


1. Licenses/restrictions placed on the data: http://creativecommons.org/licenses/by/4.0/


2. Links to publications that cite or use the data: NA


3. Links to other publicly accessible locations of the data: NA


4. Links/relationships to ancillary data sets: zoomonitor.org


5. Was data derived from another source? NA
           If yes, list source(s): NA



---------------------
README File for Web Extensions
---------------------


# Local Storage Saver (Firefox Version)

LocalStorage Saver is a Firefox extension that assists users in exporting the localStorage of any website into a text file.
It includes an autosave feature to regularly save data from the current active tab.
This extension operates under Manifest V2.

## Features

- Extracts the entire localStorage data from the currently active tab.
- Formats the extracted localStorage data into JSON format for better readability and further usage.
- Saves the localStorage data into a text file, which is automatically downloaded to the default download path of your browser.
- Autosave feature that saves data every few minutes, with the interval customizable by the user.

## Setup

Follow these steps to install and use the LocalStorage Saver:

1. Type `about:debugging` in the address bar and press Enter.
2. Under Temporary Extensions, click 'Load Temporary Add-on'.
3. Navigate to and double click any file in the Firefox extension folder.
4. click on the puzzle piece icon on the top right, right click Local Storage Saver and select `Pin to Toolbar`.
5. Visit the site you want to save data from and click "Save Site's LocalStorage".

**Note:** The autosave function will only work on the active tab.
This feature is designed to prevent accidental data loss when you navigate away from the current tab.

To adjust the autosave timer:

1. Right-click on `background.js` and select Edit.
2. Change the value of `saveInterval`, which is in the second line, to your desired number of minutes.
3. Make sure to reload the extension afterwards. It's not certain if the changes will take effect automatically.

The filename format of the saved data is `localStorageDump_<timestamp>_<siteName>_autosave.txt`. 

- `_autosave` will only appear if it was autosaved, it will not appear for manual saves.

- `<timestamp>`: A timestamp following the ISO 8601 standard, denoting the exact date and time when the data was dumped from the local storage. 
	It is in the format `YYYYMMDDTHHMMSSfffZ`.
    - `YYYY`: The 4-digit year.
    - `MM`: The 2-digit month.
    - `DD`: The 2-digit day.
    - `T`: Denotes the start of the time segment.
    - `HH`: The 2-digit hour (24-hour format).
    - `MM`: The 2-digit minute.
    - `SS`: The 2-digit second.
    - `fff`: The 3-digit millisecond.
    - `Z`: Indicates that the time is in Coordinated Universal Time (UTC).
	
- `<siteName>`: The title of the website from which the data was dumped.

For example, a file named `localStorageDump_20230621T174710418Z_google.com_autosave.txt` 
indicates that the local storage data was automatically saved from Google's website at the exact moment of `2023-06-21T17:47:10.418Z` (UTC time).

