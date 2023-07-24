import { Formik, Field, Form } from "formik";
import { Stack, FormControl, Input, Button } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { AllTodoQuery } from "./TodoList";

const CreateTodoMutation = gql`
  mutation Create($description: String!, $isCompleted: Boolean!) {
    create(description: $description, is_completed: $isCompleted) {
      description
      is_completed
      id
    }
  }
`;

const TodoForm: React.FC = () => {
  const [create, { error }] = useMutation(CreateTodoMutation, {
    refetchQueries: [AllTodoQuery],
  });

  const handleSubmit = (description: string, resetForm: () => void) => {
    if (!description) return;
    create({
      variables: {
        description: description,
        isCompleted: false,
      },
    });
    resetForm();
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Formik
      initialValues={{ description: "" }}
      onSubmit={(value, actions) =>
        handleSubmit(value.description, actions.resetForm)
      }
    >
      <Form>
        <Stack direction="row">
          <Field name="description">
            {({ field }) => (
              <FormControl>
                <Input
                  {...field}
                  id="description"
                  type="text"
                  placeholder="Add Todo"
                />
              </FormControl>
            )}
          </Field>
          <Button colorScheme="teal" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
};

export default TodoForm;
