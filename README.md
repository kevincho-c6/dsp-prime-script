## ASSUMPTIONS:

- The user's browser allows javascript
- The buttons to track are within a form element to extract data from

## SCRIPT ATTRIBUTES:

- `data-pid` (Required): The Amazon Ads pixel ID
- `data-region`: The region in which the user is located (Default: NA)
- `data-events`: An array of objects containing the following properties:
  - `event` (Required): The event name to track when the button is clicked
  - `button` (Required): The text of the button to track

## EXAMPLE:

```javascript
<script
  src="./dsp-prime.js"
  data-pid="test-pid"
  data-events='[{ "event": "AddToCart", "button": "add" }, { "event": "Purchase", "button": "checkout" }]'
></script>
```
