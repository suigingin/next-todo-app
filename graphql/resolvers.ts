export const resolvers = {
  Query: {
    todos: (_parent, _args, context) => {
      return context.prisma.todo.findMany({
        where: { is_completed: false },
      });
    },
  },
};
