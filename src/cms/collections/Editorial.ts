import { CollectionConfig } from 'payload/types';

const Editorial: CollectionConfig = {
  slug: 'editorials',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', 'status'],
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
        description: 'URL-friendly version of the title (e.g., "my-article-title")'
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
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
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
      name: 'displayType',
      type: 'select',
      options: [
        {
          label: 'Gallery',
          value: 'gallery',
        },
        {
          label: 'Article',
          value: 'article',
        },
      ],
      defaultValue: 'gallery',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        condition: (data) => data.displayType === 'article',
      },
    },
    {
      name: 'galleryImages',
      type: 'array',
      admin: {
        description: 'Add images to the gallery with different aspect ratios for visual interest',
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
            {
              label: 'Full Width',
              value: 'full-width',
            },
          ],
          defaultValue: 'square',
          required: true,
        },
        {
          name: 'priority',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Higher numbers will be displayed first',
          },
        },
      ],
    },
  ],
};

export default Editorial;