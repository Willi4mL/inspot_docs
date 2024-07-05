
# Popups

Denna dokumentation visar flera alternativ av popups.

## Standard popup

Den här koden är skriven i HTML, CSS och javascript. Modalen stängs ned efter man klickat på krysset eller utanför rutan.
    <div id="js-modal" class="modal">
      <div class="modal-content">
        <span class="close js-close">&times;</span>
        <div class="modal-text">
          <p>Textinnehåll...</p>
        </div>
      </div>
    </div>

**Input**

::: code-group

```html [HTML]
    <!-- The Modal -->
    <div id="js-modal" class="modal">
    
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close js-close">&times;</span>
        <div class="modal-text">
          <p>Textinnehåll...</p>
        </div>
      </div>
    </div>
```

```css [CSS]
.modal {
    position: fixed; 
    z-index: 1; 
    padding-top: 10rem; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: #00000047; 
  }
  
  /* Modal Content */
  .modal-content {
    background-color: #ffffff;
    margin: auto;
    padding: 20px;
    width: 40rem;
  }
  
  /* The Close Button */
  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-text {
    display: flex;
    justify-content: center;
  }
```

```js [JS]
// Get the modal
const modal = document.getElementById("js-modal");

// Get the <span> element that closes the modal
const closeButton = document.getElementsByClassName("js-close")[0];

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
```
:::

<script>
import './elements.css'
</script>
