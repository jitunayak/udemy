import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type VideoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CourseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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

export declare class Course {
  readonly id: string;
  readonly title?: string;
  readonly instructor?: string;
  readonly rating?: number;
  readonly details?: string;
  readonly publishedDate?: string;
  readonly thumbnail?: string;
  readonly category?: string;
  readonly paid?: boolean;
  readonly Videos?: (Video | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Course, CourseMetaData>);
  static copyOf(source: Course, mutator: (draft: MutableModel<Course, CourseMetaData>) => MutableModel<Course, CourseMetaData> | void): Course;
}