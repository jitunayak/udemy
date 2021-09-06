import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum CourseCategoriesEnum {
  MATHEMATICS = "MATHEMATICS",
  PHYSICS = "PHYSICS",
  CODING = "CODING",
  CHEMISTRY = "CHEMISTRY"
}



type CategoriesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CourseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VideoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Categories {
  readonly id: string;
  readonly categoryName?: string;
  readonly CategoriesCourses?: (Course | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Categories, CategoriesMetaData>);
  static copyOf(source: Categories, mutator: (draft: MutableModel<Categories, CategoriesMetaData>) => MutableModel<Categories, CategoriesMetaData> | void): Categories;
}

export declare class Course {
  readonly id: string;
  readonly title?: string;
  readonly instructor?: string;
  readonly rating?: number;
  readonly details?: string;
  readonly publishedDate?: string;
  readonly thumbnail?: string;
  readonly category?: CourseCategoriesEnum | keyof typeof CourseCategoriesEnum;
  readonly paid?: boolean;
  readonly Videos?: (Video | null)[];
  readonly categoriesID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Course, CourseMetaData>);
  static copyOf(source: Course, mutator: (draft: MutableModel<Course, CourseMetaData>) => MutableModel<Course, CourseMetaData> | void): Course;
}

export declare class Video {
  readonly id: string;
  readonly title?: string;
  readonly duration?: number;
  readonly courseID?: string;
  readonly url?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Video, VideoMetaData>);
  static copyOf(source: Video, mutator: (draft: MutableModel<Video, VideoMetaData>) => MutableModel<Video, VideoMetaData> | void): Video;
}