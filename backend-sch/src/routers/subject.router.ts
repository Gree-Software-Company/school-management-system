import { Router } from "express"
import { SubjectController } from "../controllers/subject.controller"

const express = require('express')

export const subjectRouter:Router = express.Router()

subjectRouter.get('/', SubjectController.getAllSubjectsPresent)
subjectRouter.post('/', SubjectController.addNewSubject)
subjectRouter.put('/:id', SubjectController.modifySubject)
subjectRouter.delete('/:id', SubjectController.deleteSubject)