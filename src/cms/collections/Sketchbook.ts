import { CollectionConfig } from 'payload/types';

const Sketchbook: CollectionConfig = {
  slug: 'sketchbooks',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'sketchbookImages',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
        {
          name: 'aspectRatio',
          type: 'select',
          options: [
            {
              label: 'Square (1:1)',
              value: 'square',
            },
            {
              label: 'Portrait (3:4)',
              value: 'portrait',
            },
            {
              label: 'Landscape (4:3)',
              value: 'landscape',
            },
            {
              label: 'Wide (16:9)',
              value: 'wide',
            },
          ],
          defaultValue: 'square',
        },
      ],
    },
  ],
};

export default Sketchbook;