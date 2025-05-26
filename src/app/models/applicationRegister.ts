export interface ApplicationRegisterModel extends BaseResultModel {
    applicationName: string;
    applicationFatherName: string;
    applicationMotherName: string;
    applicationDob: Date;
    applicationGender: string; // char can be represented as string in TypeScript
    applicationQualification: string;
    applicationMartialStatus: string;
    applicationMobile: string;
    applicationEmail: string;
    applicationDocumentTypeId: 0;
    applicationRequestedAmount: number;
    applicationHobbies: string[];
    applicationRegisterDate: Date;
    applicationIsAcceptedTermsAndConditions: boolean;
    applicationAddress: string;
    applicationDistrictId: number;
    applicationStateId: number;
    applicationCountryName: string;
    applicationCountryId: number;
    documentFile?: File | null; // File is used to represent IFormFile
    applicantDocumentTypes: IdNameModel[];
    countryTypes: IdNameModel[];
    stateTypes: IdNameModel[];
    districtTypes: IdNameModel[];
    applicationDocumentUploadModel: ApplicationDocumentUploadModel;
  }
  export interface ApplicationDocumentUploadModel {
    documentUploadId: number;
    documentName: string;
    documentTypeId: number;
  }
  export interface IdNameModel {
    id: number;
    name: string;
  }
  export interface BaseModel{
    id : number;
  }
  export interface BaseResultModel extends BaseModel{
    isSuccess : boolean;
    message:string;
  }