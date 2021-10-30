import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = createGallery(galleryItems);

function createGallery(images) {
  return images
    .map(({ preview, original, description }) => {
      return ` <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}
galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);

galleryRef.addEventListener("click", openModal);
let instance = null;
function openModal(event) {
  event.preventDefault();
  const eventTarget = event.target;
  const sourceUrl = eventTarget.dataset.source;
  console.log(sourceUrl);
  window.addEventListener("keydown", onEscClose);
  instance = basicLightbox.create(
    `
    <img src="${sourceUrl}" width="800" height="600">
`,
    {
      onShow: (instance) => {
        instance.element().querySelector("img").onclick = instance.close;
      },
    }
  );

  instance.show();
}

function onEscClose(event) {
  if (event.code === "Escape") {
    instance.close();
    window.removeEventListener("keydown", onEscClose);
    return;
  }
}
// galleryRef.addEventListener("click", openModal);
