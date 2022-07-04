import Form from "./Form";
import "./styles.css";

export default function App() {
  return (
    <Form
      handleSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form.Item
        rules={[
          {
            required: false,
            message: "name required"
          },
          {
            pattern: "^[A-Za-z]*$",
            message: "You're not allowed to add numbers..."
          }
        ]}
        label={"Name"}
        name={"name"}
      >
        <input placeholder="name" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: "email required"
          }
        ]}
        label={"Email"}
        name={"email"}
      >
        <input placeholder="email" />
      </Form.Item>
      <button type="submit">send</button>
    </Form>
  );
}
