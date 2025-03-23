import { CollectionConfig } from 'payload';

const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
    },
  ],
};

export default Media;