import { IsUUID } from "class-validator";

export class ClaimDealDto {
    @IsUUID()
    dealId: string;

    @IsUUID()
    userId: string;
}