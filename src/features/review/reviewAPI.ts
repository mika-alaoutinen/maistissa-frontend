import { NewReview } from '../../generated/models/NewReview';
import { Review } from '../../generated/models/Review';
import { ReviewsCrudService } from '../../generated/services/ReviewsCrudService';

const getReviews = async (): Promise<Review[]> => ReviewsCrudService.getReviews();

export type ReviewProps = 'author' | 'date' | 'rating' | 'reviewText' | 'wine';
export type { NewReview, Review };
export default { getReviews };
