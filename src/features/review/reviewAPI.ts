import { Review } from '../../generated/models/Review';
import { ReviewsCrudService } from '../../generated/services/ReviewsCrudService';

const getReviews = async (): Promise<Review[]> => ReviewsCrudService.getReviews();

export type { Review };
export default { getReviews };
