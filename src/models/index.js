// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const CourseCategoriesEnum = {
  "MATHEMATICS": "MATHEMATICS",
  "PHYSICS": "PHYSICS",
  "CODING": "CODING",
  "CHEMISTRY": "CHEMISTRY"
};

const { Categories, Course, Video } = initSchema(schema);

export {
  Categories,
  Course,
  Video,
  CourseCategoriesEnum
};