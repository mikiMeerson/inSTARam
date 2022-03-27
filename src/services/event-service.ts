import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../globals';
import { ApiEventsType } from '../types/api-types';
import { IEvent } from '../types/interfaces';

export const getEvents = async (): Promise<AxiosResponse<ApiEventsType>> => {
  try {
    const events: AxiosResponse<ApiEventsType> = await axios.get(
      `${baseUrl}/events`,
    );
    return events;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const addEvent = async (
  formData: IEvent,
): Promise<AxiosResponse<ApiEventsType>> => {
  try {
    const event: Omit<IEvent, '_id'> = {
      name: formData.name,
      publisher: formData.publisher,
      type: formData.type,
      assignee: formData.assignee,
      block: formData.block,
      platform: formData.platform,
      reason: formData.reason,
      team: formData.team,
      dates: formData.dates,
      callSign: formData.callSign,
      areas: formData.areas,
      duration: formData.duration,
      generalSummary: formData.generalSummary,
      goals: formData.goals,
      dataSources: formData.dataSources,
      configuration: formData.configuration,
      description: formData.description,
      findings: formData.findings,
      notes: formData.notes,
      conclusions: formData.conclusions,
    };

    const saveEvent: AxiosResponse<ApiEventsType> = await axios.post(
      `${baseUrl}/events`,
      event,
    );
    return saveEvent;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateEvent = async (
  eventId: string,
  newEvent: IEvent,
): Promise<AxiosResponse<ApiEventsType>> => {
  try {
    const updatedEvent: AxiosResponse<ApiEventsType> = await axios.put(
      `${baseUrl}/events/${eventId}`,
      newEvent,
    );
    return updatedEvent;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const updateEventField = async (
  field: keyof IEvent,
  event: IEvent,
  newValue: number | string,
): Promise<AxiosResponse<ApiEventsType>> => {
  try {
    const eventUpdate = Object.assign(event, { [field]: newValue });

    const updatedEvent: AxiosResponse<ApiEventsType> = await axios.put(
      `${baseUrl}/events/${event._id}`,
      eventUpdate,
    );
    return updatedEvent;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteEvent = async (
  _id: string,
): Promise<AxiosResponse<ApiEventsType>> => {
  try {
    const deletedEvent: AxiosResponse<ApiEventsType> = await axios.delete(
      `${baseUrl}/events/${_id}`,
    );
    return deletedEvent;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getEventById = async (
  _id: string,
): Promise<AxiosResponse<ApiEventsType>> => {
  try {
    const event: AxiosResponse<ApiEventsType> = await axios.get(
      `${baseUrl}/events/${_id}`,
    );
    return event;
  } catch (error) {
    throw new Error(error as string);
  }
};
