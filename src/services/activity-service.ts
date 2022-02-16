import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../globals';

export const getActivities = async (starId: string)
  : Promise<AxiosResponse<ApiActivitiesType>> => {
  try {
    const activities: AxiosResponse<ApiActivitiesType> = await axios.get(
      `${baseUrl}/activities/${starId}`,
    );
    return activities;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addActivity = async (
  activityData: IActivity,
): Promise<AxiosResponse<ApiActivitiesType>> => {
  try {
    const activity: Omit<IActivity, '_id'> = {
      starId: activityData.starId,
      publisher: activityData.publisher,
      action: activityData.action,
      value: activityData.value,
    };
    const saveActivity: AxiosResponse<ApiActivitiesType> = await axios.post(
      `${baseUrl}/activities/`,
      activity,
    );
    return saveActivity;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteActivity = async (
  _id: string,
): Promise<AxiosResponse<ApiActivitiesType>> => {
  try {
    const deletedActivity: AxiosResponse<
      ApiActivitiesType
    > = await axios.delete(
      `${baseUrl}/activities/${_id}`,
    );
    return deletedActivity;
  } catch (error) {
    throw new Error(error as string);
  }
};
