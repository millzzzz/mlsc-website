import { CollectionConfig } from 'payload/types';

const Editorial: CollectionConfig = {
  slug: 'editorial',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'publishedDate', 'status'],
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
      name: 'author',
      type: 'text',
      required: true,
      defaultValue: 'MLSC Studio',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        {
          label: 'Music & Visual Art',
          value: 'music-visual-art',
        },
        {
          label: 'Urban Transit',
          value: 'urban-transit',
        },
        {
          label: 'Sketchbooks',
          value: 'sketchbooks',
        },
        {
          label: 'Design Principles',
          value: 'design-principles',
        },
      ],
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'additionalImages',
      type: 'array',
      label: 'Additional Images',
      minRows: 0,
      maxRows: 12,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
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
          required: true,
        },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            // Auto-generate slug if not provided, based on title
            if (data.title && !data.slug) {
              return data.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-');
            }
            return data.slug;
          },
        ],
      },
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
      admin: {
        position: 'sidebar',
      },
    },
  ],
};

export default Editorial; 