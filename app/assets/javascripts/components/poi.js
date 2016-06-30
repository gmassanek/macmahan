
class Poi {
  constructor(serverData = {}) {
    this.reset();

    if (serverData) {
      this.latlng = serverData.latlng;
      this.icon = L.divIcon({className: `${serverData.icon_class} poi-marker`});
    }

    this.marker = L.marker(this.latlng, {
      icon: this.icon,
    });

    var popupText = '';
    if (serverData.name !== '') {
      popupText += `<h3>${serverData.name}</h3>`
    }
    if (serverData.description !== '') {
      popupText += `<p>${serverData.description}</p>`
    }
    if (popupText !== '') {
      this.marker.bindPopup(popupText)
    }
  }

  reset() {
    this.latlng = {};
  }

};

module.exports = Poi;
