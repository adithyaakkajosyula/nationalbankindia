// src/app/core/constants.ts
import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('cfffffff');
export const APP_TITLE = new InjectionToken<string>('APP_TITLE');
export interface AppConfig {
    apiUrl: string;
    apiKey: string;
  }
  
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export interface Userdata {
  id: string;
  name:string;
   roleId :string; 
   firstName :string; 
   lastName :string; 
   username :string; 
   role :Role; 
   isSuccess : boolean;
   message : string;
}
export interface Role{
  id : string;
  name : string;
}
export interface BaseResultModel{
  isSuccess : boolean;
  message : string;
}
export const RoleIds = {
  Admin: "admin",
  HR: "HR", 
  // Add other roles as needed
};