export const FETCH_PREVIOUS_FEEDBACK = 'FETCH_PREVIOUS_FEEDBACK';
export const FETCH_PREVIOUS_FEEDBACK_FAILURE = 'FETCH_PREVIOUS_FEEDBACK_FAILURE';
export const FETCH_PREVIOUS_FEEDBACK_SUCCESS = 'FETCH_PREVIOUS_FEEDBACK_SUCCESS';
export const SEND_FEEDBACK = 'SEND_FEEDBACK';
export const SEND_FEEDBACK_FAILURE = 'SEND_FEEDBACK_FAILURE';
export const SEND_FEEDBACK_SUCCESS = 'SEND_FEEDBACK_SUCCESS';
export const DELETE_FEEDBACK = 'DELETE_FEEDBACK';
export const DELETE_FEEDBACK_FAILURE = 'DELETE_FEEDBACK_FAILURE';
export const DELETE_FEEDBACK_SUCCESS = 'DELETE_FEEDBACK_SUCCESS';
export const WIPE_PREVIOUS_FEEDBACK = 'WIPE_PREVIOUS_FEEDBACK';

export interface FeedbackState {
  adding: boolean;
  addingError: Error;
  fetching: boolean;
  fetchingError: Error;
  deleting: boolean;
  deletingError: Error;
  sessions?: {
    [sessionId: string]: FeedbackData;
  };
}

export interface FeedbackData {
  comment: string;
  contentRating: number;
  styleRating: number;
}

export interface FeedbackId {
  sessionId: string;
  userId: string;
}

export type Feedback = FeedbackId & FeedbackData;

interface FetchPreviousFeedbackAction {
  type: typeof FETCH_PREVIOUS_FEEDBACK;
}

interface FetchPreviousFeedbackFailureAction {
  type: typeof FETCH_PREVIOUS_FEEDBACK_FAILURE;
  payload: {
    error: Error;
  };
}

interface FetchPreviousFeedbackSuccessAction {
  type: typeof FETCH_PREVIOUS_FEEDBACK_SUCCESS;
  payload: {
    sessionId: string;
    previousFeedback: FeedbackData;
  };
}

interface SendFeedbackAction {
  type: typeof SEND_FEEDBACK;
}

interface SendFeedbackFailureAction {
  type: typeof SEND_FEEDBACK_FAILURE;
  payload: {
    error: Error;
  };
}

interface SendFeedbackSuccessAction {
  type: typeof SEND_FEEDBACK_SUCCESS;
  payload: Feedback;
}

interface DeleteFeedbackAction {
  type: typeof DELETE_FEEDBACK;
}

interface DeleteFeedbackFailureAction {
  type: typeof DELETE_FEEDBACK_FAILURE;
  payload: {
    error: Error;
  };
}

interface DeleteFeedbackSuccessAction {
  type: typeof DELETE_FEEDBACK_SUCCESS;
  payload: FeedbackId;
}

interface WipePreviousFeedbackAction {
  type: typeof WIPE_PREVIOUS_FEEDBACK;
}

export type FeedbackActions =
  | FetchPreviousFeedbackAction
  | FetchPreviousFeedbackFailureAction
  | FetchPreviousFeedbackSuccessAction
  | SendFeedbackAction
  | SendFeedbackFailureAction
  | SendFeedbackSuccessAction
  | DeleteFeedbackAction
  | DeleteFeedbackFailureAction
  | DeleteFeedbackSuccessAction
  | WipePreviousFeedbackAction;
