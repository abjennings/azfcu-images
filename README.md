**Azfcu-images**
================
A firefox extension to quickly download check images from Arizona Federal CU.

**Motivation**
--------------
It's great that Arizona Federal shows you images for the checks you wrote.  Downloading those images is a little
tedious.  This extension will automate the process for you.

**Usage**
---------
You can download the XPI file from the releases section.  In Firefox, go to Add-ons, click the gear icon and "Install add-on from file".

Once installed, you need to configure the destination directory for your images.

Then, when you get to your account page, which should look like this:

![AZFCU account screenshot](https://raw.githubusercontent.com/abjennings/azfcu-images/master/images/screenshot.png)

click the "AZFCU" text in the add-on bar:

![Add-on bar screenshot](https://raw.githubusercontent.com/abjennings/azfcu-images/master/images/button.png)

The extension will take control and download all check images on the visible page.

**Todo**
--------
 - Should the button disappear or be disabled if you're not on the AZFCU activity page?
 - Abort if "configure directory" error or image otherwise doesn't succeed
 - Add LICENSE file
