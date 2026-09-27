import { Module } from '@nestjs/common';
import { CourseService } from './course.service.js';
import { CourseController } from './course.controller.js';
import { Course, CourseSchema } from './schemas/course.schema.js';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
