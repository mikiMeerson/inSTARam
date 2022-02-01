import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../globals';

export const getStars = async (): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const stars: AxiosResponse<ApiStarsType> = await axios.get(
      `${baseUrl}/stars`,
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
      version: formData.version,
      publisher: formData.publisher,
      event: formData.event,
      resources: [],
      desc: formData.desc,
      computer: formData.computer,
    };
    const saveStar: AxiosResponse<ApiStarsType> = await axios.post(
      `${baseUrl}/add-star`,
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
      `${baseUrl}/edit-star/${starId}`,
      newStar,
    );
    return updatedStar;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateStarField = async (
  field: keyof IStar,
  star: IStar,
  newValue: number | string,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const starUpdate = Object.assign(star, { [field]: newValue });

    const updatedStar: AxiosResponse<ApiStarsType> = await axios.put(
      `${baseUrl}/edit-star/${star._id}`,
      starUpdate,
    );
    return updatedStar;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updatePriorities = async (
  draggedStar: IStar,
  newPri: number,
  stars: IStar[],
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    let axiosRes: Promise<
        AxiosResponse<ApiStarsType>
      > = updateStarField('priority', draggedStar, newPri);

    let index: number;
    index = newPri === 1 ? 2 : 1;
    stars
      .filter((s) => s.priority > 0 && s !== draggedStar)
      .sort((a, b) => a.priority - b.priority)
      .forEach((s) => {
        axiosRes = updateStarField('priority', s, index);
        index += 1;
        if (index === newPri) index += 1;
      });

    return axiosRes;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteSingleStar = async (
  _id: string,
): Promise<AxiosResponse<ApiStarsType>> => {
  try {
    const deletedStar: AxiosResponse<ApiStarsType> = await axios.delete(
      `${baseUrl}/delete-star/${_id}`,
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
      `${baseUrl}/star/${_id}`,
    );
    return star;
  } catch (error) {
    throw new Error(error as string);
  }
};
