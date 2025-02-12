import type Address from './Address';
import { Family, Biography, Record } from './PacientTypes';

enum BiologicalSex {
    MALE = 'M',
    FEMALE = 'F'
}

enum ZodiacSign {
    // Add all zodiac signs here
}

enum BloodType {
    // Add all blood types here
}

enum MaritalStatus {
    MARRIED = 'married',
    DIVORCED = 'divorced',
    SEPARATED = 'separated',
    SINGLE = 'single',
    WIDOWER = 'widower'
}

export default interface Pacient {
    id: string;
    name: string;
    cpf?: string;
    birthDate?: Date;
    biologicalSex?: BiologicalSex;
    sign?: ZodiacSign;
    ascendant?: ZodiacSign;
    birthPlace?: string;
    phone?: string;
    email?: string;
    bloodType?: BloodType;
    maritalStatus?: MaritalStatus;
    indication?: string;
    family?: Family;
    biography?: Biography;
    record?: Record;
    address?: Address;
    _status?: 'new' | 'modified' | 'deleted' | 'synced';
}