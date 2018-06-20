const app = {
  initialize: function() {
    document.addEventListener(
      'deviceready',
      this.onDeviceReady.bind(this),
      false
    )
  },

  onDeviceReady: function() {
    this.receivedEvent('deviceready')
  },

  receivedEvent: function(id) {
    const parentElement = document.getElementById(id)
    const listeningElement = parentElement.querySelector('.listening')
    const receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none;')
    receivedElement.setAttribute('style', 'display:block;')

    console.log('Received Event: ' + id)
  },
}

app.initialize()
