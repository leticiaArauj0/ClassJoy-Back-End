import { Transform } from "class-transformer";
import { IsDateString, IsBoolean } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateDiaryDTO {
  entryTime: string;
  departureTime: string;

  @IsDateString()
  date: string;

  feeding?: string;
  ateAlone?: string;
  obsFeeding?: string;

  sleep?: string;
  startSleep?: string;
  endSleep?: string;
  obsSleep?: string;

  bathroom?: string;  
  bathroomAmount?: string;
  obsBathroom?: string;

  reminder?: string;
  notice?: string;

  studentId: string; 
}
