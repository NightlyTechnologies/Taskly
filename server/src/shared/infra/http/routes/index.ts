import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import citiesRouter from '@modules/cities/infra/http/routes/cities.routes';
import activitiesRouter from '@modules/activities/infra/http/routes/activities.routes';
import sub_ActivitiesRouter from '@modules/activities/infra/http/routes/sub_activities.routes';

const router = Router();

router.use('/users', usersRouter);
router.use('/cities', citiesRouter);
router.use('/activities', activitiesRouter);
router.use('/sub_activities', sub_ActivitiesRouter);

export default router;
