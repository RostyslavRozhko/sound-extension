 //Add styles
var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('style.css');
(document.head || document.documentElement).appendChild(style);

// Start script when dom elements loaded
window.onload = function(){
  SC.initialize({
    client_id: 'mLOUP6jQUIOHMpNQf8fAyJo05vdpf5B7'
  })

  var url = 'http://sound.rostyslavr.com/'

  function addButtons(elements) {
    for (let i = 0; i < elements.length; i++) {
      let button = document.createElement("a")
      let text = document.createTextNode("Open on playlist")
      button.appendChild(text);
      button.className = "soundcloud-btn"

      let parent = elements[i].parentElement
      let next = elements[i].nextSibling

      let href = (elements[i].getElementsByTagName("a")[0] || window.location).href

      button.addEventListener('click', async () => {
        let playlist = await getId(href)
        var win = window.open(url + playlist.id, '_blank')
        win.focus()
      })

      if (next)
          parent.insertBefore(button, next)
      else
          parent.appendChild(button)
      }
  }

  function getId(track_url){
    return SC.resolve(track_url)
  }

  let elementsList = document.getElementsByClassName("audibleTile__description")
  let elementsOne = document.getElementsByClassName("sc-button-group sc-button-group-medium")

  if(elementsList.length)
    addButtons(elementsList)
  else if(elementsOne.length)
    addButtons(elementsOne)
}
