import { gql, useQuery, useMutation } from "@apollo/client";
import { Checkbox, List, ListItem } from "@chakra-ui/react";
import { Todo } from "@prisma/client";
import TodoDeleteButton from "./TodoDelete";

export const AllTodoQuery = gql`
  query {
    getAll {
      id
      description
      is_completed
    }
  }
`;

const UpdateTodoMutation = gql`
  mutation Update(
    $updateId: Int!
    $updateDescription: String!
    $updateIsCompleted: Boolean!
  ) {
    update(
      id: $updateId
      description: $updateDescription
      is_completed: $updateIsCompleted
    ) {
      id
      description
      is_completed
    }
  }
`;

const TodoList: React.FC = () => {
  const { data, loading, error } = useQuery(AllTodoQuery);
  const [update, mutation] = useMutation(UpdateTodoMutation, {
    refetchQueries: [AllTodoQuery],
  });
  const handleCheckboxClick = (todo: Todo) => {
    update({
      variables: {
        updateId: todo.id,
        updateDescription: todo.description,
        updateIsCompleted: !todo.is_completed,
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (mutation.error) return <p>Error: {mutation.error.message}</p>;

  return (
    <List>
      {data.getAll.map((todo) => (
        <ListItem key={todo.id}>
          <Checkbox
            colorScheme="teal"
            isChecked={todo.is_completed}
            onChange={() => handleCheckboxClick(todo)}
          >
            {todo.description}
          </Checkbox>
          <TodoDeleteButton todoId={todo.id} />
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
