// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Categories, Course, Video } = initSchema(schema);

export {
  Categories,
  Course,
  Video
};