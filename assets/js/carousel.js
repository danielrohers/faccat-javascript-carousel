;(function () {

  var minIndex = 0;
  var maxIndex = 0;
  var interval = null;

  function enumerateBySelector(selector) {
    var values = Array.from(document.querySelectorAll(selector));
    for (var i = 0; i < values.length; i++) {
      maxIndex = i;
      values[i].dataset.index = i;
    }
  };

  function getSlideActive() {
    return document.querySelector('.carousel__slide[data-active="true"]');
  };

  function getSlideByIndex(index) {
    return document.querySelector('.carousel__slide[data-index="' + index + '"]');
  };

  function setSlideActive(index) {
    var active = getSlideActive();
    if (active) {
      active.dataset.active = false;
    }
    getSlideByIndex(index).dataset.active = true;
    setStatusActive(index);
  };

  function getCurrentIndex() {
    var active = getSlideActive();
    return Number(active.dataset.index);
  };

  function getNextIndex() {
    var next = getCurrentIndex() + 1;
    if (next > maxIndex) {
      next = minIndex;
    }
    return next;
  };

  function getPreviousIndex() {
    var next = getCurrentIndex() - 1;
    if (next < minIndex) {
      next = maxIndex;
    }
    return next;
  };

  function eventClickMove() {
    var links = document.querySelectorAll('.carousel__move');
    Array.from(links).forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var next;
        if (this.classList.contains('carousel__move--next')) {
          next = getNextIndex();
        } else {
          next = getPreviousIndex();
        }
        setSlideActive(next);
      });
    });
  };

  function enumerateSlides() {
    enumerateBySelector('.carousel__slide');
  };

  function getTime() {
    return Number(document.querySelector('.carousel-controls__time').value);
  };

  function eventClickControls() {
    var buttons = document.querySelectorAll('.carousel-controls__action');
    Array.from(buttons).forEach(function (button) {
      button.addEventListener('click', function () {
        stopSlide();
        if (this.classList.contains('carousel-controls__action--start')) {
          startSlide();
        }
      });
    });
  };

  function startSlide() {
    interval = setInterval(function () {
      var next = getNextIndex();
      setSlideActive(next);
    }, getTime());
  };

  function stopSlide() {
    if (interval) {
      clearInterval(interval);
    }
  };

  function enumerateStatus() {
    enumerateBySelector('.carousel-status__action');
  };

  function getStatusActive() {
    return document.querySelector('.carousel-status__action[data-active="true"]');
  };

  function getStatusByIndex(index) {
    return document.querySelector('.carousel-status__action[data-index="' + index + '"]');
  };

  function setStatusActive(index) {
    var active = getStatusActive();
    if (active) {
      active.dataset.active = false;
    }
    getStatusByIndex(index).dataset.active = true;
  };

  function eventClickStatus() {
    var links = document.querySelectorAll('.carousel-status__action');
    Array.from(links).forEach(function (link) {
      link.addEventListener('click', function (e) {
        var index = Number(this.dataset.index);
        setSlideActive(index);
      });
    });
  };

  enumerateSlides();
  enumerateStatus();
  eventClickMove();
  eventClickControls();
  setSlideActive(minIndex);
  eventClickStatus();

})();
