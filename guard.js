// حماية الصفحة: بس المسجّل دخول ومأكّد إيميله بيشوفها، غيره بيرجع لصفحة التسجيل
(function () {
  var root = document.documentElement;
  root.style.visibility = "hidden";               // نخفي الصفحة لحد ما نتأكد
  var back = function () { location.replace("index.html"); };
  var timer = setTimeout(back, 8000);             // إذا تأخر التحميل بيرجع للتسجيل

  Promise.all([
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js")
  ]).then(function (m) {
    var app = m[0].initializeApp({
      apiKey: "AIzaSyD8-5FFBCE5WHAEai3sPMAdUwAgIg-QaMQ",
      authDomain: "boxio-7bbde.firebaseapp.com",
      projectId: "boxio-7bbde",
      appId: "1:833134820214:web:37083cab6980150e1e5857"
    });
    m[1].onAuthStateChanged(m[1].getAuth(app), function (user) {
      clearTimeout(timer);
      // الإيميل مأكّد، أو الدخول بفيسبوك (فيسبوك بيرجع إيميل مؤكَّد من عنده)
      var ok = user && (user.emailVerified ||
        (user.email && user.providerData.some(function (p) { return p.providerId === "facebook.com"; })));
      if (ok) root.style.visibility = "visible";
      else back();
    });
  }).catch(back);
})();
