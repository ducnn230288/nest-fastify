import { appConfig } from '@config';

export function setImage(value?: string, before = true): string | undefined {
  if (value) {
    if (before && value.indexOf(appConfig.URL_FILE) === 0) return value.replace(appConfig.URL_FILE, '');
    else if (!before && value.indexOf('http') === -1) return appConfig.URL_FILE + value;
  }
  return value;
}
export function setImageContent(value?: string, before = true): string | undefined {
  if (value)
    return value.replaceAll(
      'src="' + (before ? appConfig.URL_FILE : ''),
      'src="' + (!before ? appConfig.URL_FILE : ''),
    );
  return value;
}
export function getImages<T>(
  images: string[] = [],
  data: T | null,
  arrayContent: string[] = [],
  oldData?: T | null,
): string[][] {
  const listFilesActive: string[] = [];
  const listFilesRemove: string[] = [];

  if (data) {
    arrayContent.forEach((name) => {
      if (data[name]) {
        data[name].forEach((translation) => {
          if (translation.content?.blocks)
            translation.content?.blocks.forEach((item) => {
              if (item.type === 'image') listFilesActive.push(item.data.file.url.replace(appConfig.URL_FILE, ''));
            });
        });
      }
      if (oldData && oldData[name]) {
        oldData[name].forEach((translation) => {
          if (translation.content?.blocks)
            translation.content?.blocks.forEach((item) => {
              if (item.type === 'image') listFilesRemove.push(item.data.file.url.replace(appConfig.URL_FILE, ''));
            });
        });
      }
    });
  }

  if (!!data && !!oldData) {
    images.forEach((name) => {
      if (oldData[name] !== data[name]) {
        if (!oldData[name] && !!data[name]) listFilesActive.push(data[name].replace(appConfig.URL_FILE, ''));
        else if (!!oldData[name] && !data[name]) listFilesRemove.push(oldData[name].replace(appConfig.URL_FILE, ''));
        else if (oldData[name] && data[name]) {
          listFilesActive.push(data[name].replace(appConfig.URL_FILE, ''));
          listFilesRemove.push(oldData[name].replace(appConfig.URL_FILE, ''));
        }
      }
    });
    return [
      listFilesActive.filter((item) => listFilesRemove.indexOf(item) < 0),
      listFilesRemove.filter((item) => listFilesActive.indexOf(item) < 0),
    ];
  } else if (!!data && !oldData)
    images.forEach((name) => data[name] && listFilesActive.push(data[name].replace(appConfig.URL_FILE, '')));

  return [listFilesActive, listFilesRemove];
}
