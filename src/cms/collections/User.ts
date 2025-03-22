import { CollectionConfig } from 'payload/types';

const User: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'text',
      name: 'name',
      label: 'Name',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          type: 'checkbox',
          name: 'isAdmin',
          label: 'Administrator Access',
          defaultValue: false,
        },
        {
          type: 'checkbox',
          name: 'isContentEditor',
          label: 'Content Editor Access',
          defaultValue: true,
        },
      ],
    },
  ],
};

export default User; 