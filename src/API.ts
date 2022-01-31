import axios, { AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:4000';

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

export const getNotes = async (starId: string)
  : Promise<AxiosResponse<ApiNotesType>> => {
  try {
    const notes: AxiosResponse<ApiNotesType> = await axios.get(
      `${baseUrl}/notes/${starId}`,
    );
    return notes;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addNote = async (
  noteData: INote,
): Promise<AxiosResponse<ApiNotesType>> => {
  try {
    const note: Omit<INote, '_id'> = {
      starId: noteData.starId,
      note: noteData.note,
      publisher: noteData.publisher,
      repliesTo: noteData.repliesTo,
    };
    const saveNote: AxiosResponse<ApiNotesType> = await axios.post(
      `${baseUrl}/add-note`,
      note,
    );
    return saveNote;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteSingleNote = async (
  _id: string,
): Promise<AxiosResponse<ApiNotesType>> => {
  try {
    const deletedNote: AxiosResponse<ApiNotesType> = await axios.delete(
      `${baseUrl}/delete-note/${_id}`,
    );
    return deletedNote;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteNotes = async (
  _id: string,
  notes: INote[],
): Promise<AxiosResponse<ApiNotesType>> => {
  try {
    let axiosRes: Promise<
      AxiosResponse<ApiNotesType>
    > = deleteSingleNote(_id);

    notes
      .filter((n) => n.repliesTo === _id)
      .forEach((n) => {
        axiosRes = deleteNotes(n._id, notes);
      });
    return axiosRes;
  } catch (error) {
    throw new Error(error as string);
  }
};

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
      `${baseUrl}/add-activity`,
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
      `${baseUrl}/delete-activity/${_id}`,
    );
    return deletedActivity;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteStar = async (
  _id: string,
) => {
  try {
    deleteSingleStar(_id);
    getNotes(_id)
      .then((res) => {
        res.data.notes.forEach((n) => {
          deleteNotes(n._id, res.data.notes);
        });
      }).catch((err: Error) => console.log(err));
    getActivities(_id)
      .then((res) => {
        res.data.activities.forEach((a) => {
          deleteActivity(a._id);
        });
      }).catch((err: Error) => console.log(err));
  } catch (error) {
    throw new Error(error as string);
  }
};