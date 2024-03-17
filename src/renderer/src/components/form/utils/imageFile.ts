import type { ChangeEvent } from 'react';

export const isImageFile = (event: ChangeEvent<HTMLInputElement>): File | null => {
  if (!event.target.files) {
    return null;
  }
  const file = event.target.files[0];
  // must be of type .png, .jpg, .jpeg, or .gif
  if (!file) {
    return null;
  }
  const fileType = file.type;
  if (
    fileType !== 'image/png' &&
    fileType !== 'image/jpeg' &&
    fileType !== 'image/jpg' &&
    fileType !== 'image/gif'
  ) {
    return null;
  }
  return file;
};
