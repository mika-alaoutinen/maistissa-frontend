import { NewReview } from '../generated/models/NewReview';
import { Review } from '../generated/models/Review';
import { ReviewsCrudService } from '../generated/services/ReviewsCrudService';
import { createError } from './errorHandling';

const getReviews = async (): Promise<Review[]> => {
  try {
    return await ReviewsCrudService.getReviews();
  } catch (error) {
    throw createError(error);
  }
};

export type { NewReview, Review };
export default { getReviews };
