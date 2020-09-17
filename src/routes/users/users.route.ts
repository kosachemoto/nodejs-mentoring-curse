import express from 'express';
import { TYPES } from '../../../inversify.types';
import { container } from '../../../inversify.config';
import { UsersControllerTypes } from '../../controllers/users';
import { UsersValidationTypes } from '../../validation/users';

const {
    CONTROLLER,
    VALIDATION,
} = TYPES.USERS;

const userRouter = express.Router();

const usersController = container.get<UsersControllerTypes.Controller>(CONTROLLER);
const usersValidation = container.get<UsersValidationTypes.Validation>(VALIDATION);

userRouter.route('/')
    .post(
        usersValidation.createUser,
        usersController.createUser)
    .get(
        usersValidation.getUsers,
        usersController.getUsers);

userRouter.route('/:id')
    .get(
        usersValidation.getUser,
        usersController.getUser)
    .put(
        usersValidation.updateUser,
        usersController.updateUser)
    .delete(
        usersValidation.deleteUser,
        usersController.deleteUser);

export { userRouter };
