import axios from 'axios';
import qs from 'query-string';
import { UserState } from '@/store/modules/user/types';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';
import { ListResult } from '@/types/global';
import { BaseModel, prefix } from './base';

export interface PolicyRecord {
  id: string;
  number: number;
  name: string;
  contentType: 'img' | 'horizontalVideo' | 'verticalVideo';
  filterType: 'artificial' | 'rules';
  count: number;
  status: 'online' | 'offline';
  createdTime: string;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number;
  pageSize: number;
}

export interface PolicyListRes {
  list: PolicyRecord[];
  total: number;
}

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('/api/list/policy', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  name?: string;
  actionType?: string;
  icon?: string;
  data?: DescData[];
  enable?: boolean;
  expires?: boolean;
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}

export interface IQueryParams {
  id: string;
  name: string;
  region: string;
  create_date_before: string;
  create_date_after: string;
  update_date_before?: string;
  update_date_after?: string;
}

export interface RegionModel {
  id: string;
  name: string;
  fullName: string;
  weight: number;
  aid: string;
  bid: string;
  tid: string;
}

export interface AdminSpotBaseModel {
  id: string;
  name: string;
  description: string;
  thumbUrl: string;
  panorama: string;
  createdTime: string;
  updatedTime: string;
  weight?: number;
}

export interface AdminSpotModel extends AdminSpotBaseModel {
  months: BaseModel[];
  features: BaseModel[];
  country: RegionModel;
  province: RegionModel;
  city: RegionModel;
  district: RegionModel;
}

export function getSpotsByConditions(params: IQueryParams) {
  return axios.get<ListResult<AdminSpotModel>>(`${prefix}/admin/spot/query`, {
    params,
  });
}

export interface AdminSpotRecord extends AdminSpotBaseModel {
  months: string[];
  features: string[];
  province: string;
  city: string;
  district: string;
}

/**
 * 根据id获取信息
 * @param id
 * @returns
 */
export function getSpotById(id: string) {
  return axios.get<AdminSpotModel>(`${prefix}/spot/${id}`);
}

/**
 * 获取所有月份
 * @returns
 */
export function getAllMonth() {
  return axios.get<BaseModel[]>(`${prefix}/month/all`);
}

/**
 * 获取所有特色信息
 * @returns
 */
export function getAllFeature() {
  return axios.get<BaseModel[]>(`${prefix}/feature/all`);
}

/**
 * 根据id更新信息
 * @param form
 * @returns
 */
export function patchSpot(form: Partial<AdminSpotRecord>) {
  const { id, months, features } = form;
  delete form.id;
  return axios.patch(`${prefix}/spot/${id}`, {
    ...form,
    months: months?.join(),
    features: features?.join(),
  });
}

/**
 * 返回spot的months和features
 * @param id
 * @returns
 */
export function getSpotFM(id: string) {
  return axios.get<AdminSpotModel>(`${prefix}/spot/fm/${id}`);
}

type Author = UserState;

export interface ArticleBriefInfo {
  id: string;
  title: string;
  thumbUrl: string;
  summary: string;
  content: string;
  category: BaseModel;
  tags: BaseModel[];
  viewCount: number;
  likeCount: number;
  favCount: number;
  commentCount: number;
  status: number;
  publishTime: string;
  createdTime: string;
  updatedTime: string;
  spot: Partial<AdminSpotModel>;
  author: Partial<Author>;
  images: string[];
}

export const STATUS = {
  /**
   * 草稿箱、未发布
   */
  DRAFT: 0,

  /**
   * 已发布
   */
  PUBLISH: 1,
};

export const ARTICLE_STATUS = {
  [STATUS.DRAFT]: {
    label: '草稿',
    value: STATUS.DRAFT,
  },
  [STATUS.PUBLISH]: {
    label: '已发布',
    value: STATUS.PUBLISH,
  },
};

export function getArticlesByConditions(params: IQueryParams) {
  return axios.get<ListResult<ArticleBriefInfo>>(
    `${prefix}/admin/article/query`,
    { params }
  );
}

/**
 * 更新文章状态
 * @param id
 * @param status 0 | 1
 * @returns
 */
export function patchArticleStatus(id: string, status: number) {
  return axios.patch(`${prefix}/admin/article_status/${id}/${status}`);
}
