import axios from 'axios';
import { ListResult } from '@/types/global';
import { UserState } from '@/store/modules/user/types';
import { Comment } from '@/components/comment/index.vue';
import { DEFAULT_PAGINATION_LIMIT } from '@/views/article/constants';
import { prefix, BaseModel } from './base';

interface Spot {
  id: string;
  name: string;
  thumbUrl: string;
  description: string;
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
  spot: Partial<Spot>;
  author: Partial<Author>;
  images: string[];
}

export interface IPaginationOpton {
  limit: number;
  page: number;
}

/**
 * 获取文章的简略信息
 * @param id
 * @returns
 */
export function getSpotBriefInfoOfArticles(
  id: string,
  params: Partial<IPaginationOpton> = {}
) {
  return axios.get<ListResult<ArticleBriefInfo>>(
    `${prefix}/article/spot/${id}`,
    { params }
  );
}

/**
 * 获取随机的文章，十条
 * @returns
 */
export function getRandArticles() {
  return axios.get<ArticleBriefInfo[]>(`${prefix}/article/recom_article/rand`);
}

/**
 * 通过id获取文章
 * @param id
 * @returns
 */
export function getArticleById(id: string) {
  return axios.get<ArticleBriefInfo>(`${prefix}/article/${id}`);
}

/**
 * 获取用户的文章
 * @param userId
 * @returns
 */
export function getUserBriefArticles(
  userId: string,
  options: IPaginationOpton = { page: 1, limit: DEFAULT_PAGINATION_LIMIT }
) {
  return axios.get<ListResult<ArticleBriefInfo>>(
    `${prefix}/article/user/${userId}`,
    {
      params: options,
    }
  );
}

/**
 * 参数模型
 */
export interface ArticleModel {
  id?: string;
  title: string;
  author: string;
  thumbUrl: string;
  summary: string;
  content: string;
  spot: string;
  category: string;
  tags: string[];
  images: string[];
}

/**
 * 创建文章
 * @param data
 */
export function postArticle(data: ArticleModel) {
  return axios.post<ArticleBriefInfo>(`${prefix}/article`, data);
}

/**
 * 更新文章
 * @param data
 * @returns
 */
export function patchArticle(id: string, data: Partial<ArticleModel>) {
  return axios.patch<ArticleBriefInfo>(`${prefix}/article/${id}`, data);
}

/**
 * 获取默认的分类列表
 * @param ids
 * @returns
 */
export function getCategoriesByIds(ids: string[]) {
  const params = { ids: ids?.join() };
  return axios.get<BaseModel[]>(`${prefix}/category/ids`, {
    params,
  });
}

/**
 * 获取分类
 * @param userId
 * @returns
 */
export function getCategoriesByNameAndUserId(s: string, id: string) {
  return axios.get<BaseModel[]>(`${prefix}/category/user`, {
    params: { id, s },
  });
}

/**
 * 获取默认标签
 * @param ids
 * @returns
 */
export function getTagsByIds(ids: string[]) {
  const params = { ids: ids?.join() };
  return axios.get<BaseModel[]>(`${prefix}/tag/ids`, {
    params,
  });
}

/**
 * 获取标签
 * @param userId
 * @returns
 */
export function getTagsByNameAndUserId(s: string, id: string) {
  return axios.get<BaseModel[]>(`${prefix}/tag/user`, {
    params: { id, s },
  });
}

/**
 * 通过article id获取评论
 * @param articleId
 * @param options
 * @returns
 */
export function getCommentsByArticleId(
  articleId: string,
  options: IPaginationOpton = {
    limit: 10,
    page: 1,
  }
) {
  return axios.get<ListResult<Comment>>(`${prefix}/comment`, {
    params: { articleId, ...options },
  });
}

/**
 * comment model
 */
export interface CommentModel {
  user: string;
  toUser: string;
  article: string;
  content: string;
  parent: string | null;
}

/**
 * 提交评论
 * @param data
 * @returns
 */
export function postComment(data: CommentModel) {
  return axios.post(`${prefix}/comment`, data);
}
