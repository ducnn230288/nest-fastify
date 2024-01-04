import { IntersectionType, PickType } from "@nestjs/swagger";
import { SubOrganization, User } from "@model";

export class DistributorSubOrgDto extends IntersectionType(
    PickType(SubOrganization,['id','name']),
    PickType(User,['phoneNumber'])
) {
    address: string;
}