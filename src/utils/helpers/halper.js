import {PermissionsAndroid, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export function getImageFromGallery(callback = () => {}) {
  ImagePicker.openPicker({
    width: 400,
    height: 400,
    cropping: true,
  })
    .then(image => {
      const imageUri = Platform.OS === 'ios' ? image.path : image.path;
      let imageObj = {
        name: image.filename ? image.filename : 'upload_image',
        type: image.mime,
        uri: image.path,
      };
      callback({
        uri: imageUri,
        path: image,
      });
    })
    .catch(err => {
      callback({
        uri: '',
        path: '',
      });
      console.log(err);
    });
}

export function getImageFromCamera(isCrop, callback = () => {}, size) {
  ImagePicker.openCamera({
    width: size?.width ? size?.width : 400,
    height: size?.height ? size?.height : 400,
    cropping: isCrop,
  })
    .then( image => {
      const imageUri = Platform.OS === 'ios' ? image.path : image.path;
      
      let imageObj = {
        name: image.filename ? image.filename : 'upload_image',
        type: image.mime,
        uri: image.path,
      };

      callback({
        uri: imageUri,
        path: image,
      });
    })
    .catch(err => {
      callback({
        uri: '',
        path: '',
      });
      console.log(err);
    });
}
