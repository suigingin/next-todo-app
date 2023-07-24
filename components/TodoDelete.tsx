import { Box, IconButton } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { gql, useMutation } from "@apollo/client";
import { AllTodoQuery } from "./TodoList";

const DeleteTodoMutation = gql`
mutation Delete($deleteId: Int!) {
  deleteTodo(id: $deleteId) {
    id
  }
}
`;

const TodoDeleteButton: React.FC<{ todoId: number }> = ({ todoId }) => {
  const [deleteTodo, { error }] = useMutation(DeleteTodoMutation, {
    refetchQueries: [AllTodoQuery],
  });

  const handleClick = () => {
    deleteTodo({
      variables: {
        deleteId: todoId,
      },
    });
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <IconButton
        aria-label="todo delete button"
        icon={<SmallCloseIcon />}
        variant="ghost"
        color="gray.200"
        _hover={{ bg: "none", color: "gray" }}
        _focus={{ boxShadow: "none" }}
        onClick={() => handleClick()}
      />
    </Box>
  );
};

export default TodoDeleteButton;
