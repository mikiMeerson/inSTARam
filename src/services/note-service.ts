import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../globals';

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
      `${baseUrl}/notes`,
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
      `${baseUrl}/notes/${_id}`,
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
