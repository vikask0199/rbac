


// export interface ISubscription {
//     subId: string;
//     planName: string;
//     price: string;
//     viewerLimit: number;
//     validity: number;
//     isActive: boolean;
//     validTill: Date;
//     createdAt: Date;
//     updatedAt: Date;
//     // user?: IExternalUser;
//     // contract?: IContract;
// }

import { IContract } from "./ContractInterface";
import { IExternalUser } from "./ExternalUserInterface";


export interface ISubscription {
    subId: string;
    planName: string;
    price: string;
    viewerLimit: number;
    validity: number;
    isActive: boolean;
    validTill: Date;
    createdAt: Date;
    user?: IExternalUser;  
    contract?: IContract; 
  }