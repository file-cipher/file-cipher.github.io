// Picks ru or en: saved choice -> browser language -> en.
(function () {
  var KEY = 'filecipher-lang';
  var SUPPORTED = ['ru', 'en'];
  var root = document.documentElement;

  function saved() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function apply(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);

    var buttons = document.querySelectorAll('[data-set-lang]');

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set-lang') === lang));
    }

    var title = root.getAttribute('data-title-' + lang);

    if (title) document.title = title;
  }

  var browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  var initial = saved() || browser;

  apply(SUPPORTED.indexOf(initial) >= 0 ? initial : 'en');

  document.addEventListener('DOMContentLoaded', function () {
    apply(root.getAttribute('data-lang'));
    document.addEventListener('click', function (event) {
      var button = event.target.closest('[data-set-lang]');

      if (!button) return;

      var lang = button.getAttribute('data-set-lang');

      try {
        localStorage.setItem(KEY, lang);
      } catch (e) {}

      apply(lang);
    });
  });
})();
