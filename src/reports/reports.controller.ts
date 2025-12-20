import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ReportsService } from "./reports.service";
import {
  CreateReportDto,
  UpdateReportDto,
  EstimateQueryDto,
} from "./dtos/report.dto";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Roles } from "../decorators/roles.decorator";
import { RolesGuard } from "../guards/roles.guard";
import { User } from "../users/user.entity";

@Controller("reports")
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard("jwt"))
  create(@Body() createReportDto: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(createReportDto, user);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  findAll(@Query("approved") approved?: string) {
    const approvedBool =
      approved === "true" ? true : approved === "false" ? false : undefined;
    return this.reportsService.findAll(approvedBool);
  }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  @Roles("admin")
  update(@Param("id") id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportsService.update(+id, updateReportDto);
  }

  @Get("estimate")
  getEstimate(@Query() query: EstimateQueryDto) {
    const { make, model, year, mileage, lng, lat } = query;
    return this.reportsService.getEstimate(
      make,
      model,
      +year,
      +mileage,
      +lng,
      +lat
    );
  }
}
