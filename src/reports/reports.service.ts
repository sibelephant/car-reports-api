import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto, UpdateReportDto } from './dtos/report.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) { }

  async create(createReportDto: CreateReportDto, user: User) {
    const report = this.reportsRepository.create({
      ...createReportDto,
      user,
    });
    return this.reportsRepository.save(report);
  }

  async findAll(approved?: boolean) {
    const where = approved !== undefined ? { approved } : {};
    return this.reportsRepository.find({ where, relations: ['user'] });
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    await this.reportsRepository.update(id, updateReportDto);
    return this.reportsRepository.findOne({ where: { id } });
  }

  async getEstimate(make: string, model: string, year: number, mileage: number, lng: number, lat: number) {
    const reports = await this.reportsRepository.find({
      where: { make, model, approved: true },
    });

    if (reports.length === 0) {
      return { estimate: null, message: 'No data available for this car' };
    }

    // Simple average calculation
    const total = reports.reduce((sum, report) => sum + report.price, 0);
    const estimate = Math.round(total / reports.length);

    return { estimate, count: reports.length };
  }
}
