import { CollectionConfig } from 'payload';

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
      admin: {
        description: 'URL-friendly version of the title (e.g., "sketch-notebook-2023")'
      }
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
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'sketchImages',
      type: 'array',
      admin: {
        description: 'Add images from your sketchbook',
      },
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
          name: 'position',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Position in the sketchbook (0 is first)',
          },
        },
        {
          name: 'fullWidth',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Display this image full width',
          },
        },
      ],
    },
  ],
};

export default Sketchbook;