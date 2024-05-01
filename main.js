let s = document.createElement('script');
s.text = `
  console.log('Injected MireaJacked v1.0.2 made by with the hope of not writing JavaScript ever again');

  // Intercept and handle keydown events for Ctrl+C, and Ctrl+V
  document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.keyCode === 67 || event.keyCode === 86)) { // Ctrl+C or Ctrl+V
      if (event.keyCode === 67) { // Ctrl+C
        navigator.clipboard.writeText(window.getSelection().toString()).then(function() {
          console.log('Copying to clipboard was successful!');
        }, function(err) {
          console.error('Could not copy text: ', err);
        });
      } else if (event.keyCode === 86) { // Ctrl+V
        navigator.clipboard.readText().then(text => {
          document.activeElement.value += text; // Assumes the active element can accept text input
          console.log('Pasting from clipboard was successful!');
        }).catch(err => {
          console.error('Failed to read clipboard contents: ', err);
        });
      }
      event.preventDefault(); // Prevent other handlers from executing
      event.stopPropagation(); // Stop the event from bubbling up
    }
  }, true); // Use capture to ensure this runs before other listeners

  // Override security settings preventing copying, pasting, etc.
  M.mod_quiz.secure_window = {
    init: function(Y) {
      console.log('Secure window functions have been completely overridden.');
      Y.delegate = function(type, fn, el, filter) { /* ignore all events */ };
      Y.on = function(type, fn, el, key) { /* ignore all events */ };
    },
    prevent_selection: function(e) { return false; },
    prevent: function(e) { return false; },
    prevent_mouse: function(e) { return false; },
    is_content_editable: function(n) { return true; },
    close: function(url, delay) { /* do nothing */ },
    init_close_button: function(Y, url) { /* do nothing */ }
  };

  // Intercept and handle copy and paste events for context menu
document.addEventListener('copy', function(event) {
  event.preventDefault(); // Prevent default copy behavior
  navigator.clipboard.writeText(window.getSelection().toString()).then(function() {
    console.log('Copying to clipboard was successful!');
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
});

document.addEventListener('paste', function(event) {
  event.preventDefault(); // Prevent default paste behavior
  navigator.clipboard.readText().then(text => {
    document.activeElement.value += text; // Assumes the active element can accept text input
    console.log('Pasting from clipboard was successful!');
  }).catch(err => {
    console.error('Failed to read clipboard contents: ', err);
  });
});


  // Allow context menu
  document.addEventListener('contextmenu', function(event) {
    event.stopPropagation(); // Stop the event from bubbling up
  }, true); // Use capture to ensure this runs before other listeners

  // Replace the global alert function to block alerts
  window.alert = function() { console.log('Blocked an alert attempt.'); };

  // Replace the M object on the window with our overridden settings
  window.M = M;
`;
document.documentElement.appendChild(s);
