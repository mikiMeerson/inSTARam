import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../globals';
import { ApiStarsType } from '../types/api-types';
import { INote, IStar } from '../types/interfaces';
import { PlatformType } from '../types/string-types';

export const getStars = async (): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const stars: AxiosResponse<ApiStarsType> = await axios.get(
      `${baseUrl}/stars/`,
    );
    return stars;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getStarsByPlatform = async (
  platform: PlatformType,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const stars: AxiosResponse<ApiStarsType> = await axios.get(
      `${baseUrl}/starsByPlatform/${platform}`,
    );
    return stars;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getStarsByEvent = async (
  eventId: string,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const stars: AxiosResponse<ApiStarsType> = await axios.get(
      `${baseUrl}/starsByEvent/${eventId}`,
    );
    return stars;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addStar = async (
  formData: IStar,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const star: Omit<IStar, '_id'> = {
      priority: 0,
      severity: formData.severity,
      name: formData.name,
      status: 'פתוח',
      assignee: formData.assignee,
      platform: formData.platform,
      block: formData.block,
      phase: formData.phase,
      publisher: formData.publisher,
      contact: formData.contact,
      event: formData.event,
      resources: [],
      desc: formData.desc,
      computer: formData.computer,
      notes: [],
      activity: [],
    };
    const saveStar: AxiosResponse<ApiStarsType> = await axios.post(
      `${baseUrl}/stars`,
      star,
    );
    return saveStar;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateStar = async (
  starId: string,
  newStar: IStar,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const updatedStar: AxiosResponse<ApiStarsType> = await axios.put(
      `${baseUrl}/stars/${starId}`,
      newStar,
    );
    return updatedStar;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updatePriorities = async (
  draggedStar: IStar,
  newPri: number,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const updatedStars: AxiosResponse<ApiStarsType> = await axios.put(
      `${baseUrl}/prioritize-star/${draggedStar._id}`,
      { newPri },
    );
    return updatedStars;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteStar = async (
  _id: string,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const deletedStar: AxiosResponse<ApiStarsType> = await axios.delete(
      `${baseUrl}/stars/${_id}`,
    );
    return deletedStar;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getStarById = async (
  _id: string,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const star: AxiosResponse<ApiStarsType> = await axios.get(
      `${baseUrl}/stars/${_id}`,
    );
    return star;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addNote = async (
  starId: string,
  newNote: INote,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const updatedStar: AxiosResponse<ApiStarsType> = await axios.put(
      `${baseUrl}/add-note/${starId}`,
      newNote,
    );
    return updatedStar;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const removeNote = async (
  starId: string,
  noteId: string,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const updatedStar: AxiosResponse<ApiStarsType> = await axios.put(
      `${baseUrl}/remove-note/${starId}`,
      { noteId },
    );
    return updatedStar;
  } catch (error) {
    throw new Error(error as string);
  }
};
