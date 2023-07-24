/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  create: Todo;
  delete?: Maybe<Todo>;
  update?: Maybe<Todo>;
};


export type MutationCreateArgs = {
  description: Scalars['String']['input'];
  is_completed: Scalars['Boolean']['input'];
};


export type MutationDeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateArgs = {
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  is_completed: Scalars['Boolean']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAll: Array<Todo>;
  getByID: Array<Todo>;
  getComplete: Array<Todo>;
  getIncomplete: Array<Todo>;
};


export type QueryGetByIdArgs = {
  id: Scalars['Int']['input'];
};

export type Todo = {
  __typename?: 'Todo';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  is_completed: Scalars['Boolean']['output'];
};
