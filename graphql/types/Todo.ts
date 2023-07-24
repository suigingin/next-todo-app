import {
  extendType,
  objectType,
  nonNull,
  stringArg,
  booleanArg,
  intArg,
} from "nexus";
//import { NexusGenObjects } from "../../nexus-typegen";

export const Todo = objectType({
  name: "Todo",
  definition(t) {
    t.nonNull.int("id");
    t.nonNull.string("description");
    t.nonNull.boolean("is_completed");
  },
});

//// Sample Data
//let todos: NexusGenObjects["Todo"][] = [
//  {
//    id: 1,
//    description: "Create ToDo App(FE)",
//    is_completed: false,
//  },
//  {
//    id: 2,
//    description: "Create ToDo App(BE)",
//    is_completed: true,
//  },
//];
//
// 参照系クエリの定義
export const TodoQuery = extendType({
  type: "Query",
  definition(t) {
    // 全件取得
    t.nonNull.list.nonNull.field("getAll", {
      type: "Todo",
      resolve(parent, args, context, info) {
        return context.prisma.todo.findMany();
      },
    });

    // 未完了タスク取得
    t.nonNull.list.nonNull.field("getIncomplete", {
      type: "Todo",
      resolve(parent, args, context, info) {
        return context.prisma.todo.findMany({
          where: { is_completed: false },
        });
      },
    });

    // 完了タスク取得
    t.nonNull.list.nonNull.field("getComplete", {
      type: "Todo",
      resolve(parent, args, context, info) {
        return context.prisma.todo.findMany({
          where: { is_completed: true },
        });
      },
    });

    // ID検索
    t.nonNull.list.nonNull.field("getByID", {
      type: "Todo",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context, info) {
        const { id } = args;
        return context.prisma.todo.findMany({
          where: { id: id },
        });
      },
    });
  },
});

// 更新系クエリの定義
export const TodoMutation = extendType({
  type: "Mutation",
  definition(t) {
    // データの新規作成
    t.nonNull.field("create", {
      type: "Todo",
      args: {
        description: nonNull(stringArg()),
        is_completed: nonNull(booleanArg()),
      },
      resolve(parent, args, context) {
        const { description, is_completed } = args;
        return context.prisma.todo.create({
          data: {
            description: description,
            is_completed: is_completed,
          },
        });
      },
    });

    // データの削除
    t.field("deleteTodo", {
      type: "Todo",
      args: {
        id: nonNull(intArg()),
      },
      resolve(parent, args, context) {
        const { id } = args;
        return context.prisma.todo.delete({
          where: { id: id },
        });
      },
    });

    // データの更新(編集)
    t.field("update", {
      type: "Todo",
      args: {
        id: nonNull(intArg()),
        description: nonNull(stringArg()),
        is_completed: nonNull(booleanArg()),
      },
      resolve(parent, args, context) {
        const { id, description, is_completed } = args;
        return context.prisma.todo.update({
          data: {
            description: description,
            is_completed: is_completed,
          },
          where: { id: id },
        });
      },
    });
  },
});
