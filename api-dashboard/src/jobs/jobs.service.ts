import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './model/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  findAll() {
    return this.jobRepository.find();
  }

  async findBy(findBy: Pick<FindOptionsWhere<Job>, 'id'>) {
    const job = await this.jobRepository.findOneBy(findBy);

    if (!job) {
      throw new NotFoundException('Job with given id does not exist');
    }

    return job;
  }

  create(createJobDto: CreateJobDto) {
    const createdJob = this.jobRepository.create(createJobDto);

    const job = this.jobRepository.save(createdJob);

    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto) {
    let jobToBeUpdated = await this.findBy({ id });

    if (!jobToBeUpdated) {
      throw new NotFoundException('Job not found');
    }

    jobToBeUpdated = { ...jobToBeUpdated, ...updateJobDto };

    const jobAfterUpdate = await this.jobRepository.save(jobToBeUpdated);

    return jobAfterUpdate;
  }

  async delete(id: string) {
    await this.jobRepository.delete({ id });
  }
}
