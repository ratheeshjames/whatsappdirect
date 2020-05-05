var $$ = Dom7;

var app = new Framework7({
  root: "#app", // App root element

  name: "Whatsapp Direct V2", // App name
  theme: "auto", // Automatic theme detection
  autoDarkTheme : true, //Auto switch to dark theme
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
  // Register service worker
  serviceWorker: {
    path: "/service-worker.js",
  },
  on: {
    // each object key means same name event handler
    pageInit: function (page) {
      var self = this;
      // do something on page init
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

$$('#btnSent').on('click', function (e) {
 console.log("Submit Button is Clicked!!");
 var option = $$("#selectmenu").val();
 var num = $$("#number").val();
 url = "https://wa.me/" + option + num;
 console.log("URL : " + url);
 window.open(url, "_top");
});