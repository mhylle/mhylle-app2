import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  @ApiResponse({ status: 503, description: 'Service is unhealthy' })
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      // Database health check
      () => this.db.pingCheck('database'),
      // Add other health indicators as needed
      () => Promise.resolve({
        api: {
          status: 'up',
          timestamp: new Date().toISOString(),
          app: 'task-manager-app2',
          version: '1.0.0',
        },
      }),
    ]);
  }

  @Get('simple')
  @ApiOperation({ summary: 'Simple health check for container monitoring' })
  @ApiResponse({ status: 200, description: 'Service is healthy' })
  simpleHealthCheck(): { status: string; timestamp: string } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
    };
  }
}
