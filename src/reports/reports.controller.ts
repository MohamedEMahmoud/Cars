import { Body, Controller, Patch, Post, Param, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ReportsService } from "./reports.service";
import { CreateReportDto } from './dto/create-report.dto';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptors';
import { ReportDto } from "./dto/report.dto";
import { ApproveReportDto } from "./dto/approve-report.dto";
import { AdminGuard } from "../guards/admin.guard";
import { GetEstimateDto } from './dto/get-estimate.dto';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService: ReportsService) { }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    creatReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
        return this.reportsService.create(body, user);
    }

    @Get()
    getEstimate(@Query() query: GetEstimateDto) {
        return this.reportsService.createEstimate(query);
    }


    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
        return this.reportsService.changeApproval(id, body.approved);
    }
}
