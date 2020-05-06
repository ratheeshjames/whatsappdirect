var $$ = Dom7;
var app = new Framework7({
  root: "#app", // App root element

  name: "Whatsapp Direct V2", // App name
  theme: "auto", // Automatic theme detection
  autoDarkTheme: true, //Auto switch to dark theme
  // App root data
  data() {
    return {
      foo: "bar",
    };
  },
  // App root methods
  methods: {
    doSomething() {
      // ...
    },
  },

  // App routes
  routes: routes,
  // Register service worker (optional)
  /*serviceWorker: {
    path: "/service-worker.js",
  },*/
  on: {
    // each object key means same name event handler
    pageInit: function (page) {
      var self = this;
      // do something on page init
      // Create PWA sheet
      self.sheet.create({
        el: ".pwa-sheet-swipe-to-close",
        swipeToClose: true,
        closeByOutsideClick: true,
        push: true,
        backdrop: true,
      });

      //Add "intro" class to all paragraphs
      // Create swipe-to-close Sheet
      self.sheet.create({
        el: ".demo-sheet-swipe-to-close",
        swipeToClose: true,
        closeByOutsideClick: true,
        push: true,
        backdrop: true,
      });
    },
  },
});

$$("#btnSent").on("click", function (e) {
  console.log("Submit Button is Clicked!!");
  var option = $$("#selectmenu").val();
  var num = $$("#number").val();
  url = "https://wa.me/" + option + num;
  console.log("URL : " + url);
  window.open(url, "_top");
});
// Register service worker to control making site work offline

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/whatsappdirect/service-worker.js")
    .then(function () {
      console.log("Service Worker Registered");
    });
}
// Code to handle install prompt on desktop

let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  setTimeout(function () {
    $$("#dummyBtn").trigger("click");
  }, 1000);
  // On install button click
  $$("#installBtn").on("click", function (e) {
    // hide our user interface that shows our A2HS button
    $$(".pwa-sheet-swipe-to-close").hide();
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });
});
