import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './model/candidate.entity';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
  ) {}

  findAll() {
    return this.candidateRepository.find({ order: { createdAt: 'asc' } });
  }

  async findBy(findBy: Pick<FindOptionsWhere<Candidate>, 'id'>) {
    const candidate = await this.candidateRepository.findOneBy(findBy);

    if (!candidate) {
      throw new NotFoundException('Candidate with given id does not exist');
    }

    return candidate;
  }

  async create(createCandidateDto: CreateCandidateDto) {
    const createdCandidate =
      this.candidateRepository.create(createCandidateDto);

    const candidate = this.candidateRepository.save(createdCandidate);

    return candidate;
  }

  async update(id: string, updateCandidateDto: UpdateCandidateDto) {
    let candidateToBeUpdated = await this.findBy({ id });

    if (!candidateToBeUpdated) {
      throw new NotFoundException('Candidate not found');
    }

    candidateToBeUpdated = { ...candidateToBeUpdated, ...updateCandidateDto };

    const candidateAfterUpdate = await this.candidateRepository.save(
      candidateToBeUpdated,
    );

    return candidateAfterUpdate;
  }

  async delete(id: string) {
    await this.candidateRepository.delete({ id });
  }
}
