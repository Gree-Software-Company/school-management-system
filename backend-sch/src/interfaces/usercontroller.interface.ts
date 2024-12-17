import type { Response } from "express";

export interface userControllerI {
  signup: () => Response;
  getAll: () => Response;
  getById: () => Response;
  update: () => Response;
  delete: ()=> Response;
  getOtpCode: ()=> Response;
  resetPassword: ()=> Response;

}