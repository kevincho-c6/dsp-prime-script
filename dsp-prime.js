/**
 * ASSUMPTIONS:
 * - The user's browser allows javascript
 * - The buttons to track are within a form element to extract data from
 *
 * SCRIPT ATTRIBUTES:
 * - data-pid (Required): The Amazon Ads pixel ID
 * - data-region: The region in which the user is located (Default: NA)
 * - data-events: An array of objects containing the following properties:
 *   - event (Required): The event name to track when the button is clicked
 *   - button (Required): The text of the button to track
 */

// Set up Amazon Ads tracking (generated by Amazon)
(function (w, d, s, t, a) {
  if (w.amzn) return;
  w.amzn = a = function () {
    w.amzn.q.push([arguments, new Date().getTime()]);
  };
  a.q = [];
  a.version = "0.0";
  s = d.createElement("script");
  s.src = "https://c.amazon-adsystem.com/aat/amzn.js";
  s.id = "amzn-pixel";
  s.async = true;
  t = d.getElementsByTagName("script")[0];
  t.parentNode.insertBefore(s, t);
})(window, document);

function logger() {
  console.log("---[C6]---", ...arguments);
}

function findButtonsByText(text) {
  var buttons = document.getElementsByTagName("button");
  var matches = [];

  for (var i = 0, l = buttons.length; i < l; i++) {
    if (
      buttons[i].firstChild.nodeValue &&
      buttons[i].firstChild.nodeValue.toLowerCase() === text.toLowerCase()
    ) {
      matches.push(buttons[i]);
    }
  }

  return matches;
}

function getFormData(element) {
  var formElement = element.closest("form");
  return Object.fromEntries(new FormData(formElement));
}

var currentScript =
  document.currentScript ||
  document.getElementById("dsp-prime") ||
  (function () {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1];
  })();

var pid = currentScript.getAttribute("data-pid");
var events = JSON.parse(currentScript.getAttribute("data-events")) || [];
var region = currentScript.getAttribute("data-region") || "NA";

logger("Provided script attributes:", {
  pid,
  events,
  region,
});

logger('amzn("setRegion", region)', { region });
amzn("setRegion", region);

logger('amzn("addTag", pid)', { pid });
amzn("addTag", pid);

logger('amzn("trackEvent", "PageView")');
amzn("trackEvent", "PageView");

// Wait until the window fully loads with all elements
window.onload = function () {
  events.forEach(function (item) {
    var buttons = findButtonsByText(item.button);

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Get the button's parent form and extract all data from it
        var formData = getFormData(button);

        logger('amzn("trackEvent", item.event, formData)', {
          "item.event": item.event,
          formData,
        });
        amzn("trackEvent", item.event, formData);
      });
    });
  });
};
