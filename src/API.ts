import axios, { Axios, AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:4000';

export const getStars = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const stars: AxiosResponse<ApiDataType> = await axios.get(
      `${baseUrl}/stars`,
    );
    return stars;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addStar = async (
  formData: IStar,
): Promise<AxiosResponse<ApiDataType>> => {
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
    const saveStar: AxiosResponse<ApiDataType> = await axios.post(
      `${baseUrl}/add-star`,
      star,
    );
    return saveStar;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateStar = async (
  star: IStar,
  newPri: number,
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const starUpdate: Pick<IStar, 'priority'> = {
      priority: newPri,
    };
    const updatedStar: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-star/${star._id}`,
      starUpdate,
    );
    return updatedStar;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateStars = async (
  draggedStar: IStar,
  newPri: number,
  stars: IStar[],
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    let axiosRes: Promise<
      AxiosResponse<ApiDataType>
    > = updateStar(draggedStar, newPri);

    let index: number;
    index = newPri === 1 ? 2 : 1;
    stars
      .filter((s) => s.priority > 0 && s !== draggedStar)
      .sort((a, b) => a.priority - b.priority)
      .forEach((s) => {
        axiosRes = updateStar(s, index);
        index += 1;
        if (index === newPri) index += 1;
      });

    return axiosRes;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteStar = async (
  _id: string,
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedStar: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-star/${_id}`,
    );
    return deletedStar;
  } catch (error) {
    throw new Error(error as string);
  }
};
