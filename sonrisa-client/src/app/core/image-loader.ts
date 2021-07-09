export const loadImages = (images: string[]) => {
  images.forEach((img) => {
    const imgEl = new Image();
    imgEl.src = img;
  });
};
