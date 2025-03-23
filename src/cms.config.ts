// This file patches the collection config before Payload CMS initialization
// to ensure each collection has the required properties

import Editorial from './cms/collections/Editorial';
import Media from './cms/collections/Media';
import User from './cms/collections/User';
import Sketchbook from './cms/collections/Sketchbook';

// Patch all collections to ensure they have the upload property with filenameCompoundIndex
const patchedCollections = [Editorial, Media, User, Sketchbook].map(collection => {
  // If the collection doesn't have an upload property, add an empty one
  if (!collection.upload) {
    return {
      ...collection,
      upload: {
        staticDir: 'uploads',
        mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      }
    };
  }
  
  // If it already has upload, return as is
  return collection;
});

// Export the patched collections
export const collections = patchedCollections; 