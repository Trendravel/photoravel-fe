export enum Region {
  ASAN = '아산',
  CHEONAN = '천안',
  GYERYONG = '계룡',
  GONGJU = '공주',
  NONSAN = '논산',
  DANGJIN = '당진',
  BORYEONG = '보령',
  SEOSAN = '서산',
  GEUMSAN = '금산',
  BUYEO = '부여',
  SEOCHEON = '서천',
  YESAN = '예산',
  CHEONGYANG = '청양',
  TAEAN = '태안',
  HONGSEONG = '홍성',
}

export interface Guidebook {
    id?: number;
    userId: string;
    title: string;
    content?: string;
    region: Region;
    views: number;    
    image: string;
    createdAt: string;
    updatedAt?: string;
  }