import winston from 'winston'
import express from 'express'

export type LoggerEnvironment = 'development' | 'production'
export type Logger = winston.Logger

export interface LoggerConfig {
  environment?: LoggerEnvironment
  level: string
  meta?: object
}

export type Request = express.Request
export type Response = express.Response

export interface EntityManagerConfig {
  entity: any
  tableName: string
  primaryKey: Array<string>
  fieldsMap: object
}

export interface Bug {
  id: number,
  title: string,
  assignee?: string
}

export type Bugs = Array<Bug>

export interface User {
  id: number,
  username: string
}

export type Users = User[]
