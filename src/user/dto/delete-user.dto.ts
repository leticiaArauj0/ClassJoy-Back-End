/* eslint-disable prettier/prettier */
import { IsStrongPassword } from 'class-validator';

export class DeleteUsernDTO {
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 0,
        minLowercase: 1,
        minSymbols: 0,
        minNumbers: 1,
    })
    password: string;
}
