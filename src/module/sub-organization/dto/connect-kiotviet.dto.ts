import { PickType } from '@nestjs/swagger';
import { ConnectKiotViet } from '@model';
export class DetailConnectKiotViet extends PickType(ConnectKiotViet, ['clientId', 'clientSecret', 'retailer', 'branchId']) {}